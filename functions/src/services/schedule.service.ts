import { EventDao } from "../dao/event.dao";
import { Event } from "../models/v2/Event";
import * as admin from 'firebase-admin';

import context, { Context } from '../context';
import { UserDao } from "../dao/user.dao";
import { Contributor } from "../models/v2/Contributor";
import notifyService from './notif.service';
import { AppUtil } from "../apputil";
import { Config } from "../config";

export class ScheduleService {

    private eventDao = new EventDao();
    private userDao = new UserDao();

    /**
     * 1) @ / PUSH : 4h (SOON_EXPECTED) avant la notification EVT aux inscriptions
     */
    public async notifyParticipant() {
        AppUtil.debug('notifyParticipant');
        const nowTo = (new Date()).getTime();
        const events = (await this.eventDao.soonExpected(nowTo));

        AppUtil.debug(`Gestion de ${events.length} événements`);
        const batch = context.db().batch();
        events.forEach((e: Event) => {
            const ref = context.db().collection(Context.EVENTS_COLLECTION).doc(e.id);
            batch.update(ref, { notifications: { ...e.notifications, ...{ remember: true } } });
        })

        try {
            await batch.commit();

            const emails: any = [], notifs: any = [];
            for (let i = 0; i < events.length; i++) {
                const e = events[i] as Event;

                const allContributors:string[] = e.contributors.map((c: Contributor) => c.email);                
                //allContributors.push(e.speaker.email)
                AppUtil.debug('allContributors',allContributors);
                for(let index in allContributors){
                    const emailOfContributor = allContributors[index];
                    const user = await this.userDao.get(emailOfContributor);
                    
                    if(user && user.fcm)
                        notifs.push({
                            token: user.fcm,
                            data: {
                                url: Config.recallEvent.push.url(e),
                                title: Config.recallEvent.push.title(e),
                                body: Config.recallEvent.push.body(e),
                                icon: '/icons/icon-192x192.png'
                            }
                        });
                    emails.push(notifyService.send(
                        Config.recallEvent.email.template, 
                        emailOfContributor,
                        Config.recallEvent.email.subject(e),
                            Config.recallEvent.email.data(e)
                        )
                    );
                    
                }
            }
            await Promise.all(emails);
            if (notifs.length)
                await admin.messaging().sendAll(notifs);

            AppUtil.info('notifyParticipant OK')
        } catch (e) {
            AppUtil.error('notifyParticipant commit or notify ko', e);
        }
    }

    /**
     * 2) @ / PUSH : 3h après EVT, avis
     */
    public async askReview() {
        AppUtil.debug('askReview > Demander un avis après événement');
        const nowTo = (new Date()).getTime();
        const events = (await this.eventDao.askReview(nowTo));

        AppUtil.debug(`Gestion de ${events.length} événements`);
        const batch = context.db().batch();
        events.forEach((e: Event) => {
            const ref = context.db().collection(Context.EVENTS_COLLECTION).doc(e.id);
            batch.update(ref, { notifications: { ...e.notifications, ...{ review: true } } });
        });

        try {
            await batch.commit();

            const emails: any = [], notifs: any = [];
            for (let i = 0; i < events.length; i++) {
                const e = events[i] as Event;

                const allContributors:string[] = e.contributors.map((c: Contributor) => c.email);                
                AppUtil.debug('allContributors',allContributors);
                for(let index in allContributors){
                    const emailOfContributor = allContributors[index];
                    const user = await this.userDao.get(emailOfContributor);
                    
                    if(user && user.fcm)
                        notifs.push({
                            token: user.fcm,
                            data: {
                                url: Config.reviewOfEvent.push.url(e),
                                title: Config.reviewOfEvent.push.title(e),
                                body: Config.reviewOfEvent.push.body(e),
                                icon: '/icons/icon-192x192.png'
                            }
                        });
                    emails.push(notifyService.send(
                        Config.reviewOfEvent.email.template, 
                        emailOfContributor,
                        Config.reviewOfEvent.email.subject(e),
                            Config.reviewOfEvent.email.data(e)
                        )
                    );
                    
                }
            }
            await Promise.all(emails);
            if (notifs.length)
                await admin.messaging().sendAll(notifs);

            AppUtil.info('askReview OK')
        } catch (e) {
            AppUtil.error('askReview commit or notify ko', e);
        }

    }
}

export default new ScheduleService();