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

        const events = await this.eventDao.getAll();

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
        const currentEvent = await this.eventDao.get(eventId);
        if(!currentEvent){
            AppUtil.notFound(response);return;
        }

        if(AppUtil.isAdmin(currentEmail)){
            // todo
        }else{
            // MAJ que de la contribution
            // récup. de la contribution du user connecté
            const registration = event.contributors.find((c:Contributor)=> c.email === currentEmail);
            if(registration && (currentEvent.contributors.findIndex((c:Contributor) => c.email === currentEmail) === -1)){
                currentEvent.contributors.push(registration);
                await this.eventDao.set(currentEvent);

                await notifService.send(
                    Config.registrationOnEvent.template, 
                    currentEmail, 
                    Config.registrationOnEvent.subject(currentEvent),
                    Config.registrationOnEvent.data(currentEvent)
                );
            }
        }               
        
        AppUtil.ok(response, currentEvent);
    }
}

export default new EventResource();