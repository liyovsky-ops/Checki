// Command reference
export default [
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
    ];
