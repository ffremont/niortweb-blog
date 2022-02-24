---
title: "Pratiques pour sécuriser ses applications"
date: 2022-02-24T08:01:18+01:00
summary: "Principes et pratiques que l'on peut mettre en place pour sécuriser nos applications, teasing ! OWASP..."
summaryImage: "/assets/security-practices/padlock-428549_640.jpg"
tags: ["applications", "sécurité", "owasp"]
draft: false
---

Le 24.02.22 à NiortTech, présenté par Florent FREMONT.   

# Sujet : Pratiques pour sécuriser ses applications
Au delà de l'écriture de code, une application requiert de multiples compétences :
- en programmation
- sur les principes et technologies de tests
- en accessibilité 
- en architecture 
- en performance
- en sécurité...

Que dois-je mettre en place pour mener à bien la création / reprise d'une application en matière de sécurité ?

Sans tomber dans l'exhaustivité, il s'agit d'aborder concrètement les pratiques que l'on peut mettre en place pour apporter une couche de sécurité à nos applications.

# A voir et revoir 
{{< youtube id="x8w9D4EdwgU" >}}

# Slides
{{< slides url="//slides.com/florentfremont/pratiques-secu/embed" height="400" width="576" >}}


# En résumé
Sur la base des informations de la Fondation OWASP, je vous propose quelques éléments de pratiques et d'usages de la sécurité à l'échelle du développement. 
Ce meetup balaie le TOP10, des principes et des pratiques tel que la revue de code mais surtout OWASP SAMM.


La sécurité logicielle est un véritablement un sujet qui est à la fois vaste et complexe mais ce n'est pas une raison suffisante pour ne pas en appliquer quelques principes au quotidien.

Je vous propose quelques principes qui bien qu'imparfaits peuvent servir de base à vos réflexions lors de vos développements.

A l'image de la méthode Agile, **OWASP SAMM** offre un framework vous permettant de mettre en place des pratiques de sécurité. N'ayant pas personnellement mis en place OWASP SAMM, je me suis projeté à l'exploiter sur une pratique "Secure Build", vous trouverez mes retours ci-dessous ainsi que des liens complémentaires :
- [PDF sur la mise en place de la pratique OWASP SAMM Secure Build](/assets/security-practices/Owasp%20SAMM_compressed.pdf)
- [Excel OWASP SAMM](https://github.com/owaspsamm/toolbox-spreadsheet/tree/main/resources) / [Site OWASP SAMM](https://owaspsamm.org/)
- 👌 [TOP10 avec cas précis par catégorie](https://cheatsheetseries.owasp.org/IndexTopTen.html)
- [Recommandations ANSSI autour du web](https://www.ssi.gouv.fr/guide/recommandations-pour-la-securisation-des-sites-web/)

# Remerciements
Je remercie particulièrement **Romain BARRAUD**, développeur fullstack pour ses remarques et ses idées d'amélioration.