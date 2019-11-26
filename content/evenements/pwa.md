---
title: "PWA, what ?"
date: 2019-11-22T07:01:18+01:00
summary: "Qu'est ce qu'une Progressive Web App ? Elles nous apportent quoi ? Nos développements dans tous ça ?"
summaryImage: "/assets/pwa/PWA_magento_0.png"
tags: ["javascript", "workerjs", "pwa"]
draft: false
---

Le 19.11.19 à NiortTech, présenté par Florent FREMONT.

# Sujet : PWA
Les progressive web app sont des catégories d'applications offrant des fonctionnalités s'inspirant de ce qui se fait sur les apps natives. 

* Qu'est-ce qui fait qu'une application web est une PWA ?
* Quelles sont ses caractéristiques ?
* Quelles sont les avantages ?
* A travers 3 cas d'utilisation, nous avons vu comment nous pourrions les appliquer.

# Slides
{{< slides url="//slides.com/florentfremont/deck-2/embed" height="400" width="576" >}}

# Sources
L'application a été hébergée sur **heroku** le temps de la présentation. [Le code source se trouve sur github](https://github.com/ffremont/niortweb-pwa)

Le code comporte 3 cas d'utilisation qui s'appuie sur un back réalisé en NestJs (exposant du SSE notamment).

# En résumé
Les PWA offrent de nouvelles fonctionnalités (install banner, full screen...) mais surtout, elles s'appuient sur des  spécifications (cache API, notification API...).
Pour la plupart des applications web que l'on réalise aujourd'hui, nous pourrions les faire en PWA. 
Le niveau à minima à implémenter serait la fiabilisation de l'application et son installation (cas 1 des slides).
