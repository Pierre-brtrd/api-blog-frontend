# 📘 Frontend Blog VueJS - Formation

[![Licence : MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)  
[![Vue 3](https://img.shields.io/badge/vue-3.x-42b983)](https://vuejs.org/)  
[![Vite](https://img.shields.io/badge/bundler-vite-yellow)](https://vitejs.dev/)  
[![Pinia](https://img.shields.io/badge/store-pinia-brightgreen)](https://pinia.vuejs.org/)  
[![VeeValidate](https://img.shields.io/badge/validation-vee--validate-orange)](https://vee-validate.logaretm.com/)  

---

> **Frontend Blog VueJS** *est le font-end d’une application de gestion d’articles développé en VueJS.*
>
> *Ce projet est à but éducatif et est utilisé dans le cadre de formation en développement web.*



## 📋 Table des matières

1. [Présentation](#-présentation)  
2. [Fonctionnalités](#-fonctionnalités)  
3. [Stack Technique](#-stack-technique)  
4. [Prise en main](#-prise-en-main)  
   - [Prérequis](#prérequis)  
   - [Installation](#installation)  
   - [Développement](#développement)  
   - [Build & Preview](#build--preview)  
5. [Variables d’environnement](#-variables-denvironnement)  
6. [Structure du projet](#-structure-du-projet)  
7. [Routing & State Management](#-routing--state-management)  
8. [Convention de style](#-convention-de-style)  
9. [Contribution](#-contribution)  
10. [Licence](#-licence)  

---

## 🔍 Présentation

Frontend **Vue 3** + **Vite** pour l’API Symfony du blog. Implémente :

- **Authentification** JWT (Pinia)  
- **CRUD** Articles & Utilisateurs (Admin)  
- **Listing public** des articles (Frontend)  
- **Validation** de formulaires avec VeeValidate & Yup  
- **Flash messages**, **modales de confirmation**, **transitions de page**  
- **Pagination**, **upload d’images**, **UI selon rôles**  

---

## ✨ Fonctionnalités

- **Login/Logout** sécurisé, token persistant  
- **Formulaires dynamiques** avec validation en temps réel  
- **Composants réutilisables** : cartes, modales, pagination, formulaires  
- **Transitions** slide & fade entre les vues  
- **Toggle switches** pour champs booléens  
- **Aperçu** d’image avant upload  

---

## 🛠 Stack Technique

- **Framework :** Vue 3 (Composition API)  
- **Bundler :** Vite  
- **State Management :** Pinia (+ persistent state)  
- **Validation :** Vee-Validate 4 + Yup  
- **Routing :** Vue-Router 4  
- **Styling :** SCSS (architecturé en abstracts / base / components / layout)  

---

## 🚀 Prise en main

### Prérequis

- [Node.js ≥ 16](https://nodejs.org/)  
- npm ou Yarn  

### Installation

```bash
git clone https://github.com/Pierre-brtrd/api-blog-frontend.git
cd pierre-brtrd-api-blog-frontend
npm install
```

### Développement

Installez les certificats SSL

```bash
mkdir certs
mkcert localhost 127.0.0.1 ::1
```

Puis vous pouvez lancer le server

```bash
npm run dev
```

Lance un serveur HTTPS local sur `https://localhost:3000` (certificats auto-signés dans `certs/`).

### Build & Preview

```bash
npm run build
npm run preview
```

------

## 🔑 Variables d’environnement

Créer un fichier `.env` à la racine :

```ini
VITE_API_BASE_URL=https://localhost:8000/api
VITE_API_UPLOAD_IMAGE_URL=https://localhost:8000/uploads
```

- **VITE_API_BASE_URL** – URL de base de l’API Symfony
- **VITE_API_UPLOAD_IMAGE_URL** – URL publique pour les images uploadées

------

## 📂 Structure du projet

```
├── public/                    # Assets statiques (favicon, images)
├── src/
│   ├── api/                   # wrapper `apiFetch`
│   ├── assets/                # SCSS : abstracts, base, components, layout
│   ├── components/            # Composants Vue réutilisables
│   ├── router/                # Configuration Vue-Router
│   ├── stores/                # Pinia stores (auth, articles, users, flash…)
│   ├── utils/                 # Fonctions utilitaires (roleMap…)
│   ├── validations/           # Schémas Yup pour formulaires
│   └── views/                 # Vues (Home, Login, Admin, Front)
├── vite.config.js             # Config Vite (alias, SCSS globals, HTTPS)
├── package.json               # Dépendances & scripts
└── LICENSE                    # Licence MIT
```

------

## 🧭 Routing & State Management

- **Routes** (`src/router/index.js`) protègent les pages admin via `meta.requiresAuth`.
- **Auth store** : `token` & `user` → persistance locale.
- **Stores** Articles & Users gèrent liste, pagination, CRUD, upload, état local.
- Composants injectent un flag `isAdmin` pour afficher l’UI adaptée.

------

## 🎨 Convention de style

- **SCSS modulaire** :
  - **abstracts/** – Variables, mixins, fonctions
  - **base/** – Reset, typographie, styles globaux
  - **components/** – UI blocks (boutons, cartes, formulaires, alertes…)
  - **layout/** – Styles spécifiques (header, banner…)
- **Mixin** `flexbox` pour utilitaires de mise en page
- Import global de `@use "@/assets/styles/abstracts/index"` via Vite

------

## 🤝 Contribution

1. Forkez le projet
2. Créez une branche `feat/ma-feature`
3. Committez vos changements (`git commit -m 'feat: add ...'`)
4. Pushez vers `origin feat/ma-feature`
5. Ouvrez une Pull Request

Merci pour votre contribution ! 🚀

------

## 📝 Licence

Ce projet est sous licence [MIT](https://chatgpt.com/c/LICENSE).

> Développé avec ❤️ par Pierre-Bertrand Webmarketing
