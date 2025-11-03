# Calculatrice Web

Une calculatrice web développée avec React et Vite, intégrant une pipeline CI/CD complète pour le déploiement automatique sur Vercel.

## Membres du projet

| NOM | Prénom |
|-----|--------|
| DOE | John |

## GitHub Project

[Lien vers le GitHub Project](https://github.com/herm09/calculatrice/projects) - Suivi des tâches et organisation du projet

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
│   │   └── calc.js          # Fonctions pures de calcul
│   ├── Calculator.jsx        # Composant principal de la calculatrice
│   └── App.jsx               # Composant racine
├── .github/
│   └── workflows/
│       └── ci.yml            # Pipeline CI/CD GitHub Actions
└── vite.config.js           # Configuration Vite + Vitest
```

### Fonctionnalités
- **Calculatrice** : Addition, soustraction, multiplication, division
- **Gestion d'erreurs** : Validation des entrées et gestion de la division par zéro
- **Tests** : Couverture complète avec tests unitaires et tests de composants

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

### Tests
```bash
# Lancer les tests en mode watch
npm run test

# Lancer les tests une fois (pour CI)
npm run test:ci
```

### Build
```bash
# Construire pour la production
npm run build

# Prévisualiser le build de production
npm run preview
```

### Linting et formatage
```bash
# Vérifier le code
npm run lint

# Corriger automatiquement les erreurs
npm run lint:fix

# Formater le code
npm run format
```

## Déploiement sur Vercel

### Accès à la version déployée
[Lien vers la version déployée sur Vercel](https://calculatrice.vercel.app)

*Note : Le lien sera disponible après le premier déploiement réussi via un tag.*

## Pipeline CI/CD

### Configuration
La pipeline CI/CD est configurée via GitHub Actions dans `.github/workflows/ci.yml`.

### Jobs de la CI (Pull Requests)
Sur chaque Pull Request vers `main`, les jobs suivants s'exécutent :
1. **install** : Installation des dépendances avec `npm ci`
2. **lint** : Vérification du code avec ESLint
3. **test** : Exécution des tests unitaires et de composants
4. **build** : Build du projet pour vérifier qu'il compile sans erreur

### Déploiement CD (Tags uniquement)
Le déploiement sur Vercel se fait **uniquement** lors du push d'un tag versionné.

**Processus de déploiement** :
1. Lorsqu'un tag `v*.*.*` est poussé sur le dépôt
2. Les jobs `install`, `lint`, `test`, `build` s'exécutent d'abord
3. Si tous les jobs passent, le job `deploy` s'exécute :
   - Installation de Vercel CLI
   - `vercel pull` : Récupération de la configuration Vercel
   - `vercel build --prod` : Build avec Vercel
   - `vercel deploy --prebuilt --prod` : Déploiement en production

### Secrets GitHub requis
Pour que le déploiement fonctionne, les secrets suivants doivent être configurés dans GitHub (Settings > Secrets and variables > Actions) :
- `VERCEL_TOKEN` : Token d'accès Vercel (obligatoire)
- `VERCEL_ORG_ID` : ID de l'organisation Vercel (optionnel mais recommandé)
- `VERCEL_PROJECT_ID` : ID du projet Vercel (optionnel mais recommandé)

## Processus de release

### Critères de release
Avant de créer une release, vérifier que :
- ✅ Tous les tests passent (`npm run test:ci`)
- ✅ Le lint est OK (`npm run lint`)
- ✅ Le build fonctionne (`npm run build`)
- ✅ La CI est verte sur `main`
- ✅ Toutes les PRs importantes sont mergées sur `main`
- ✅ Le code est à jour sur `main`

### Commandes pour créer une release

1. **S'assurer d'être sur `main` et à jour** :
```bash
git checkout main
git pull origin main
```

2. **Créer et pousser le tag** :
```bash
# Créer un tag (format: vX.Y.Z)
git tag v1.0.0

# Pousser le tag vers le dépôt distant
git push origin v1.0.0
```

3. **Le déploiement se déclenche automatiquement** :
   - Le workflow GitHub Actions détecte le tag
   - Les jobs CI s'exécutent
   - Si tout passe, le déploiement sur Vercel se lance automatiquement
   - Vérifier le déploiement dans l'onglet "Actions" de GitHub

### Convention de nommage des tags
Utiliser le format [Semantic Versioning](https://semver.org/) :
- `v1.0.0` : Version majeure (breaking changes)
- `v1.1.0` : Version mineure (nouvelles fonctionnalités)
- `v1.1.1` : Patch (corrections de bugs)

### Exemple complet
```bash
# S'assurer d'être à jour
git checkout main
git pull origin main

# Créer le tag
git tag v0.1.0

# Pousser le tag (déclenche le déploiement)
git push origin v0.1.0
```

Après le push du tag, le workflow GitHub Actions se déclenchera automatiquement et déploiera la version sur Vercel si tous les checks passent.

## Convention de commits

Ce projet utilise [Conventional Commits](https://www.conventionalcommits.org/) :
- `feat:` : Nouvelle fonctionnalité
- `fix:` : Correction de bug
- `chore:` : Tâches de maintenance
- `ci:` : Changements dans la CI/CD
- `docs:` : Documentation
- `test:` : Tests
- `refactor:` : Refactoring

Format : `type(scope): description (#issue-number)`

Exemples :
- `feat(calc): add division by zero handling (#7)`
- `ci: add GitHub Actions workflow (#9)`
- `chore: update dependencies (#5)`

## Workflow Git

- **Branch naming** : `type/description-#issue-number`
  - Exemples : `feat/calculator-ui-#5`, `ci/deploy-tags-#10`
- **Pull Requests** : Obligatoires pour merger sur `main`
- **Protection de `main`** : Les push directs sont interdits, seules les PRs sont acceptées après review
