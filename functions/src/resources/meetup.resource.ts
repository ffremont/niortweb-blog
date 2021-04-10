import { AppUtil } from "../apputil";
import { Request, Response } from 'express';
import { Config } from "../config";
import { ContributorDao } from "../dao/contributor.dao";
import * as functions from 'firebase-functions';

//@deprecated
class MeetupResource {

    adminApiKey: string = functions.config().admin.key;

    private contributorDao = new ContributorDao();

    public async webconf(request: Request, response: Response) {
        const meetupId = request.params.id;
        if(!meetupId){ throw 'Identifiant invalide'}
        
        AppUtil.redirect(response, Config.webconfs[meetupId] || `${Config.appBaseUrl}/bientot-en-ligne`);
    }

    public async contributors(request: Request, response: Response) {
        const { apikey } = request.query;
        if (apikey !== this.adminApiKey) {
            AppUtil.notAuthorized(response); return;
        }

        const meetupId = request.params.id;
        if(!meetupId){ throw 'Identifiant invalide'}

        const contr = await this.contributorDao.getRegistered(meetupId);
        AppUtil.ok(response, {
            total:contr.length,
            data:contr
        });
        
        
    }
}

export default new MeetupResource();