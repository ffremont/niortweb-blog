---
title: "Hugo, générateur de site statique"
date: 2020-03-05T08:00:00+01:00
summary: "Découverte du générateur de site web Hugo"
summaryImage: "/assets/hugo/hugo.png"
tags: ["javascript", "faas", "jamstack", "générateur"]
draft: false
---

Le 03.03.20 à NiortTech, présenté par Florent FREMONT.   

# Sujet : Hugo
Avec l'émergence des frameworks Javascript et des besoins web, une catégorie de site web se développe, celle des générateurs de site statiques (SSG).

C'est toujours la même histoire qui se dessine, une nouvelle solution qui permet quoi ? et pour quels besoins ?

Lors du meetup, il y a eu 
* une présentation de ce qu'est un site statique e
* un tour des différences avec les autres solutions (cms, saas)

# Slides
{{< slides url="//slides.com/florentfremont/hugo/embed" height="400" width="576" >}}

# Sources
* l'application a été hébergée sur **netlify**. [Le code source se trouve sur github](https://github.com/ffremont/niortweb-hugo)
* plateforme [netlify](https://www.netlify.com/)
* exemple d'un **shortcode** :  ["slides" sur l'article "hugo"](https://raw.githubusercontent.com/ffremont/niortweb-blog/master/content/evenements/hugo.md)
    * [l'implémentation du shortcode "slides"](https://raw.githubusercontent.com/ffremont/niortweb-blog/master/layouts/shortcodes/slides.html#)


# Démo
Pour testez chez vous :) :
* [installez hugo](https://gohugo.io/getting-started/installing/)
* [git clone](https://github.com/ffremont/niortweb-hugo)
* ```cd niortweb-hugo```
* faire un ```npm install```
* démarrer en local ```hugo server -D```
* construire le site ```hugo```

# En résumé
Hugo est une solution efficace qui permet de coupler un contenu lisible rédigé en markdown avec la philosophie JAMstack. 
Les SSG nous permettent d'avoir des gains, mais apportent aussi leur lot de pertes de fonctionnalités par rapport aux outils/produits traditionnels. 
Ce meetup a été l'occasion de balayer le champ des possibles avec Hugo sur la plateforme **Netlify**.

Pour la petite phrase de fin : les SSG s'accompagnent d'un changement des manières de faire tant sur le plan technique qu'éditorial.

# Remerciements
Merci à l'ensemble des personnes présentent à ce meetup pour leur participation. 
Si vous voulez [me faire part](mailto:ff.fremont.florent@gmail.com) d'informations complémentaires à rajouter à cet article, je me ferai un plaisir de les rajouter.