// Advanced patterns: routing + state
export default {
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
    ]
};
