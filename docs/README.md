# Projet IFT3150: StepOn

> **Page web du projet (IFT3150)**: [https://protolabo.github.io/StepOn/](https://protolabo.github.io/StepOn/)

## Description du projet

**StepOn** est une application de marche qui génère des parcours personnalisés pour aider les utilisateurs à atteindre leurs objectifs de pas quotidiens, comme par exemple 10 000 pas. L'application calcule également le temps nécessaire pour compléter chaque parcours, permettant aux utilisateurs de planifier leurs sessions de marche en fonction de leur emploi du temps. En plus d'encourager l'activité physique, StepOn offre une dimension sociale en permettant aux utilisateurs de se connecter avec des partenaires de marche locaux via un réseau social intégré.

### Fonctionnalités

- **Génération de parcours personnalisés** : Générer des parcours adaptés aux objectifs de pas de l’utilisateur et à ses préférences.
- **Estimation du temps de parcours** : Calcul précis du temps nécessaire pour compléter le parcours, adapté au rythme de marche de l'utilisateur.
- **Flexibilité des parcours** : Options pour ajuster la distance, le lieu, et la durée en fonction des besoins en temps réel.
- **Réseau social intégré** : Possibilité de trouver et de marcher avec des partenaires locaux.
- **Suivi des progrès** : Visualisation des statistiques de pas quotidiens et hebdomadaires.
- **Compatibilité avec des appareils portables** : Synchronisation avec montres connectées et trackers de fitness.
- **Notifications et rappels** : Alertes pour motiver l'utilisateur à atteindre ses objectifs quotidiens.
- **Protection des données** : Gestion sécurisée des informations personnelles, conforme aux normes de protection des données.

## 🌐 Infrastructure

L’infrastructure de StepOn repose sur une architecture cloud robuste, conçue pour évoluer et s'adapter aux besoins des utilisateurs :

- **Serveur Backend** : Gestion des requêtes, génération des parcours, et interaction avec la base de données, via un serveur en Node.js/Express.
- **Base de données** : Stockage des informations utilisateur, préférences de parcours et statistiques dans une base NoSQL (MongoDB).
- **API Géolocalisation** : Intégration avec des APIs de géolocalisation (Google Maps, OpenStreetMap) pour la création de parcours dynamiques.
- **Application mobile** : Développement en React Native pour une interface fluide sur Android et iOS.
- **Sécurité** : Authentification sécurisée (OAuth, JWT) et chiffrement des données sensibles (SSL/TLS).
- **Services tiers** : Connexion avec Fitbit, Google Fit et Apple Health pour enrichir les données et améliorer la personnalisation des recommandations.

# 📘 Documentation

La documentation complète est disponible et inclut des guides pour :

- **Installation et configuration** : Instructions pour l'installation de l'application, configuration des accès API, et exigences système.
- **API** : Références des endpoints API, paramètres et exemples d'appels pour l'intégration de fonctionnalités.
- **Utilisation** : Guide utilisateur, y compris la création de parcours, le suivi des progrès, et l'activation des notifications.
- **Guide développeur** : Ressources pour les développeurs, incluant les architectures backend et frontend, et les spécifications techniques.
- **Sécurité des données** : Détails sur les pratiques de gestion et de protection des données personnelles des utilisateurs.

Retrouvez toute la documentation détaillée sur la [page web du projet](https://protolabo.github.io/StepOn/).

# 🗂️ Organisation

## Liste des Pages à Implémenter

1. **Page d'accueil (Home)**
    - Présentation en roue de l'accomplissement de pas quotidien
    - Présentation des principales fonctionnalités de l'application (creer un parcours, afficher les anciens parcours..).
    - Affichage des données d'activité de l'utilisateur.

2. **Page de connexion (Login)**
    - Formulaire de connexion avec numero de téléphone.
    - Formulaire de connexion avec e-mail et mot de passe.
    - Lien vers la page de mot de passe oublié.

3. **Page d'inscription (Sign Up)**
    - Formulaire d'inscription avec saisie des informations personnelles de l'utilisateur.
    - Option pour accepter les conditions d'utilisation .

4. **Page de mot de passe oublié (Forgot Password)**
    - Saisie du numéro de téléphone pour réinitialiser le mot de passe.

5. **Page de parcours (Map)**
    - Carte interactive intégrée avec affichage des itinéraires générés.
    - Options pour définir, personnaliser et sauvegarder les itinéraires.
    - Suivi en temps réel de la position de l'utilisateur pendant le parcours.

6. **Page de profil (Profil)**
    - Affichage et modification des informations utilisateur.
    - Suivi des progrès et des statistiques de parcours complétés.
    - Option de déconnexion.

7. **Page de paramètres (Settings)**
    - Options de configuration pour les notifications, la confidentialité et les préférences d'affichage.
    - Gestion des permissions de localisation.


## 📌 Notes Techniques

- **Navigation** : Utilisation de `react-navigation` pour organiser la navigation entre les différentes pages.
- **Authentification** : Intégration de Firebase pour la gestion de l'authentification utilisateur.
- **Géolocalisation** : Utilisation de `react-native-maps` et de l'API Google Maps pour les fonctionnalités de parcours et de géolocalisation.

---

Ces pages forment la base de l'application et permettent d'assurer une expérience utilisateur fluide et complète.


# 💻 Installation

<!-- TODO -->