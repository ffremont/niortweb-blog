import * as functions from 'firebase-functions';
import express = require('express');
import * as admin from 'firebase-admin';
import registrationResource from './resources/registration.resource';
import context from './context';
import cors = require('cors');
import * as moment from 'moment';
import 'moment-timezone';
import 'moment/locale/fr';
import meetupResource from './resources/meetup.resource';
import eventResource from './resources/event.resource';
import myProfilResource from './resources/myprofil.resource';
import schedulerResource from './resources/scheduler.resource';
import { AppUtil } from './apputil';
import {protos} from '@google-cloud/dialogflow';

const customCreds: any = process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (customCreds) {
    let serviceAccount = require(customCreds);

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
} else {
     admin.initializeApp();  
}
moment.locale('fr');
moment.tz.setDefault("Europe/Paris");

context.db(admin.firestore());
const app = express();
app.use(cors());

// public
app.post('/api/meetup/:id/register', registrationResource.register.bind(registrationResource));
app.get('/api/meetup/:id/counter', registrationResource.registeredCount.bind(registrationResource));
app.get('/api/meetup/:id/webconf', meetupResource.webconf.bind(meetupResource));
app.get('/api/meetup/:id/contributors', meetupResource.contributors.bind(meetupResource));

// version 2 avec app.niortweb.fr
app.post('/api/events', eventResource.addEvent.bind(eventResource));
app.get('/api/events', eventResource.getEvents.bind(eventResource));
app.put('/api/events/:id', eventResource.update.bind(eventResource));
app.post('/api/events/:id/register-email', eventResource.registerEmail.bind(eventResource));
app.delete('/api/events/:id', eventResource.removeEvent.bind(eventResource));
app.post('/api/heartbeat', schedulerResource.heatbeat.bind(schedulerResource));

app.get('/api/my-profil', myProfilResource.get.bind(myProfilResource));
app.put('/api/my-profil', myProfilResource.update.bind(myProfilResource));


// @see https://cloud.google.com/dialogflow/es/docs/fulfillment-webhook
app.post('/api/sandbox/dialog-flow', (req, res) => {
    AppUtil.info('sandbox / dialog-flow '+JSON.stringify(req.body));
    const {intent} = req.body;

    if(intent && intent.displayName === 'creer_checklist'){
        AppUtil.info('creer_checklist !! ');
    }



    AppUtil.ok(res, {
        fulfillmentMessages: [{
            text: {
                text: ['mon web hook']
            }
        }]
    });
});

const myDb = {
    'ff.fremont.florent@gmail.com':[{
        type: 'automobile',
        garanties:['accident']
    }]
} as any;
app.post('/api/sandbox/dialog-flow/suis-je-garanti-assurance', (req, res) => {
    
    const myWebhookRequest = req.body as protos.google.cloud.dialogflow.v2.WebhookRequest, 
    // récupération de l'email (paramètre de l'intention suivie )
    customerEmail : any = myWebhookRequest.queryResult?.outputContexts
        ?.filter(c => c.name?.endsWith('mail-choix-followup'))
        .map((c:any) => c.parameters['email']);

    
    AppUtil.debug('call /api/sandbox/dialog-flow/suis-je-garanti-assurance ');
    const myWebhookResponse = {
        outputContexts: myWebhookRequest.queryResult?.outputContexts,
        /*fulfillmentMessages: [{
            text: {
                text: ['Texte venant du WH (valeur par défaut)']
            }
        }]*/
    } as protos.google.cloud.dialogflow.v2.WebhookResponse;

    // traitement en fonction de l'action
    let typeContratChoisi :string= '';
    switch(myWebhookRequest.queryResult?.action){
        case 'contrat-choix':
            // récup. du type de contrat choisi
            typeContratChoisi = (myWebhookRequest.queryResult.parameters as any)['type-contrat'];
            if(!(myDb[customerEmail] || [] as any).some((contrat:any) => contrat.type === typeContratChoisi)){
                myWebhookResponse.followupEventInput = {
                    name:'AUCUN_CONTRAT',
                    languageCode: "fr"
                };
            }
        break;
        case 'garantie-choix':
            // récup. de l'information "suis-je garantie"
            // typeContratChoisi est récup. du contexte suivi
            typeContratChoisi = (myWebhookRequest.queryResult.outputContexts
                ?.find(c => c.name?.endsWith('/contrat-choix-followup'))
                ?.parameters as any)['type-contrat'];
                
            // la garantie provient des paramétres de l'intention
            const garantieChoisie = (myWebhookRequest.queryResult.parameters as any)['garantie'],
            contrat = (myDb[customerEmail] || [] as any).find((c :any) => c.type === typeContratChoisi);

            if(!contrat || contrat.garanties.indexOf(garantieChoisie) === -1){
                myWebhookResponse.followupEventInput = {
                    name:'PAS_LA_GARANTIE',
                    languageCode: "fr"
                };
            }
        break;
    }

    AppUtil.ok(res, myWebhookResponse);
});

export const api = functions.https.onRequest(app);
