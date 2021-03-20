import * as functions from 'firebase-functions';
import express = require('express');
import * as admin from 'firebase-admin';
import registrationResource from './resources/registration.resource';
import context from './context';
import cors = require('cors');
import meetupResource from './resources/meetup.resource';
import eventResource from './resources/event.resource';

const customCreds: any = process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (customCreds) {
    let serviceAccount = require(customCreds);

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
} else {
     admin.initializeApp();  
}
context.db(admin.firestore());
const app = express();
app.use(cors());

// public
app.post('/api/meetup/:id/register', registrationResource.register.bind(registrationResource));
app.get('/api/meetup/:id/counter', registrationResource.registeredCount.bind(registrationResource));
app.get('/api/meetup/:id/webconf', meetupResource.webconf.bind(meetupResource));
app.get('/api/meetup/:id/contributors', meetupResource.contributors.bind(meetupResource));

app.post('/api/events', eventResource.addEvent.bind(eventResource));
app.get('/api/events', eventResource.getEvents.bind(eventResource));
app.put('/api/events/:id', eventResource.update.bind(eventResource));

export const api = functions.https.onRequest(app);
