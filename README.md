# 🚀 Boilerplate API NestJS - Clean Architecture

Un boilerplate d'API REST robuste construit avec NestJS, intégrant Clean Architecture et Domain-Driven Design (DDD).

## 📋 Sommaire

- [Architecture](#-architecture)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Démarrage](#-démarrage)
- [Structure du Projet](#-structure-du-projet)
- [Authentification](#-authentification)
- [Documentation API](#-documentation-api)

## 🏗 Architecture

Ce projet suit les principes de Clean Architecture avec une séparation claire des responsabilités :

```
src/
├── application/     # Use cases, commands et queries
├── domain/         # Entités, interfaces et logique métier
├── infrastructure/ # Implémentations techniques (repositories, services)
└── presentation/   # Controllers, DTOs et exceptions
```

## 💻 Technologies

- **Framework**: NestJS
- **ORM**: Prisma
- **Base de données**: MySQL
- **Auth**: JWT + Refresh Tokens
- **Language**: TypeScript
- **Tests**: Jest

## ⚙️ Installation

1. Cloner le repository

```bash
git clone https://github.com/Jaybee-v/boilerplate-api.git
cd boilerplate-api
```

2. Installer les dépendances

```bash
npm install
```

3. Configuration

```bash
cp .env.example .env
```

4. Configurer les variables d'environnement dans `.env`:

```env
DATABASE_URL="mysql://user:password@localhost:3306/db_name"
JWT_SECRET="votre-secret-jwt"
JWT_EXPIRATION="1h"
REFRESH_TOKEN_SECRET="votre-secret-refresh"
REFRESH_TOKEN_EXPIRATION="7d"
```

## 🚀 Démarrage

1. Préparer la base de données

```bash
npx prisma generate
npx prisma migrate dev
```

2. Lancer l'application

```bash
# Développement
npm run start:dev

# Production
npm run start:prod
```

## 📁 Structure du Projet

### Modules Principaux

- **Admin**: Gestion des administrateurs avec rôles (SUPER_ADMIN, ADMIN)
- **Auth**: Authentification JWT avec refresh tokens
- **Common**: Utilitaires et configurations partagés

### Points d'API Clés

```typescript
// Admin Routes
POST   /admin           // Créer un admin
GET    /admin           // Liste des admins
GET    /admin/:id       // Détails d'un admin
PATCH  /admin/:id       // Modifier un admin

// Auth Routes
POST   /auth/login      // Connexion
POST   /auth/refresh    // Rafraîchir le token
POST   /auth/logout     // Déconnexion
```

## 🔐 Authentification

Le système d'authentification utilise:

- JWT pour les access tokens
- Refresh tokens stockés en base de données
- Système de rôles (SUPER_ADMIN, ADMIN)

## 📖 Documentation API

La documentation Swagger est disponible à:

```
http://localhost:3000/api
```

## 🧪 Tests

```bash
# Tests unitaires
npm run test

# Tests e2e
npm run test:e2e

# Couverture
npm run test:cov
```

## 📄 License

MIT License - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👥 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

---

Créé avec ❤️ par [Jaybee-v](https://github.com/Jaybee-v)
