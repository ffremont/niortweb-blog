---
title: "Mon 1er chatbot from scratch avec DialogFlow"
date: 2021-05-04T13:00:00+01:00
summary: "De manière efficace et pragmatique, nous souhaitons partager la mise en place d'un chatbot avec la technologie de Google : DialogFlow."
summaryImage: "/assets/dialogflow_from_scratch/dialogflow.png"
tags: ["web", "IA","BOT"]
draft: false
---

Le 04.05.21 à NiortTech (aussi via Jitsi), présenté par Romain BARRAUD et Florent FREMONT.

# Sujet : Mon 1er chatbot from scratch avec DialogFlow
De manière efficace et pragmatique, nous souhaitons partager la mise en place d'un chatbot avec la technologie de Google : DialogFlow.

Au programme : 
* présentation DialogFlow / concepts
* les cas d'usage avec un chatbot
* l'entraînement 
* le branchement à nos services
* la mise en production

# Fil rouge :)
Savoir si mon contrat contient la garantie que je demande
* l'authentification se fera sur la base de l'email
* le client choisira son contrat avant de demander la garantie
* les listes "garanties" et "contrats" seront stockées dans DialogFlow

# [Télécharger l'agent](/assets/dialogflow_from_scratch/suis-je-garanti-assurance.zip)


# Slides
{{< slides url="//slides.com/florentfremont/deck-c6dc76/embed" height="400" width="576" >}}

# Replay
{{< youtube id="S8Gj19PKv2s" >}}

# Code Webhook
```javascript
import {protos} from '@google-cloud/dialogflow';

app.post('/api/sandbox/dialog-flow/suis-je-garanti-assurance', (req, res) => {
    const myWebhookRequest = req.body as protos.google.cloud.dialogflow.v2.WebhookRequest, 
    // récupération de l'email (paramètre de l'intention suivie )
    customerEmail : any = myWebhookRequest.queryResult?.outputContexts
        ?.filter(c => c.name?.endsWith('mail-choix-followup'))
        .map((c:any) => c.parameters['email']);

    const myWebhookResponse = {
        outputContexts: myWebhookRequest.queryResult?.outputContexts,
        // si on veut rajouter notre propre texte
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
```

# Intégration : Dialogflow messenger
Ajout dans l'application web
```html
<script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></script>
<df-messenger
  intent="WELCOME"
  chat-title="Mes garanties, mon contrat"
  chat-icon="/assets/images/dialogflow-logo.svg"
  agent-id="1660bcaa-65d7-4f83-b7b8-01189b064103"
  language-code="fr"
></df-messenger>
```

# En résumé
**DialogFlow** est une solution SAAS clef en main permettant la mise en place d'un bot et cela rapidement.
Au delà des concepts d'Agents, d'entités, et d'intentions, DialogFlow permet une interconnexion simplifiée avec les SI grâce aux webhooks.

Pour vos projets, il est possible d'exploiter votre agent directement à travers le SDK ou via une des nombreuses intégrations disponibles : DialogFlow messenger, Facebook, Slack, Genesis...

En somme, DialogFlow est une solution sur étagère, cloudifiée, interopérable et surtout made in Google.
