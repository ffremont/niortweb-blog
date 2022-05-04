import { AppUtil } from "../apputil";
import { Request, Response } from 'express';
import { EventDao } from "../dao/event.dao";
import * as functions from 'firebase-functions';
import { Event } from "../models/v2/Event";
import { StateEnum } from "../models/v2/StateEnum";
import * as uuid from 'uuid-random';
import { Contributor } from "../models/v2/Contributor";
import notifService from '../services/notif.service';
import { Config } from "../config";
import { Review } from "../models/v2/Review";

class EventResource {

    adminApiKey: string = functions.config().admin.key;

    private eventDao = new EventDao();

    /**
     * Tous les événéments si on est ADMIN, sinon state === OK
     * @param request 
     * @param response 
     */
    public async getEvents(request: Request, response: Response) {
        const currentEmail = await AppUtil.authorized(request);

        let events = await this.eventDao.getAll();
        AppUtil.debug(`get Events with  ${currentEmail}`)
        if(!AppUtil.isOrganizer(currentEmail||'')){
            // on masque les informations nominatives
            events = events.map((e:Event) => {
                e.contributors = (e.contributors || []).map((c: Contributor) => {
                    c.email = c.email === currentEmail ? c.email : '**********';
                    if(c.email !== currentEmail){
                        c.fullName = '********';
                        c.iam = '********';
                        c.comment = '';
                    }
                
                    return c;
                });
                e.reviews = (e.reviews || []).map((r:Review) => {
                    if(r.email !== currentEmail){
                        r.email = '*******';
                        r.comment = '';
                    }
                    return r;
                })
                return e;
            })
        }
        

        AppUtil.ok(response, events.filter((e:Event) => currentEmail && AppUtil.isAdmin(currentEmail) ? true: e.state === StateEnum.OK)); 
    }

    /**
     *  Création d'un nouvel evt
     * @param request 
     * @param response 
     */
    public async addEvent(request: Request, response: Response) {
        const currentEmail = await AppUtil.authorized(request);
        if ((currentEmail === null) || !AppUtil.isOrganizer(currentEmail)) {
            AppUtil.notAuthorized(response); return;
        }

        const newEvent = request.body as Event;
        newEvent.id = uuid();
        newEvent.createdAt = (new Date()).getTime();
        newEvent.state = StateEnum.DRAFT;
        
        await this.eventDao.set(newEvent);

        AppUtil.ok(response, newEvent); 
    }

    /**
     *  Efface un événement en mode brouillon
     * @param request 
     * @param response 
     * @returns 
     */
    public async removeEvent(request: Request, response: Response) {
        const eventId = request.params.id;
        if(!eventId){ throw 'Identifiant invalide'}

        const currentEmail = await AppUtil.authorized(request);
        if ((currentEmail === null) || !AppUtil.isOrganizer(currentEmail)) {
            AppUtil.notAuthorized(response); return;
        }

        const bddEvent = await this.eventDao.get(eventId);
        if(!bddEvent){
            AppUtil.notFound(response);return;
        } 

        if(bddEvent.state !== StateEnum.DRAFT){
            AppUtil.badRequest(response); return;
        }

        await this.eventDao.delete(bddEvent.id);

        AppUtil.ok(response);
    }

    /**
     * Permet d'inscrire un contributeur (participant) à un événement
     * @param request 
     * @param response 
     * @returns 
     */
    public async registerEmail(request: Request, response: Response) {
        const eventId = request.params.id;
        if(!eventId){ throw 'Identifiant invalide'}

        const currentEmail = await AppUtil.authorized(request);
        if ((currentEmail === null) || !AppUtil.isOrganizer(currentEmail)) {
            AppUtil.notAuthorized(response); return;
        }

        const newContributor = request.body as Contributor;
        const bddEvent = await this.eventDao.get(eventId);
        if(!bddEvent){
            AppUtil.notFound(response);return;
        }

        // MAJ de la liste de contributeurs (participants)
        const contributorAlreadyExists = (bddEvent.contributors || []).some((c:Contributor)=> c.email === newContributor.email)
        if(!contributorAlreadyExists){
            bddEvent.contributors.push(newContributor);
            AppUtil.debug('Ajout un contributeur')
            await this.eventDao.set(bddEvent);
            try{
                AppUtil.debug('Envoi email inscription')
                await notifService.send(
                    Config.registrationOnEvent.template, 
                    newContributor.email, 
                    Config.registrationOnEvent.subject(bddEvent),
                    Config.registrationOnEvent.data(bddEvent)
                );
            }catch(e){
                AppUtil.error('Envoi email pour inscription impossible',e);
            }
        }

        AppUtil.ok(response, bddEvent);
    }

