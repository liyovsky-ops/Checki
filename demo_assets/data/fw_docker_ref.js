// Ecosystem: rywale + pluginy
FW_DOCKER_DATA.content.rywale  = [
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
    ];
FW_DOCKER_DATA.content.pluginy = [
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
    ];
