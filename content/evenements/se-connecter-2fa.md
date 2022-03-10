---
title: "Se connecter (2FA)"
date: 2022-03-10T12:30:00+01:00
summary: "Comment fiabiliser son authentification grâce au double facteur."
summaryImage: "/assets/se-connecter-2fa/login.jpeg"
tags: ["sécurité", "code"]
draft: false
---

Le 10.03.22 à NiortTech, présenté par Florent FREMONT, LeadDev MAIF.

# Sujet : "Se connecter" (2FA)

Nous rêvons tous d'un monde où les mires de login n'existent plus. Mais ce jour n'est pas encore arrivé.
En attendant, nous devons composer avec notre fameux couple : identifiant / mot de passe.

Il ne s'agira pas d'aborder la manière de gérer ces 2 éléments, mais plutôt de mettre en place l'authentification double facteur grâce à TOTP.
On appliquera cela une application démo 👨‍💻

# [Recommandations ANSSI](https://www.ssi.gouv.fr/guide/recommandations-relatives-a-lauthentification-multifacteur-et-aux-mots-de-passe/)

# Vidéo
{{< youtube id="XlJoce753NY" >}}

# Slides
{{< slides url="//slides.com/florentfremont/se-connecter-2fa/embed" height="400" width="576" >}}

# [Github > Appli Spring Boot TOTP > Démo](https://github.com/ffremont/niortweb-2fa)

# Liens utils
- [Google Authenticator](https://github.com/google/google-authenticator)
- [Implémentation TOTP Java](https://github.com/ChristopherSchultz/java-totp/blob/881b85676ed258866b601c84c555168e60bda684/src/main/java/net/christopherschultz/totp/TimeBasedOneTimePassword.java)