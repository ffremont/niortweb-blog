---
title: "JWT, de zéro"
date: 2022-03-30T08:00:00+01:00
summary: "Qu'est-ce que JWT ? A quoi cela sert ? Et comment l'utiliser ? Ce sont des questions que l'on verra ensemble dans cette article"
summaryImage: "/assets/jwt-de-zero/jwt-logo.png"
tags: ["javascript", "securité"]
draft: false
---

Le 29.03.22 à NiortTech, présenté par Florent FREMONT.   

# Sujet : JWT, de zéro
Si vous baignez dans le monde du développement vous utilisez très certainement des jetons Json Web Tokens. 
L'objectif de ce meetup sera de mieux connaître ce type de jeton.

Il sera question de :
- présenter globalement JWT
- voir les possibilités
- voir des cas d'usages

Pour illustrer au mieux ce qu'est un jeton JWT, nous manipulerons sur une application java.

# Slides
{{< slides url="//slides.com/florentfremont/jwt-de-zero/embed" height="400" width="576" >}}

# A voir et revoir 
{{< youtube id="HQVJ2Kr-WXE" >}}



# Sources
* [accès à l'application JAVA sur github](https://github.com/ffremont/nw-jwt)

# Liens utils 
1. [intro à JWT](https://jwt.io/introduction)
1. [précision sur les claims](https://auth0.com/docs/secure/tokens/json-web-tokens/json-web-token-claims)
1. [infos résumé sur JWT](https://www.jamestharpe.com/jwt/)
1. [ECDSA, des précisions](https://academy.bit2me.com/fr/quelle-est-la-courbe-elliptique-ecdsa/)
1. [JOSE, les RFC associées](https://datatracker.ietf.org/group/jose/documents/)
1. [STOP JWT dans pour les sessions](http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/)
1. [STOP JWT dans pour les sessions, again](https://curity.io/resources/learn/jwt-best-practices/#11-do-not-use-jwts-for-sessions)
1. [Public claims](https://www.iana.org/assignments/jwt/jwt.xhtml)
1. [OpenId, Pairwise Pseudonymous Identifiers](https://curity.io/resources/learn/ppid-intro/)