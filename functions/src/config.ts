import { Contributor } from "./models/Contributor";

import * as moment from 'moment';
import { Event } from "./models/v2/Event";
import { EmailCommunication } from "./models/v2/EmailCommunication";

export class Config {
    public static appBaseUrl = 'https://niortweb.fr';
    public static webappBaseUrl = 'https://app.niortweb.fr';
    public static newsletterElasticMailList = 'niortweb_newsletter';
    public static ROLES : any= {
        'ff.fremont.florent@gmail.com': ['ORGANIZER', 'ADMIN'],
        'romain.barraud1@gmail.com': ['ORGANIZER'],
        'stephane.chauvin@mydataball.com': ['ORGANIZER'],
        'cedric.teyton@promyze.com': ['ORGANIZER'],
        'sylvie.touzeau@agglo-niort.fr': ['ORGANIZER'],
        'camille@ipsoon.fr': ['ORGANIZER'],
        'daniel.bartolo@externe.maif.fr':  ['ORGANIZER'],
        'dirakkk@hotmail.com': ['ORGANIZER']
    }
    public static SOON_EXPECTED = 4 * 3600000; // une événement est dit "attendu", lorsqu'il est prévu dans les 4 heures
    public static ASK_REVIEW_IN = 48 * 3600000; // demande une avis après 48h

    // deprecated
    public static apikeyWebhook = '03ffef4e-091b-4t57-b34d-d6sl80f5a84b';

    public static WHITELIST_USERS = [''];

    // deprecated
    public static webconfs : any = {
        'FEEDBACK_GATSBYJS_110121': 'https://meet.jit.si/FEEDBACK_GATSBYJS_110121',
        'QUEST_CE_QUE_IA_160221': 'https://meet.jit.si/QUEST_CE_QUE_IA_160221_5bb03e56'
    }

    public static recallEvent = {
        push : {
            title: (e:Event) => `🙃 Rappel événement 🗨 Niortweb `,
            url: (e:Event) => `${Config.webappBaseUrl}/evenements/${e.id}`,
            body: (e:Event) => `🕧 Rendez-vous à ${moment(e.scheduled).format('HH:mm')} le ${moment(e.scheduled).format('ddd D MMM')} pour 🗨 ${e.title}`
        },
        email : {
            template: 'niortwebapp_rappel',
            subject: (e: Event) => `NiortWebApp - Rappel pour "${e.title}"`,
            data: (e: Event) => {
                return {
                    eventId: e.id,
                    eventTitle: e.title,
                    eventScheduled: `${moment(e.scheduled).format('HH:mm')} le ${moment(e.scheduled).format('ddd D MMM')}`
                }
            }
        }
    };

    public static newEvent = {
        email : {
            template: 'niortwebapp_assistant_comm',
            subject: (e: EmailCommunication) => e.subject,
            data: (e: EmailCommunication) => {
                return {
                    eventId: e.eventId,
                    eventTitle: e.event.title,
                    by: `${e.event.speaker.firstname} ${e.event.speaker.lastname}, ${e.event.speaker.job}`,
                    title: e.title,
                    subTitle: e.subTitle,
                    description: e.event.description,
                    where: e.event.where,
                    duration: e.event.duration+'',
                    eventScheduled: `${moment(e.event.scheduled).format('HH:mm')} le ${moment(e.event.scheduled).format('ddd D MMM')}`
                }
            }
        }
    };

    public static reviewOfEvent = {
        push : {
            title: (e:Event) => `🗳 Donnez votre avis 🗨 Niortweb `,
            body: (e:Event) => `⭐ Rendez-vous sur app.niortweb.fr `,
            url: (e:Event) => `${Config.webappBaseUrl}/evenements/${e.id}`
        },
        email : {
            template: 'niortwebapp_avis',
            subject: (e: Event) => `NiortWebApp - Je donne mon avis sur "${e.title}"`,
            data: (e: Event) => {
                return {
                    eventId: e.id,
                    eventTitle: e.title
                }
            }
        }
    };

    /**
     * Inscription à l'événement
     */
    public static registrationOnEvent = {
        template: 'niortwebapp_inscription',
        subject: (e: Event) => `NiortWebApp - Inscription enregistrée`,
        data: (e: Event) => {
            return {
                eventId: e.id,
                eventTitle: e.title,
                eventScheduled: `${moment(e.scheduled).format('HH:mm')} le ${moment(e.scheduled).format('ddd D MMM')}`
            }
        }
    };


    /**
     * Inscription à l'événement à distance
     */
    public static registeredEmailOnline = {
        template: 'niortweb_inscription_reussie_distance',
        subject: (c: Contributor) => `NiortWeb - Inscription enregistrée pour "${c.meetup.label}", le  ${c.meetup.date} à 12h30`,
        data: (c: Contributor) => {
            return {
                subject: c.meetup.label,
                date: c.meetup.date,
                speaker: c.meetup.speaker,
                googleAgenda: c.meetup.googleAgenda,
                meetupWebconf: `${Config.appBaseUrl}/api/meetup/${c.meetup.id}/webconf`
            }
        }
    };

    /**
     * Inscription à l'évément
     */
    public static registeredEmail = {
        template: 'niortweb_inscription_reussie_presentiel',
        subject: (c: Contributor) => `NiortWeb - Inscription enregistrée pour "${c.meetup.label}", le  ${c.meetup.date} à 12h30`,
        data: (c: Contributor) => {
            return {
                subject: c.meetup.label,
                date: c.meetup.date,
                speaker: c.meetup.speaker,
                googleAgenda: c.meetup.googleAgenda
            }
        }
    };
}