const FW_DOCKER_DATA = {
  meta: {
    id: 'docker', name: 'Docker', icon: '🐳', color: '#2496ED', color2: '#0DB7ED',
    tagline: 'Konteneryzacja aplikacji — działa wszędzie tak samo',
    year: 2013, author: 'Solomon Hykes / Docker Inc.', lang: 'Go',
    github: 'moby/moby', stars: '69k+', codeLang: 'dockerfile'
  },

  tabs: [
    { id: 'podstawy',   label: 'Podstawy' },
    { id: 'komponenty', label: 'Dockerfile' },
    { id: 'hooki',      label: 'Compose' },
    { id: 'routing',    label: 'Sieć i wolumeny' },
    { id: 'state',      label: 'Produkcja' },
    { id: 'rywale',     label: 'Rywale' },
    { id: 'pluginy',    label: 'Ekosystem' },
    { id: 'komendy',    label: 'Komendy' },
  ],

  content: {
    podstawy: {
      labels: {
        concepts: 'Kluczowe koncepcje',
        whenToUse: 'Kiedy używać Docker?',
        firstComponent: 'Pierwszy kontener',
        firstComponentLang: 'bash'
      },
      intro: {
        title: 'Czym jest Docker?',
        desc: 'Docker to platforma do konteneryzacji — pakuje aplikację wraz z jej zależnościami w izolowane kontenery. Kontener działa identycznie na laptopie dewelopera, CI/CD i serwerze produkcyjnym. "Działa u mnie" przestaje być problemem. Standard w nowoczesnym DevOps.',
      },
      concepts: [
        {
          title: 'Image vs Kontener',
          desc: 'Image to szablon (przepis) — niezmienny. Kontener to uruchomiony instance image — można ich mieć wiele z jednego image. Jak klasa vs obiekt w OOP.',
          icon: '📦'
        },
        {
          title: 'Dockerfile',
          desc: 'Plik z instrukcjami budowania image. FROM = bazowy image, RUN = komendy podczas budowania, COPY = kopiowanie plików, CMD = domyślna komenda przy uruchomieniu.',
          icon: '📋'
        },
        {
          title: 'Docker Hub / Registry',
          desc: 'Publiczne repozytorium images. hub.docker.com — miliony gotowych images. python:3.12-slim, nginx:alpine, postgres:16 — bierzesz gotowy image i budujesz na nim.',
          icon: '🗄️'
        },
        {
          title: 'Docker Compose',
          desc: 'Uruchamia wiele kontenerów razem — np. FastAPI + PostgreSQL + Redis jedną komendą. Definiujesz w docker-compose.yml: serwisy, sieci, wolumeny. Standard dla local dev.',
          icon: '🎼'
        }
      ],
      whenToUse: [
        'Izolacja środowiska — każdy projekt ma własne zależności, bez konfliktów',
        'Onboarding — nowy developer robi docker compose up i ma całe środowisko',
        'CI/CD — testy i deploy w identycznym środowisku co produkcja',
        'Mikrousługi — każdy serwis w osobnym kontenerze',
        'Lokalny development z bazą danych — postgres/redis w kontenerze zamiast instalacji',
        'Deploy na dowolny serwer który ma Docker — bez konfigurowania systemu'
      ],
      firstComponent: `# Pobierz i uruchom gotowy kontener
docker run hello-world

# Uruchom Pythona interaktywnie
docker run -it python:3.12-slim bash

# Uruchom PostgreSQL lokalnie (bez instalacji)
docker run -d \
  --name postgres \
  -e POSTGRES_PASSWORD=secret \
  -p 5432:5432 \
  postgres:16-alpine

# Sprawdź działające kontenery
docker ps

# Zatrzymaj kontener
docker stop postgres`
    },

    komponenty: [
      {
        title: 'Dockerfile — podstawowa struktura',
        desc: 'Każda instrukcja tworzy nową warstwę. Kolejność ma znaczenie — zmieniające się warstwy na końcu (cache). Zawsze używaj konkretnych tagów wersji.',
        code: `FROM python:3.12-slim

# Metadane (opcjonalne)
LABEL maintainer="lukasz@example.com"

# Zmienne środowiskowe
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Folder roboczy w kontenerze
WORKDIR /app

# Kopiuj requirements i instaluj zależności
# (osobna warstwa — cache gdy requirements nie zmienią się)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Kopiuj kod aplikacji
COPY . .

# Port który kontener nasłuchuje (dokumentacja)
EXPOSE 8000

# Komenda przy uruchomieniu kontenera
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`
      },
      {
        title: 'Multi-stage build — mały image produkcyjny',
        desc: 'Multi-stage build używa wielu FROM. Pierwsza faza buduje (z narzędziami). Druga faza kopiuje tylko gotowy wynik — bez narzędzi dev. Mniejszy, bezpieczniejszy image.',
        code: `# Faza 1: builder — z narzędziami do budowania
FROM python:3.12 AS builder

WORKDIR /app
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Faza 2: runtime — tylko to co potrzebne
FROM python:3.12-slim

WORKDIR /app

# Skopiuj tylko zainstalowane paczki z buildera
COPY --from=builder /root/.local /root/.local
COPY . .

# Uruchom jako non-root user (bezpieczeństwo)
RUN adduser --disabled-password --no-create-home appuser
USER appuser

ENV PATH=/root/.local/bin:$PATH
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`
      },
      {
        title: 'Optymalizacja Dockerfile — cache i rozmiar',
        desc: 'Docker cache działa layer po layer — jeśli warstwa się nie zmieniła, używa cache. Strategie: kolejność warstw, .dockerignore, slim images, --no-cache-dir.',
        code: `# .dockerignore — nie kopiuj zbędnych plików
# (analogia do .gitignore)
# Zawartość .dockerignore:
# .git
# .venv
# __pycache__
# *.pyc
# .env
# tests/
# *.md

# Złe — requirements zmienią cache całego kodu
COPY . .
RUN pip install -r requirements.txt

# Dobre — requirements osobna warstwa (cache)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .   # zmiana kodu nie unieważnia warstwy pip

# Zmniejsz rozmiar — usuń cache w tej samej warstwie
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*`
      },
      {
        title: 'Budowanie i tagowanie image',
        desc: 'docker build czyta Dockerfile i tworzy image. Tag to etykieta — nazwa:wersja. Dobre tagowanie ułatwia zarządzanie wersjami.',
        code: `# Buduj image z tagiem
docker build -t moja-apka:1.0.0 .
docker build -t moja-apka:latest .

# Buduj z konkretnego Dockerfile
docker build -f Dockerfile.prod -t moja-apka:prod .

# Build args — zmienne podczas budowania
docker build --build-arg ENV=production -t moja-apka .

# Sprawdź rozmiar i warstwy
docker images moja-apka
docker history moja-apka:latest

# Usuń image
docker rmi moja-apka:1.0.0
docker image prune  # usuń nieużywane images`
      },
    ],

    hooki: [
      {
        title: 'docker-compose.yml — podstawowa struktura',
        desc: 'Compose definiuje wiele serwisów w jednym pliku YAML. Wersja 3+ jest standardem. Każdy serwis to kontener z konfiguracją.',
        code: `# docker-compose.yml
version: "3.9"

services:
  api:
    build: .                          # buduj z Dockerfile w bieżącym folderze
    ports:
      - "8000:8000"                   # host:kontener
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    volumes:
      - .:/app                        # hot reload w dev

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:`
      },
      {
        title: 'Compose — dev vs produkcja',
        desc: 'Używaj wielu plików Compose — bazowy + override dla dev/prod. docker-compose.override.yml ładuje się automatycznie w dev.',
        code: `# docker-compose.yml — bazowy (produkcja)
services:
  api:
    image: registry.example.com/moja-apka:latest
    restart: always
    environment:
      - DEBUG=false

# docker-compose.override.yml — dev (auto-load)
services:
  api:
    build: .              # buduj lokalnie zamiast pobierać image
    volumes:
      - .:/app            # live reload
    environment:
      - DEBUG=true
    command: uvicorn main:app --reload --host 0.0.0.0

# Użycie:
# Dev (auto-merge override):
docker compose up

# Produkcja (tylko bazowy):
docker compose -f docker-compose.yml up`
      },
      {
        title: 'Compose — przydatne komendy',
        desc: 'Compose zarządza całym stackiem jedną komendą. up, down, logs, exec — codzienne operacje.',
        code: `# Uruchom wszystkie serwisy (w tle)
docker compose up -d

# Uruchom z rebuild (gdy zmieniłeś Dockerfile)
docker compose up -d --build

# Zatrzymaj wszystko
docker compose down

# Zatrzymaj i usuń wolumeny (reset bazy danych!)
docker compose down -v

# Logi wszystkich serwisów
docker compose logs -f

# Logi konkretnego serwisu
docker compose logs -f api

# Wejdź do kontenera
docker compose exec api bash
docker compose exec db psql -U user mydb

# Uruchom jednorazową komendę
docker compose run --rm api python manage.py migrate

# Restart konkretnego serwisu
docker compose restart api`
      },
      {
        title: 'Health checks — monitoring serwisów',
        desc: 'Healthcheck mówi Docker kiedy serwis jest gotowy. depends_on z condition: service_healthy czeka na zdrowy serwis.',
        code: `services:
  db:
    image: postgres:16-alpine
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d mydb"]
      interval: 5s
      timeout: 5s
      retries: 5
      start_period: 10s

  api:
    build: .
    depends_on:
      db:
        condition: service_healthy   # czekaj aż DB zdrowe
      redis:
        condition: service_started   # wystarczy że uruchomiony

  redis:
    image: redis:7-alpine
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 3`
      },
    ]

  }
};
