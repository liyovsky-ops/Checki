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
    ],

    routing: [
      {
        title: 'Sieci Docker — komunikacja między kontenerami',
        desc: 'Kontenery w tej samej sieci mogą się pingować po nazwie serwisu. Compose automatycznie tworzy sieć dla wszystkich serwisów.',
        code: `# docker-compose.yml — explicit networking
services:
  api:
    networks:
      - backend
      - frontend

  db:
    networks:
      - backend          # tylko backend — nie dostępne z frontendu

  nginx:
    networks:
      - frontend
      - public

networks:
  backend:
    driver: bridge
  frontend:
    driver: bridge
  public:
    driver: bridge

# W kodzie Pythona — używaj nazwy serwisu jako hostname:
# DATABASE_URL = "postgresql://user:pass@db:5432/mydb"
#                                              ^^ nazwa serwisu w Compose`
      },
      {
        title: 'Wolumeny — trwałe dane',
        desc: 'Dane w kontenerze giną gdy kontener jest usuwany. Wolumeny i bind mounts przechowują dane na hoście. Named volumes dla baz danych, bind mounts dla kodu w dev.',
        code: `services:
  db:
    image: postgres:16-alpine
    volumes:
      # Named volume — Docker zarządza lokalizacją
      - postgres_data:/var/lib/postgresql/data

  api:
    build: .
    volumes:
      # Bind mount — folder hosta mapowany do kontenera
      - .:/app                     # live reload kodu
      - ./logs:/app/logs           # logi na hoście

      # Anonymous volume — nie nadpisuj node_modules z hosta
      - /app/node_modules

volumes:
  postgres_data:     # zadeklaruj named volume

# Zarządzanie wolumenami:
# docker volume ls
# docker volume inspect postgres_data
# docker volume rm postgres_data  (usuwa dane!)`
      },
      {
        title: 'Zmienne środowiskowe i sekrety',
        desc: 'Nigdy nie hardcode sekretów w Dockerfile lub docker-compose.yml. Używaj .env pliku lub Docker Secrets.',
        code: `# .env (nie commituj do git!)
POSTGRES_PASSWORD=supersecret
SECRET_KEY=moj-klucz-jwt
API_KEY=abc123

# docker-compose.yml — czyta z .env automatycznie
services:
  api:
    environment:
      - SECRET_KEY=\${SECRET_KEY}
      - DATABASE_URL=postgresql://user:\${POSTGRES_PASSWORD}@db/mydb

  # Lub z pliku env:
  db:
    env_file:
      - .env

# W Pythonie:
import os
secret = os.environ["SECRET_KEY"]  # pobierz z env

# Docker Secrets (Swarm/Kubernetes) — produkcja
docker secret create db_password ./password.txt`
      },
    ],

    state: [
      {
        title: 'Budowanie i push do registry',
        desc: 'Registry to repozytorium images — Docker Hub, GitHub Container Registry, AWS ECR, własny. Typowy CI/CD: build → tag → push → deploy.',
        code: `# Zaloguj się do Docker Hub
docker login

# Tag image do Docker Hub
docker tag moja-apka:latest username/moja-apka:latest
docker tag moja-apka:latest username/moja-apka:1.0.0

# Push
docker push username/moja-apka:latest
docker push username/moja-apka:1.0.0

# GitHub Container Registry (ghcr.io)
docker tag moja-apka ghcr.io/username/moja-apka:latest
docker push ghcr.io/username/moja-apka:latest

# Pull na serwerze
docker pull username/moja-apka:latest
docker run -d -p 8000:8000 username/moja-apka:latest`
      },
      {
        title: 'Docker w CI/CD — GitHub Actions',
        desc: 'Typowy pipeline: build image → run tests w kontenerze → push do registry → deploy. Docker gwarantuje że testy i produkcja są identyczne.',
        code: `# .github/workflows/deploy.yml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: \${{ secrets.DOCKERHUB_USERNAME }}
          password: \${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          push: true
          tags: username/app:latest,username/app:\${{ github.sha }}

      - name: Run tests
        run: |
          docker compose -f docker-compose.test.yml up --exit-code-from tests`
      },
      {
        title: 'Bezpieczeństwo kontenerów',
        desc: 'Domyślnie kontenery działają jako root — to ryzyko. Dobre praktyki: non-root user, read-only filesystem, minimal base image, skanowanie.',
        code: `FROM python:3.12-slim

# Utwórz non-root user
RUN groupadd -r appgroup && \
    useradd -r -g appgroup -d /app -s /sbin/nologin appuser

WORKDIR /app

COPY --chown=appuser:appgroup requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY --chown=appuser:appgroup . .

# Przełącz na non-root user
USER appuser

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

# docker-compose.yml — dodatkowe zabezpieczenia:
# security_opt:
#   - no-new-privileges:true
# read_only: true   # read-only filesystem
# tmpfs:
#   - /tmp`
      },
      {
        title: 'Debugowanie kontenerów',
        desc: 'Kontenery działają inaczej niż lokalne środowisko. Podstawowe narzędzia do diagnostyki — logi, exec, inspect.',
        code: `# Wejdź do działającego kontenera
docker exec -it nazwa_kontenera bash
docker exec -it nazwa_kontenera sh  # gdy bash nie ma (alpine)

# Logi
docker logs nazwa_kontenera
docker logs -f nazwa_kontenera       # follow (tail -f)
docker logs --tail 50 nazwa_kontenera

# Informacje o kontenerze
docker inspect nazwa_kontenera
docker stats                         # CPU/RAM na żywo

# Kopiuj plik z/do kontenera
docker cp kontener:/app/logs/error.log .
docker cp local_plik.py kontener:/app/

# Uruchom tymczasowy kontener do debugowania
docker run --rm -it --network kontener_network \
  python:3.12-slim bash

# Sprawdź co jest w image
docker run --rm -it moja-apka:latest ls -la /app`
      },
    ],

    rywale: [
      {
        name: 'Podman',
        icon: '🦭',
        color: '#892CA0',
        tagline: 'Daemonless Docker — rootless kontenery',
        pros: ['Bez daemona — bezpieczniejszy', 'Rootless — kontenery bez root', 'Docker-compatible API', 'Wbudowany w RHEL/Fedora', 'Lepsza integracja z systemd'],
        cons: ['Mniejsza społeczność', 'Compose mniej dopracowany (podman-compose)', 'Mniej materiałów', 'Docker Desktop wygodniejszy na Windows/Mac'],
        vsReact: 'Podman jest bezpieczniejszy (rootless, no daemon) ale Docker ma większy ekosystem i lepsze tooling. Podman lepszy na produkcji RHEL. Docker lepszy do nauki i dev.',
        bestFor: 'RHEL/Fedora środowiska, bezpieczeństwo produkcji, rootless deployment'
      },
      {
        name: 'containerd',
        icon: '📦',
        color: '#575757',
        tagline: 'Niskopoziomowy runtime — używany pod spodem',
        pros: ['Używany przez Kubernetes natively', 'Lekki, szybki', 'CNCF graduated project', 'Standard runtime w K8s'],
        cons: ['Brak user-friendly CLI', 'Trudniejszy w bezpośrednim użyciu', 'Brak Compose', 'Nie dla zwykłych developerów'],
        vsReact: 'containerd to runtime pod Dockerem i Kubernetes. Nie używasz go bezpośrednio — Docker i K8s go używają pod spodem. Wiedza przydatna przy K8s.',
        bestFor: 'Kubernetes internals, nisko-poziomowy runtime'
      },
      {
        name: 'Kubernetes (K8s)',
        icon: '⛵',
        color: '#326CE5',
        tagline: 'Orkiestracja kontenerów — produkcja na skalę',
        pros: ['Auto-scaling', 'Self-healing (restart przy crash)', 'Rolling deployments zero-downtime', 'Service discovery', 'Standard enterprise'],
        cons: ['Ogromna złożoność', 'Duże koszty operacyjne', 'Overkill dla małych projektów', 'Stroma krzywa uczenia'],
        vsReact: 'Docker = jeden serwer. Kubernetes = wiele serwerów, auto-scaling, self-healing. Zacznij od Docker Compose, przejdź na K8s gdy Docker Compose przestanie wystarczać.',
        bestFor: 'Duże aplikacje, wiele serwisów, skalowanie, enterprise produkcja'
      },
      {
        name: 'LXC / LXD',
        icon: '🖥️',
        color: '#E95420',
        tagline: 'Kontenery systemu — pełny OS w kontenerze',
        pros: ['Pełny system Linux w kontenerze', 'Mniejszy overhead niż VM', 'Dobra izolacja', 'Dobry dla stateful aplikacji'],
        cons: ['Cięższy niż Docker', 'Inny model niż mikrousługi', 'Mniej ekosystemu', 'Trudniejszy onboarding'],
        vsReact: 'LXC/LXD dla pełnych systemów (jak VM ale lżejszy). Docker dla aplikacji i mikrousług. Różne use-case.',
        bestFor: 'Pełne środowiska systemowe, hosting VPS-like, izolacja na poziomie OS'
      },
    ],

    pluginy: [
      {
        name: 'Docker Compose',
        icon: '🎼',
        color: '#2496ED',
        tagline: 'Multi-container — wbudowany w Docker CLI',
        install: 'docker compose (wbudowany od Docker Desktop 3.0+)',
        use: 'Zarządza wieloma kontenerami jako jeden stack. Jeden plik YAML, jedna komenda — całe środowisko gotowe. Niezbędny w każdym projekcie z więcej niż jednym serwisem.',
        example: `docker compose up -d        # uruchom stack w tle
docker compose down         # zatrzymaj i usuń
docker compose logs -f api  # logi serwisu
docker compose exec api bash  # wejdź do kontenera`
      },
      {
        name: 'Docker Scout',
        icon: '🔍',
        color: '#086DD7',
        tagline: 'Skanowanie podatności w images',
        install: 'docker scout (wbudowany w Docker Desktop)',
        use: 'Skanuje image pod kątem znanych CVE (podatności). Pokazuje które paczki mają problemy bezpieczeństwa i jak je naprawić. Integracja z CI/CD.',
        example: `docker scout cves moja-apka:latest
docker scout recommendations moja-apka:latest
# Output: lista CVE z krytycznością i rekomendacjami`
      },
      {
        name: 'Dive',
        icon: '🏊',
        color: '#34D058',
        tagline: 'Eksploruj warstwy image — znajdź co zajmuje miejsce',
        install: 'winget install wagoodman.dive  /  brew install dive',
        use: 'TUI do eksploracji warstw Docker image. Pokazuje co każda instrukcja Dockerfile dodaje do rozmiaru. Niezbędny do optymalizacji rozmiaru images.',
        example: `dive moja-apka:latest
# Interaktywny widok:
# Lewo: warstwy z rozmiarem
# Prawo: pliki dodane w tej warstwie
# Tab: przełącz panel
# Space: pokaż zmienione pliki`
      },
      {
        name: 'Trivy',
        icon: '🛡️',
        color: '#1904DA',
        tagline: 'Kompleksowe skanowanie bezpieczeństwa',
        install: 'winget install AquaSecurity.Trivy  /  brew install trivy',
        use: 'Skanuje images, Dockerfile, docker-compose.yml, kod pod kątem CVE, misconfig, sekretów. Darmowy i open-source. Standard w CI/CD pipeline.',
        example: `trivy image moja-apka:latest
trivy fs .                   # skanuj pliki projektu
trivy config .               # skanuj Dockerfile/Compose
# Output: tabela z CVE, severity (CRITICAL/HIGH/MEDIUM)`
      },
      {
        name: 'Portainer',
        icon: '🖥️',
        color: '#13BEF9',
        tagline: 'GUI do zarządzania Dockerem',
        install: 'docker run -d -p 9000:9000 portainer/portainer-ce',
        use: 'Web UI do zarządzania kontenerami, images, wolumenami, sieciami. Alternatywa dla CLI gdy wolisz klikać. Dobre dla zespołów bez doświadczenia z Docker CLI.',
        example: `docker run -d \
  -p 9000:9000 \
  --name portainer \
  -v /var/run/docker.sock:/var/run/docker.sock \
  portainer/portainer-ce:latest
# Otwórz: http://localhost:9000`
      },
      {
        name: 'Watchtower',
        icon: '🔭',
        color: '#1ABC9C',
        tagline: 'Auto-update kontenerów gdy pojawi się nowy image',
        install: 'docker run containrrr/watchtower (jako kontener)',
        use: 'Monitoruje registry i automatycznie aktualizuje kontenery gdy pojawi się nowy image. Przydatne dla prostych deploymentów bez K8s.',
        example: `docker run -d \
  --name watchtower \
  -v /var/run/docker.sock:/var/run/docker.sock \
  containrrr/watchtower \
  --interval 3600  # sprawdzaj co godzinę`
      },
    ],

    komendy: [
      {
        category: 'Kontenery',
        icon: '📦',
        items: [
          { cmd: 'docker run -d -p 8000:8000 --name api moja-apka', desc: 'Uruchom kontener w tle',
            detail: { what: '-d = detached (w tle), -p = port mapping host:kontener, --name = nazwa kontenera.', how: 'docker run [opcje] [image] [komenda]', flags: [{flag: '-d', desc: 'Detached — w tle'}, {flag: '-p 8000:8000', desc: 'Port: host:kontener'}, {flag: '-e KEY=VAL', desc: 'Zmienna środowiskowa'}, {flag: '-v ./data:/app/data', desc: 'Mount wolumenu'}, {flag: '--rm', desc: 'Usuń kontener po zatrzymaniu'}, {flag: '-it', desc: 'Interaktywny terminal'}], tips: ['docker run --rm -it python:3.12-slim bash — tymczasowy kontener', '-p 5432:5432 dla PostgreSQL, -p 6379:6379 dla Redis'] }
          },
          { cmd: 'docker ps', desc: 'Lista działających kontenerów',
            detail: { what: 'Pokazuje: ID, image, komendę, czas uruchomienia, status, porty, nazwę.', how: 'docker ps -a — wszystkie (łącznie z zatrzymanymi). docker ps -q — tylko ID.', tips: ['docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"', 'docker stats — CPU/RAM na żywo'] }
          },
          { cmd: 'docker exec -it kontener bash', desc: 'Wejdź do działającego kontenera',
            detail: { what: 'Uruchamia bash wewnątrz kontenera. -it = interaktywny terminal.', how: 'Jeśli bash nie istnieje (alpine): docker exec -it kontener sh', tips: ['docker exec kontener python script.py — uruchom bez wchodzenia', 'docker exec -it db psql -U user dbname — bezpośrednio do bazy'] }
          },
          { cmd: 'docker logs -f kontener', desc: 'Śledź logi kontenera',
            detail: { what: '-f = follow (jak tail -f). Pokazuje stdout/stderr kontenera.', how: 'docker logs kontener — wszystkie logi. --tail 100 — ostatnie 100 linii.', tips: ['docker compose logs -f api — logi serwisu Compose', '--since 1h — logi z ostatniej godziny'] }
          },
          { cmd: 'docker stop kontener && docker rm kontener', desc: 'Zatrzymaj i usuń kontener',
            detail: { what: 'stop wysyła SIGTERM (graceful). rm usuwa kontener (nie image).', how: 'docker kill kontener — natychmiastowe SIGKILL. docker rm -f — force (stop+rm).', tips: ['docker container prune — usuń wszystkie zatrzymane kontenery', 'docker run --rm — automatycznie usuwa po zatrzymaniu'] }
          },
          { cmd: 'docker stats', desc: 'Zużycie CPU/RAM kontenerów na żywo',
            detail: { what: 'Tabela na żywo: CPU %, pamięć, sieć, I/O dla każdego działającego kontenera.', how: 'Ctrl+C aby zatrzymać. docker stats kontener — tylko jeden kontener.', tips: ['docker stats --no-stream — jednorazowy snapshot (nie live)', 'docker stats --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"', 'Przydatne do wykrycia wycieków pamięci i bottle-necków CPU'] }
          },
          { cmd: 'docker inspect kontener', desc: 'Pełne metadane kontenera JSON',
            detail: { what: 'Zwraca JSON z wszystkimi szczegółami: sieci, mounty, zmienne środowiskowe, konfiguracja, status.', how: 'docker inspect --format "{{.NetworkSettings.IPAddress}}" kontener — konkretne pole.', tips: ['docker inspect image — metadane image', 'docker inspect --format "{{json .HostConfig.Binds}}" — mounty', 'Przydatne do debugowania problemów sieciowych i konfiguracji'] }
          },
          { cmd: 'docker cp kontener:/app/log.txt ./log.txt', desc: 'Kopiuj plik z/do kontenera',
            detail: { what: 'Kopiuje pliki między kontenerem a hostem. Działa też na zatrzymanym kontenerze.', how: 'docker cp ./config.json kontener:/app/config.json — kopiuj do kontenera.', tips: ['Przydatne do wyciągnięcia logów z kontenera bez Volume', 'docker cp działa też gdy kontener jest zatrzymany'] }
          },
        ]
      },
      {
        category: 'Images',
        icon: '🖼️',
        items: [
          { cmd: 'docker build -t moja-apka:latest .', desc: 'Zbuduj image z Dockerfile',
            detail: { what: '-t = tag (nazwa:wersja). . = kontekst budowania (bieżący folder).', how: 'Docker czyta Dockerfile, wykonuje instrukcje, tworzy warstwy.', flags: [{flag: '-t nazwa:tag', desc: 'Nazwa i tag image'}, {flag: '-f Dockerfile.prod', desc: 'Konkretny plik Dockerfile'}, {flag: '--no-cache', desc: 'Pomiń cache (rebuild od zera)'}, {flag: '--build-arg KEY=VAL', desc: 'Argument podczas budowania'}], tips: ['docker build --no-cache gdy chcesz fresh build', 'docker build --platform linux/amd64 — cross-platform build'] }
          },
          { cmd: 'docker pull python:3.12-slim', desc: 'Pobierz image z registry',
            detail: { what: 'Pobiera image z Docker Hub (domyślnie). Użyj konkretnych tagów — nie latest w produkcji.', how: 'Format: [registry/]nazwa[:tag]. Bez tagu = :latest', tips: ['Zawsze pin wersję: python:3.12.3-slim nie python:latest', 'docker pull --platform linux/amd64 na Apple Silicon'] }
          },
          { cmd: 'docker images', desc: 'Lista lokalnych images',
            detail: { what: 'Pokazuje: repository, tag, ID, datę, rozmiar.', how: 'docker images moja-apka — filtruj po nazwie.', tips: ['docker image prune — usuń dangling images (bez tagu)', 'docker image prune -a — usuń wszystkie nieużywane images'] }
          },
          { cmd: 'docker rmi moja-apka:latest', desc: 'Usuń lokalny image',
            detail: { what: 'Usuwa image z lokalnego cache. Nie można usunąć jeśli jest używany przez kontener.', how: 'docker rmi $(docker images -q) — usuń wszystkie (uwaga!). Zatrzymaj kontenery najpierw.', tips: ['docker rm kontener przed docker rmi image — najpierw usuń kontener', 'docker image prune -a — czyściej niż rmi na wszystko'] }
          },
          { cmd: 'docker tag moja-apka:latest myrepo/moja-apka:v1.0', desc: 'Oznacz image do wysłania',
            detail: { what: 'Tworzy alias (tag) dla image. Wymagane przed docker push — tag musi zawierać nazwę registry.', how: 'Format: [registry/]nazwa:tag. Docker Hub: username/repo:tag. GHCR: ghcr.io/user/repo:tag.', tips: ['Zawsze taguj wersją: v1.0.0, nie tylko latest', 'docker tag src:latest dest:latest = skopiuj/przemianuj'] }
          },
          { cmd: 'docker push myrepo/moja-apka:v1.0', desc: 'Wyślij image do registry',
            detail: { what: 'Pushuje image do Docker Hub, GHCR, ECR lub innego registry. Wymaga docker login.', how: 'docker login — zaloguj się najpierw. docker logout po skończeniu.', tips: ['docker login ghcr.io -u USERNAME -p TOKEN — GitHub Container Registry', 'Automatyzuj w CI/CD: docker login + tag + push w pipeline', 'Użyj --platform linux/amd64 gdy budujesz na Apple Silicon'] }
          },
        ]
      },
      {
        category: 'Docker Compose',
        icon: '🎼',
        items: [
          { cmd: 'docker compose up -d --build', desc: 'Uruchom stack i rebuild images',
            detail: { what: 'up = uruchom serwisy, -d = w tle, --build = przebuduj images przed uruchomieniem.', how: 'Czyta docker-compose.yml w bieżącym folderze.', tips: ['Bez --build używa cache — dodaj gdy zmieniłeś Dockerfile', 'docker compose up api — uruchom tylko jeden serwis'] }
          },
          { cmd: 'docker compose down -v', desc: 'Zatrzymaj stack i usuń wolumeny',
            detail: { what: 'down = zatrzymaj i usuń kontenery i sieci. -v = usuń też named volumes (dane!).', how: 'Bez -v: wolumeny zostają (dane zachowane). Z -v: wszystko znika.', tips: ['Bez -v przy normalnym dev — zostaw dane bazy', '-v gdy chcesz reset do zera'] }
          },
          { cmd: 'docker compose exec api bash', desc: 'Wejdź do kontenera serwisu',
            detail: { what: 'exec w konkretnym serwisie Compose. Jak docker exec ale używa nazwy serwisu.', how: 'docker compose exec db psql -U user dbname — bezpośrednio do bazy', tips: ['docker compose run --rm api python shell — jednorazowa komenda', 'docker compose run --rm api pytest — uruchom testy'] }
          },
          { cmd: 'docker compose logs -f api', desc: 'Śledź logi konkretnego serwisu',
            detail: { what: '-f = follow (live). api = nazwa serwisu z docker-compose.yml. Bez nazwy = logi wszystkich serwisów.', how: 'docker compose logs --tail=100 api — ostatnie 100 linii.', tips: ['docker compose logs -f api db — logi dwóch serwisów naraz', '--since 5m — logi z ostatnich 5 minut'] }
          },
          { cmd: 'docker compose ps', desc: 'Status serwisów Compose',
            detail: { what: 'Pokazuje stan wszystkich serwisów ze stacku: running, exited, health status.', how: 'docker compose ps --services — tylko nazwy serwisów. docker compose ps -a — też zatrzymane.', tips: ['Sprawdź health: (healthy) vs (unhealthy) — zdefiniowany w healthcheck:', 'docker compose top — procesy wewnątrz kontenerów'] }
          },
          { cmd: 'docker compose restart api', desc: 'Zrestartuj serwis bez rebuildu',
            detail: { what: 'Restartuje serwis (stop + start) bez przebudowania image. Szybkie — przydatne gdy chcesz aplikować env vars.', how: 'docker compose up -d --build api — restart z rebuildem.', tips: ['Nie aplikan nowych zmian w kodzie — do tego potrzeba --build', 'docker compose restart = soft restart, --build = pełny rebuild'] }
          },
        ]
      },
      {
        category: 'Czyszczenie',
        icon: '🧹',
        items: [
          { cmd: 'docker system prune -af', desc: 'Usuń wszystko nieużywane (OSTROŻNIE)',
            detail: { what: 'Usuwa: zatrzymane kontenery, wszystkie nieużywane images, sieci, build cache. -a = wszystkie (nie tylko dangling). -f = bez pytania.', how: 'Może zwolnić kilka-kilkanaście GB.', tips: ['docker system prune — bez -a = tylko dangling images', 'docker system df — sprawdź ile zajmuje Docker'] }
          },
          { cmd: 'docker volume prune', desc: 'Usuń nieużywane wolumeny',
            detail: { what: 'Usuwa wolumeny które nie są zamontowane przez żaden kontener.', how: 'OSTROŻNIE — wolumeny mogą zawierać dane bazy!', tips: ['docker volume ls — lista wolumenów', 'Sprawdź docker ps -a przed usunięciem'] }
          },
          { cmd: 'docker system df', desc: 'Sprawdź ile miejsca zajmuje Docker',
            detail: { what: 'Podsumowanie: images, kontenery, wolumeny, build cache z rozmiarami i ile można zwolnić.', how: 'docker system df -v — szczegóły każdego elementu.', tips: ['Uruchom przed docker system prune żeby wiedzieć co zyskasz', 'Images najczęściej największe — docker image prune -a zwalnia najwięcej'] }
          },
        ]
      },
      {
        category: 'Sieć i wolumeny',
        icon: '🔌',
        items: [
          { cmd: 'docker network ls', desc: 'Lista sieci Docker',
            detail: { what: 'Pokazuje wszystkie sieci: bridge (domyślna), host, none, i custom. Compose tworzy automatycznie sieć per stack.', how: 'docker network inspect nazwa — szczegóły sieci (podłączone kontenery, IP).', tips: ['Kontenery w tej samej sieci mogą się komunikować przez nazwę (nie IP)', 'docker compose tworzy sieć <projekt>_default — kontenery widzą się nawzajem'] }
          },
          { cmd: 'docker network create moja-siec', desc: 'Utwórz własną sieć',
            detail: { what: 'Izolowana sieć bridge dla kontenerów. Kontenery w tej samej sieci komunikują się nazwą kontenera.', how: 'docker run --network moja-siec ... — dołącz kontener do sieci.', flags: [{flag: '--driver bridge', desc: 'Most (domyślny) — izolowana sieć'}, {flag: '--driver host', desc: 'Sieć hosta — brak izolacji'}, {flag: '--subnet 172.20.0.0/16', desc: 'Własna podsieć'}], tips: ['W docker-compose.yml: networks: — definiuj sieci dla stacku', 'docker network connect siec kontener — dodaj istniejący kontener do sieci'] }
          },
          { cmd: 'docker volume ls', desc: 'Lista wolumenów',
            detail: { what: 'Pokazuje wszystkie named volumes. Wolumeny przechowują dane poza kontenerem (bazy, upload, cache).', how: 'docker volume inspect vol — szczegóły (mountpoint na hoście).', tips: ['docker volume create my-data — utwórz wolumen', 'Dane w wolumenie przeżywają docker compose down (bez -v)', 'docker volume ls -f dangling=true — wolumeny bez kontenera'] }
          },
          { cmd: 'docker network prune', desc: 'Usuń nieużywane sieci',
            detail: { what: 'Czyści sieci bez podłączonych kontenerów. Bezpieczniejsze niż prune -a.', how: 'docker compose down usuwa sieć stacku automatycznie.', tips: ['docker system prune usuwa też sieci — możesz więc użyć tego zamiast osobnych komend'] }
          },
        ]
      },
    ]
  }
};
