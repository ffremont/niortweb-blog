import { AppUtil } from "../apputil";
import { Request, Response } from 'express';
import { Config } from "../config";
//import notifyService from '../services/notif.service';
import { EmailCommunication } from "../models/v2/EmailCommunication";
import { EventDao } from "../dao/event.dao";


class EmailResource {

    private eventDao = new EventDao();

    /**
     * Permet d'envoyer un mail à un testeur ou à la list newsletter
     * @param request 
     * @param response 
     * @returns 
     */
    public async sendComm(request: Request, response: Response) {
        const eventId = request.params.id;
        if(!eventId){ throw 'Identifiant invalide'}

        const currentEmail = await AppUtil.authorized(request);
        if (currentEmail === null || !AppUtil.isAdmin(currentEmail)) {
            AppUtil.notAuthorized(response); return;
        }
        const emailCommunication = request.body as EmailCommunication;
        
        emailCommunication.eventId = eventId;
        emailCommunication.event = await this.eventDao.get(emailCommunication.eventId) as any;

        console.log({
            tpl:emailCommunication.templateName || Config.newEvent.email.template, 
            mailList:emailCommunication.testEmail ? emailCommunication.testEmail: [Config.newsletterElasticMailList],
            subject:Config.newEvent.email.subject(emailCommunication),
            data:Config.newEvent.email.data(emailCommunication)
        })
        /*await notifyService.send(
            emailCommunication.templateName || Config.newEvent.email.template, 
            emailCommunication.testEmail ? emailCommunication.testEmail: [Config.newsletterElasticMailList],
            Config.newEvent.email.subject(emailCommunication),
            Config.newEvent.email.data(emailCommunication)
        );*/
    
        AppUtil.ok(response);
    }
}

export default new EmailResource();