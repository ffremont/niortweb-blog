import { AppUtil } from "../apputil";
import { Request, Response } from 'express';
import * as uuid from 'uuid-random';
import { ContributorDao } from "../dao/contributor.dao";
import notifService from "../services/notif.service";
import { Contributor } from "../models/Contributor";
import { Config } from "../config";

class RegistrationResource {

    private contributorDao = new ContributorDao();

    public async registeredCount(request: Request, response: Response) {
        const meetupId = request.params.id;
        if (!meetupId) { throw 'Identifiant invalide' }

        AppUtil.ok(response, {
            counter: (await this.contributorDao.getRegistered(meetupId)).length
        })
    }

    public async register(request: Request, response: Response) {
        const meetupId = request.params.id;
        if (!meetupId) { throw 'Identifiant invalide' }

        // check s'il ne serait pas déjà inscrit
        const contributionsOfEmail = await this.contributorDao.getContributionsOf(request.body.email);
        if (contributionsOfEmail && contributionsOfEmail.some(c => c.meetup.id === meetupId)) {
            AppUtil.info(`Déjà inscrit`)
            AppUtil.ok(response); return;
        }

        AppUtil.debug(request.body)
        const { email, comment, fullName, meetup, jesuis } = request.body;
        const contributor: Contributor = {
            email,
            comment,
            fullName,
            iam: jesuis,
            id: uuid(),
            meetup
        };
        
        await this.contributorDao.add(contributor);

        let emailConf: any = Config.registeredEmail;
        if(contributor.meetup.webconf){
            emailConf = Config.registeredEmailOnline;
        }

        await notifService.send(
            emailConf.template,
            email,
            emailConf.subject(contributor),
            emailConf.data(contributor)
        );        

        AppUtil.ok(response);
    }
}

export default new RegistrationResource();