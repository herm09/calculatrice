# Calculatrice Web

Une calculatrice web développée avec React et Vite, intégrant une pipeline CI/CD complète pour le déploiement automatique sur Vercel.

## Membres du projet

| NOM | Prénom |
|-----|--------|
| TETARD | Hermione |
|-----|--------|
| Guillemin | Matheo |

*Note : Compléter avec les noms réels des membres du groupe.*

## GitHub Project

[Lien vers le GitHub Project](https://github.com/herm09/calculatrice/projects) - Suivi des tâches et organisation du projet

*Note : Remplacer par le lien réel vers votre GitHub Project.*

## Architecture et choix techniques

### Stack technique
- **React 19** : Bibliothèque UI pour créer l'interface utilisateur
- **Vite 7** : Build tool moderne et rapide pour le développement
- **Vitest** : Framework de tests unitaires
- **Testing Library** : Tests de composants React
- **ESLint** : Linting du code
- **Prettier** : Formatage automatique du code

### Structure du projet
```
calculatrice/
├── src/
│   ├── lib/
│   │   ├── calc.js          # Fonctions pures de calcul
│   │   └── calc.test.js     # Tests unitaires des fonctions
│   ├── Calculator.jsx       # Composant principal de la calculatrice
│   ├── Calculator.test.jsx  # Tests du composant Calculator
│   ├── App.jsx              # Composant racine
│   └── App.test.jsx         # Tests du composant App
├── .github/
│   └── workflows/
│       └── ci.yml           # Pipeline CI/CD GitHub Actions
├── vite.config.js           # Configuration Vite + Vitest
└── vitest.setup.js          # Configuration de setup pour Vitest
```

### Fonctionnalités
- **Calculatrice** : Addition, soustraction, multiplication, division
- **Gestion d'erreurs** : Validation des entrées et gestion de la division par zéro
- **Tests** : Couverture complète avec tests unitaires et tests de composants
- **CI/CD** : Pipeline automatique avec tests et déploiement sur Vercel

## Installation et exécution

### Prérequis
- Node.js 20 ou supérieur
- npm ou yarn

### Installation
```bash
# Cloner le dépôt
git clone https://github.com/herm09/calculatrice.git
cd calculatrice

# Installer les dépendances
npm install
```

### Développement
```bash
# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Scripts disponibles
```bash
# Développement
npm run dev          # Lance le serveur de développement

# Tests
npm run test         # Lance les tests en mode watch
npm run test:ci      # Lance les tests une fois (pour CI)

# Build
npm run build        # Construire pour la production
npm run preview      # Prévisualiser le build de production

# Qualité de code
npm run lint         # Vérifier le code avec ESLint
npm run lint:fix     # Corriger automatiquement les erreurs ESLint
npm run format       # Formater le code avec Prettier
npm run format:check # Vérifier le formatage sans modifier
```

### Tests
```bash
# Lancer les tests en mode watch (développement)
npm run test

# Lancer les tests une fois (pour CI/CD)
npm run test:ci
```

Les tests couvrent :
- **Tests unitaires** : Fonctions de calcul (addition, soustraction, multiplication, division)
- **Tests de composants** : Rendu et interactions de la calculatrice

## Déploiement sur Vercel

### Accès à la version déployée
[Lien vers la version déployée sur Vercel](https://calculatrice.vercel.app)

*Note : Le lien sera disponible après le premier déploiement réussi via un tag. Remplacer par votre URL Vercel réelle.*

### Configuration Vercel
1. Créer un compte sur [Vercel](https://vercel.com)
2. Créer un nouveau projet et lier le dépôt GitHub
3. Récupérer le token d'accès Vercel dans les paramètres du compte
4. Configurer les secrets GitHub (voir section CI/CD ci-dessous)

## Pipeline CI/CD

### Configuration
La pipeline CI/CD est configurée via GitHub Actions dans `.github/workflows/ci.yml`.

### Jobs de la CI (Pull Requests)
Sur chaque Pull Request vers `main`, les jobs suivants s'exécutent automatiquement :

1. **install** : Installation des dépendances avec `npm ci`
   - Utilise le cache npm pour accélérer les installations
   - Vérifie que le projet peut être installé correctement

2. **lint** : Vérification du code avec ESLint
   - Vérifie la conformité du code aux règles de linting
   - Dépend du job `install`

3. **test** : Exécution des tests unitaires et de composants
   - Lance `npm run test:ci` pour exécuter tous les tests
   - Dépend du job `install`

4. **build** : Build du projet pour vérifier qu'il compile sans erreur
   - Lance `npm run build` pour construire la production
   - Dépend des jobs `lint` et `test`
   - Upload les artefacts de build (dist/) pour inspection

### Déploiement CD (Tags uniquement)
Le déploiement sur Vercel se fait **uniquement** lors du push d'un tag versionné (format `v*.*.*`).

**Processus de déploiement automatique** :
1. Lorsqu'un tag `v*.*.*` est poussé sur le dépôt (ex: `v1.0.0`)
2. Les jobs `install`, `lint`, `test`, `build` s'exécutent d'abord (vérifications)
3. Si tous les jobs passent, le job `deploy` s'exécute automatiquement :
   - Installation de Vercel CLI
   - `vercel pull --yes` : Récupération de la configuration Vercel (variables d'environnement, etc.)
   - `vercel build --prod` : Build du projet avec Vercel en mode production
   - `vercel deploy --prebuilt --prod` : Déploiement en production sur Vercel

**Avantages de ce processus** :
- ✅ Déploiement uniquement sur les versions taguées (sécurité)
- ✅ Vérifications automatiques avant déploiement (tests, lint, build)
- ✅ Traçabilité : chaque tag = une version déployée
- ✅ Rollback facile : revenir à un tag précédent

### Secrets GitHub requis
Pour que le déploiement fonctionne, les secrets suivants doivent être configurés dans GitHub :
- **Settings > Secrets and variables > Actions**

**Secrets à ajouter** :
- `VERCEL_TOKEN` : Token d'accès Vercel (**obligatoire**)
  - Obtenu via : https://vercel.com/account/tokens
- `VERCEL_ORG_ID` : ID de l'organisation Vercel (optionnel mais recommandé)
  - Trouvable dans les settings Vercel du projet
- `VERCEL_PROJECT_ID` : ID du projet Vercel (optionnel mais recommandé)
  - Trouvable dans les settings Vercel du projet

### Processus de release et tagging

#### Critères de release
Avant de créer une release, vérifier que :
- ✅ Tous les tests passent (`npm run test:ci`)
- ✅ Le lint est OK (`npm run lint`)
- ✅ Le build fonctionne (`npm run build`)
- ✅ La CI est verte sur `main`
- ✅ Toutes les PRs importantes sont mergées sur `main`
- ✅ Le code est à jour sur `main`

#### Commandes pour créer une release
```bash
# 1. S'assurer d'être sur main et à jour
git checkout main
git pull origin main

# 2. Créer et pousser le tag
git tag v1.0.0
git push origin v1.0.0
```

#### Convention de nommage des tags
Utiliser le format [Semantic Versioning](https://semver.org/) :
- `v1.0.0` : Version majeure (breaking changes)
- `v1.1.0` : Version mineure (nouvelles fonctionnalités)
- `v1.1.1` : Patch (corrections de bugs)

#### Exemple complet
```bash
# S'assurer d'être à jour
git checkout main
git pull origin main

# Créer le tag
git tag v0.1.0

# Pousser le tag (déclenche le déploiement automatique)
git push origin v0.1.0
```

Après le push du tag, le workflow GitHub Actions se déclenchera automatiquement et déploiera la version sur Vercel si tous les checks passent.

## Convention de commits

Ce projet utilise [Conventional Commits](https://www.conventionalcommits.org/) :

**Types de commits** :
- `feat:` : Nouvelle fonctionnalité
- `fix:` : Correction de bug
- `chore:` : Tâches de maintenance
- `ci:` : Changements dans la CI/CD
- `docs:` : Documentation
- `test:` : Tests
- `refactor:` : Refactoring

**Format** : `type(scope): description (#issue-number)`

**Exemples** :
- `feat(calc): add division by zero handling (#7)`
- `ci: add GitHub Actions workflow (#9)`
- `chore: update dependencies (#5)`
- `docs: add README with installation instructions (#12)`

## Workflow Git

- **Branch naming** : `type/description-#issue-number`
  - Exemples : `feat/calculator-ui-#5`, `ci/deploy-tags-#10`, `docs/readme-#12`
- **Pull Requests** : Obligatoires pour merger sur `main`
- **Protection de `main`** : Les push directs sont interdits, seules les PRs sont acceptées après review
- **Tags** : Utilisés uniquement pour les releases et déclenchent le déploiement automatique

## License

Ce projet est un projet éducatif.
