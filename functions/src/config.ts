import { Contributor } from "./models/Contributor";

export class Config {
    public static appBaseUrl = 'https://niortweb.fr';
    public static apikeyWebhook = '03ffef4e-091b-4t57-b34d-d6sl80f5a84b';

    public static WHITELIST_USERS = [''];

    public static adminApiKey = '61caf05d-50fb-4cd4-856d-08a5bb03e56a';

    public static webconfs : any = {
        'FEEDBACK_GATSBYJS_110121': 'https://meet.jit.si/FEEDBACK_GATSBYJS_110121'
    }


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