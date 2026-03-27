# Gestion de Chantier

Application SaaS de gestion de chantier de construction.

- **Backend** : Python 3.12 + FastAPI
- **Frontend** : React 18 + TypeScript + Vite
- **Conteneurisation** : Docker + Docker Compose

---

## Prérequis

### Pour lancer via Docker (recommandé)

| Outil | Version minimale |
|-------|-----------------|
| [Docker](https://docs.docker.com/get-docker/) | 24+ |
| [Docker Compose](https://docs.docker.com/compose/install/) | v2.20+ (inclus avec Docker Desktop) |

### Pour lancer en local (développement)

| Outil | Version minimale |
|-------|-----------------|
| [Python](https://www.python.org/downloads/) | 3.12+ |
| [Node.js](https://nodejs.org/) | 20+ |
| npm | 10+ (inclus avec Node.js) |

---

## Lancement via Docker

```bash
# Construire et démarrer tous les services
docker compose up --build

# En arrière-plan
docker compose up --build -d

# Arrêter
docker compose down
```

| Service  | URL                    |
|----------|------------------------|
| Frontend | http://localhost       |
| Backend  | http://localhost:8000  |
| API docs | http://localhost:8000/docs |

---

## Lancement en local (développement)

### Backend

```bash
cd backend

# Créer un environnement virtuel
python -m venv .venv
source .venv/bin/activate      # Linux/macOS
.venv\Scripts\activate         # Windows

# Installer les dépendances
pip install -r requirements-dev.txt

# Démarrer le serveur (rechargement automatique)
uvicorn app.main:app --reload
```

Le backend est disponible sur http://localhost:8000.
La documentation interactive (Swagger) est accessible sur http://localhost:8000/docs.

### Frontend

```bash
cd frontend

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

Le frontend est disponible sur http://localhost:5173.
Les appels `/api/*` sont automatiquement proxifiés vers le backend.

---

## Tests

### Backend (pytest)

```bash
cd backend
pytest -v
```

### Frontend (vitest)

```bash
cd frontend
npm test
```

---

## Structure du projet

```
vibe_demo/
├── .github/
│   └── workflows/
│       ├── backend.yml     # CI backend : tests + lint
│       └── frontend.yml    # CI frontend : tests + build
├── backend/
│   ├── app/
│   │   └── main.py         # Point d'entrée FastAPI
│   ├── tests/
│   │   └── test_main.py
│   ├── Dockerfile
│   ├── requirements.txt
│   └── requirements-dev.txt
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── App.test.tsx
│   │   └── main.tsx
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── docker-compose.yml
└── .gitignore
```

---

## CI/CD

Les workflows GitHub Actions se déclenchent automatiquement sur chaque push ou pull request vers `main` ou `develop` :

- **Backend** : exécute `pytest` puis vérifie le style avec `ruff`
- **Frontend** : exécute `vitest`, puis build et archive l'artefact de production
