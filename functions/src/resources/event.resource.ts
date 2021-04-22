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
        if(!AppUtil.isAdmin(currentEmail||'')){
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
        if ((currentEmail === null) || !AppUtil.isAdmin(currentEmail)) {
            AppUtil.notAuthorized(response); return;
        }

        const newEvent = request.body as Event;
        newEvent.id = uuid();
        newEvent.createdAt = (new Date()).getTime();
        
        await this.eventDao.set(newEvent);

        AppUtil.ok(response, newEvent); 
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

        if(AppUtil.isAdmin(currentEmail)){
            if(event.description){
                bddEvent.description = event.description;
                await this.eventDao.set(bddEvent);
            }
        }
                      
        
        AppUtil.ok(response, bddEvent);
    }
}

export default new EventResource();