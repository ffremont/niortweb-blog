---
title: "Améliorer sa sécurité grâce à l’IA"
date: 2021-09-29T17:00:00+01:00
summary: "Dans le domaine de la cybersécurité, il est devenu primordial d'anticiper les attaques. 
Nous présenterons une démarche pour extraire des données opensources des graphes de relation entre les IP et AS mondiaux et le calcul des sauts topologiques de ces graphes pour détecter des évènements à venir qui peuvent concourir à une attaque ou une préparation à une attaque."
summaryImage: "/assets/ia-et-securite/rjzka5pj7noy1zmjdtkx.jpeg"
tags: ["javascript", "ia", "securite"]
draft: false
---

Le 29.09.21 à NiortTech, présenté par Stéphane CHAUVIN.

# Sujet : Améliorer sa sécurité grâce à l’IA
## Description
Dans le domaine de la cybersécurité, il est devenu primordial d'anticiper les attaques. 
Nous présenterons une démarche pour extraire des données opensources des graphes de relation entre les IP et AS mondiaux et le calcul des sauts topologiques de ces graphes pour détecter des évènements à venir qui peuvent concourir à une attaque ou une préparation à une attaque. 

En outre, 2 services seront présentés pour estimer un score de risque de cyberattaque pour les bâtiments (smartbuilding tertiaires, privés et collectifs) et pouvant être appliqués également au domaine de la smartcity. 

# AS et IP en tant que fondamental
**Autonomous System**(AS) est un ensemble d'IP dont le routage interne est dit cohérent. 
En collectant des informations sur les AS et les IP, il est possible d'alimenter une IA afin de prédire un risque d'attaque notamment DDos mais pas que. L'expertise de MyDataBall s'appuie sur ce type de données dans le but de fournir à ses clients une analyse sur leur exposition aux risques Cyber.

# Selon l'ANSSI
L'Agence nationale de la sécurité des systèmes d'information (ANSSI) est une source très riche en information sur les risques d'attaques. 

Dans le meetup, Stéphane nous a exposé un principe de base qui est celui de la redirection des flux réseau dans le but de corrompre soit le contenu ou la destination.

L'attaquant peut provoquer une redirection de flux en faisant par exemple un Deni de service et ceci dans le but d'obtenir plus de trafic sur un AS malveillant. 
{{< img src="/assets/ia-et-securite/attaque-anssi.png" >}}

[Consulter le Guide DDos de l'ANSSI](https://www.ssi.gouv.fr/uploads/2015/03/NP_Guide_DDoS.pdf)

# Le produit MyDataBall
La solution MyDataBall recueille **toutes les 5 minutes** des informations sur les AS dans le monde entier dans le but d'entraîner et de restituer ces informations sous la forme 
* d'un Graph en présentant la topologie des AS
    * en couleur le traffic montant et descendant sur les AS 
* d'une carte pour présenter la repartition des AS et les flux
    * les relations entre AS sont présentées
    * les infrastructures physiques aussi, les câbles
* d'un rapport 

Pour évaluer un risque Cyber, il est important de lier, le virtuel et le réel en représentant sur une carte le flux réseau. Il en vient qu'un pays totalitaire ou en guerre entrainera une certaine forme de risque.

{{< img src="/assets/ia-et-securite/produit-support.png" >}}

# Enjeu des indicateurs et du temps réel
Il est important de souligner que la collecte et l'exploitation de plusieurs TERA octets de données chaque jour est un challenge à une analyse "temps réel". Parallélement à la collecte de données, le calcule de certains indicateurs peut prendre jusqu'à 48h. 

Il y a **un réel enjeu d'extraire et de croiser les données le plus vite possible** afin de savoir si nous sommes dans une attaque et ceci dans le but de "ne pas arriver après la bataille".

C'est dans cette configuration là que MyDataBall intègre de l'IA pour l'assister dans cette mission d'exploitation de la donnée.

# Indicateurs pour l'évaluation
Pour apprécier un risque il est nécessaire de collecter des données sous la forme d'indicateurs. 
MyDataBall en exploite 16 topologiques et 6 sur les sauts topologiques.

{{< img src="/assets/ia-et-securite/indicateurs-support.png" >}}

# ⚡️ Calcul éclair d'indicateurs grâce à de l'IA
**Grâce à des algorithmes de deeplearning** il est possible d'abaisser le temps de calcul d'indicateurs afin de restituer PLUS RAPIDEMENT une analyse de risques / d'utilisations.

Les points rouge correspondent aux mesures réels d'un indicateur et la courbe en bleu à sa prédiction par l'IA. 

**Fiable à plus de 99%**, l'AI MyDataBall prouve par la mesure sa pertinence dans ce domaine de l'analyse et la prévention des risques Cyber.

{{< img src="/assets/ia-et-securite/prediction-support.png" >}}

# Information sur un AS
La solution de MyDataBall permet d'obtenir notamment des informations sur un AS.
Sur le slide, il a été présenté une restitution des chemins physiques (câbles) et logiques (AS).

{{< img src="/assets/ia-et-securite/illustration-ihm-support.png" >}}


# IoT secure
L'IoT, autrement dit, l'internet des objets est un domaine qui croit extrèmement vite. Des prévisions avancent une augmentation de plusieurs milliards d'objets dans les années qui viennent.

**Le risque Cyber tend à se déporter vers les appareils plus faiblements sécurisés** comme les objets connectés. 

[Lire les recommandations ANSSI sur l'IoT](https://www.ssi.gouv.fr/administration/guide/recommandations-relatives-a-la-securite-des-systemes-dobjets-connectes/)
{{< img src="/assets/ia-et-securite/iot.png" >}}

Si l'on conjugue, une utilisation toujours plus important de l'IoT et une exposition Cyber de plus en plus importante, il devient pertinent d'accorder une attention toute particulière à ces appareils.

MyDataBall permet d'apprécier les risques et d'agir notamment en :
* évaluant les risques à l'échelle d'un batiment
* rationnalisant la transmission d'informations (impact écologique)
* évaluant le risque Cyber (impact sécuritaire en activant par exemple des Firewalls)

{{< img src="/assets/ia-et-securite/iot-support.png" >}}


# Support
[{{< img src="/assets/ia-et-securite/apercu-support.png" >}}](/assets/ia-et-securite/support-stephane-chauvin-ia-securite.pdf)

# Résumé
A travers ce meetup, Stéphane nous a partagé sa passion de la Data et son goût de l'expertise. 

Au delà des données et de leur exploitation, les usages évoluent et il devient de plus en plus pressant de prendre la mesure des risques / usages ainsi que des actions que l'on peut mettre en place pour se protéger. 


# Contacter MyDataBall
Stéphane CHAUVIN, CEO de MyDataBall
[stephane.chauvin@mydataball.com](mailto:stephane.chauvin@mydataball.com)