    /**
     * Mise à jour d'un événément que l'on soit admin ou non
     * @param request 
     * @param response 
     */
    public async update(request: Request, response: Response) {
        const eventId = request.params.id;
        if(!eventId){ throw 'Identifiant invalide'}

        const currentEmail = await AppUtil.authorized(request);
        if (currentEmail === null) {
            AppUtil.notAuthorized(response); return;
        }

        const event = request.body as Event;
        const bddEvent = await this.eventDao.get(eventId);
        if(!bddEvent){
            AppUtil.notFound(response);return;
        }

        // MAJ que de la contribution
        // récup. de la contribution du user connecté
        const iWantToBeContributor = (event.contributors || []).find((c:Contributor)=> c.email === currentEmail),
        iamNotYetContributor = (bddEvent.contributors || []).findIndex((c:Contributor) => c.email === currentEmail) === -1;
        if(iWantToBeContributor && iamNotYetContributor){
            bddEvent.contributors.push(iWantToBeContributor);
            AppUtil.debug('Ajout un contributeur')
            await this.eventDao.set(bddEvent);
            try{
                AppUtil.debug('Envoi email inscription')
                await notifService.send(
                    Config.registrationOnEvent.template, 
                    currentEmail, 
                    Config.registrationOnEvent.subject(bddEvent),
                    Config.registrationOnEvent.data(bddEvent)
                );
            }catch(e){
                AppUtil.error('Envoi email pour inscription impossible',e);
            }
        }

        if(event.contributors && !iWantToBeContributor && !iamNotYetContributor){
            AppUtil.debug('Retrait du contributeur');
            bddEvent.contributors = bddEvent.contributors.filter(c => c.email !== currentEmail);
            await this.eventDao.set(bddEvent);
        }
        
        // on ne peut que donner un avis (pas le reprendre :D)
        const myNewReview = (event.reviews || []).find((r:Review) => r.email === currentEmail);
        AppUtil.debug('Participant a-t-il donné son avis ? ', myNewReview);
        if(event.reviews && myNewReview && ((bddEvent.reviews || []).findIndex((r:Review) => r.email === currentEmail) === -1)){
            bddEvent.reviews = (bddEvent.reviews || []).concat([myNewReview]);
            AppUtil.info(`Avis donné pour ${currentEmail}`);
            await this.eventDao.set(bddEvent);
        }

        if(AppUtil.isOrganizer(currentEmail) || AppUtil.isAdmin(currentEmail)){
            const newEvent:any = {...bddEvent};
            newEvent.description = event.description || bddEvent.description || null;
            newEvent.speaker = event.speaker || bddEvent.speaker || null;
            newEvent.title = event.title || bddEvent.title || null;
            newEvent.resumeLink = event.resumeLink || bddEvent.resumeLink || null;
            newEvent.where = event.where || bddEvent.where || null;
            newEvent.format = event.format || bddEvent.format || null;
            newEvent.youtubeLink = event.youtubeLink || bddEvent.youtubeLink || null;
            newEvent.mode = event.mode || bddEvent.mode|| null;
            newEvent.duration = event.duration || bddEvent.duration|| null;
            newEvent.image = event.image || bddEvent.image|| null;
            newEvent.scheduled = event.scheduled || bddEvent.scheduled|| null;
            newEvent.tags = event.tags || bddEvent.tags|| null;
            newEvent.allowMaxContributors = event.allowMaxContributors || bddEvent.allowMaxContributors|| null;
            
            if(AppUtil.isAdmin(currentEmail)){
                newEvent.state = event.state || bddEvent.state || StateEnum.DRAFT;
            }

            await this.eventDao.set(newEvent);
        }
                      
        
        AppUtil.ok(response, bddEvent);
    }
}

export default new EventResource();