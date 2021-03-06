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
import emailResource from './resources/email.resource';

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
app.post('/api/events/:id/emails', emailResource.sendComm.bind(emailResource));
app.put('/api/events/:id', eventResource.update.bind(eventResource));
app.post('/api/events/:id/register-email', eventResource.registerEmail.bind(eventResource));
app.delete('/api/events/:id', eventResource.removeEvent.bind(eventResource));
app.post('/api/heartbeat', schedulerResource.heatbeat.bind(schedulerResource));


app.get('/api/my-profil', myProfilResource.get.bind(myProfilResource));
app.put('/api/my-profil', myProfilResource.update.bind(myProfilResource));


export const api = functions.https.onRequest(app);
