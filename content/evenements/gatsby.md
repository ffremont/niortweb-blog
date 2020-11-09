---
title: "GatsbyJS et la JAMStack"
date: 2020-11-07T07:01:18+01:00
summary: "A la découverte du générateur de site statique Gatsby et de son écosystème."
summaryImage: "/assets/gatsby/gatsby-header.jpg"
tags: ["javascript", "staticsite"]
draft: false
---

Le 15.10.20 à NiortTech, présenté par Adrien VERGNAUD.

# Sujet : GatsbyJS et la JAMStack
## Focus sur Gatsby
Gatsby s'inscrit dans la catégorie des générateurs de sites statiques. Basé sur la librairie ReactJs, il offre 
* une évolutivité élevée 
* un catalogue de plugins important
* une interconnexion au build avec a peu près tout
* utilisation d'API GraphQL

## Netlify : build + hébergement
Un site statique ne serait rien sans un hébergement adapté. Le choix a été fait de vous présenter la solution **Netlify**. Cette dernière offre une plateforme de BUILD et de RUN pour vos sites statiques. 

## CMS headless
Pour vous montrer le potentiel de **Gatsby**, Adrien utilise la solution SAAS **Contentful** . Qui est un **CMS headless**, qui expose une API GraphQL, consommé par Gatsby au moment du build.

# Slides
{{< slides url="//slides.com/adrienvergnaud/deck/embed" height="400" width="576" >}}

# Sources
[Le code source se trouve sur github](https://github.com/avergnaud/cat-fintech)

# En résumé
Gatsby est une solution complète pour générer un site statique, en mélant simplicité et possibilité. 
Extensible avec ses plugins et sa base ReactJs, il offre à toutes les entreprises la garantie d'un interconnexion avec vos sources de données (BDD, markdown, API REST, ...).
Quant à l'hébergement Netlify, offre une solution complète et à la fois adaptée pour Gatsby.
