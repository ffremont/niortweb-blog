---
title: "Feedback sur Gatsby"
date: 2021-01-21T08:00:00+01:00
summary: "Retour d'expérience avec la vision technique sur la solution Gatsby à travers plusieurs cas pratiques. Par Romain BARRAUD."
description: "Retour d'expérience avec la vision technique sur la solution Gatsby à travers plusieurs cas pratiques. Par Romain BARRAUD."
summaryImage: "/assets/feedback_gatsby/header.png"
image: "/assets/feedback_gatsby/header.png"
tags: ["javascript", "files", "web","framework"]
draft: false
---

Le 11.01.2021 sur Jitsi, présenté par Romain BARRAUD.

Avec l’émergence des frameworks Javascript et des besoins web, une catégorie de site web se développe, celle des générateurs de site statiques (SSG).


# Résumé
**Gatsby** est un générateur de site web performant, qui va permettre d'interroger n'importe quelle ressource (Headless cms, json, markdown) et permettre de créer/générer des pages statiques à partir de ces données. Cela permet d'obtenir des performances sans précedent, et de ne restituer que des fichiers statiques bien qu'une ressource soit traitée.
Cette intéropérabilité s'appuie sur la technologie **GraphQL**, permettant tant sur l'implémentation du rendu des pages que de l'importation des données.


## Concrétement en développement
```sh
gatsby develop
```
La stack Gatsby nous offre du hot reloading pour concevoir les pages web. A cela s'ajoute **une API GraphQL** nous permettant d'accéder aux données utilisables.

Pour vous aider à naviguer dans ces données, nous disposez en mode dev, du client "Gatbsy Playground" 
```txt
localhost:8000/___graphql
```

Lors de cette séance, nous avons vu que l'ajout de fichiers "data", alimentent automatiquement l'API GraphQL. Ainsi, les pages peuvent puiser dans ces nouvelles données.


## Au build
```sh
gatsby build
```
Lors de cette étape Gatsby va générer les pages sur la base de données GraphQL à disposition.
Le resultat HTML / JS / CSS peut être ensuite déployé sur un serveur web "classique".


## Plugins 
**Grâce a ses plugins** et plus précisément avec le plugin présenté: Gatsby Image, il est possible de rapidement mettre en place des images optimisées, prenant en compte les meilleures pratiques afin d'obtenir le meilleur score possible sur Google pageSpeed insight

# Slides et ressources
[Consulter / Télécharger](/assets/feedback_gatsby/gatsbyJS.pdf)
