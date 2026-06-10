import _advanced from './fw_aws_advanced.js';
import _ref      from './fw_aws_ref.js';
import _komendy  from './fw_aws_komendy.js';

export const FW_AWS_DATA = {
  meta: {
    id: 'aws', name: 'AWS', icon: '☁️', color: '#FF9900', color2: '#FF6B35',
    tagline: 'Amazon Web Services — największa platforma cloud na świecie (33%+ rynku)',
    year: 2006, author: 'Amazon.com / Andy Jassy', lang: 'Multi-cloud',
    github: 'aws', stars: '200+ serwisów', codeLang: 'bash'
  },

  tabs: [
    { id: 'podstawy',   label: 'Podstawy AWS' },
    { id: 'komponenty', label: 'Compute' },
    { id: 'hooki',      label: 'Storage & DB' },
    { id: 'routing',    label: 'Networking' },
    { id: 'state',      label: 'Security & DevOps' },
    { id: 'rywale',     label: 'Rywale' },
    { id: 'pluginy',    label: 'AI & Big Data' },
    { id: 'komendy',    label: 'AWS CLI' },
  ],

  content: {

    // ── Tab 1: Podstawy ──────────────────────────────────────────────────────
    podstawy: {
      labels: {
        concepts: 'Kluczowe koncepcje AWS',
        whenToUse: 'Kiedy wybrać AWS?',
        firstComponent: 'Pierwsze kroki — konfiguracja CLI i pierwsze zasoby',
        firstComponentLang: 'bash'
      },
      intro: {
        title: 'Czym jest Amazon Web Services?',
        desc: 'AWS to największa platforma chmurowa na świecie — 33%+ rynku. Uruchomiona w 2006 przez Amazon, dziś oferuje ponad 200 serwisów: compute, storage, bazy danych, AI/ML, IoT, blockchain, satelity. Klienci to Netflix, NASA, Airbnb, Samsung, Polska Agencja Kosmiczna, banki i tysiące startupów. Model pay-as-you-go: płacisz za sekundy użycia maszyny, za gigabajty danych, za wywołania funkcji — zero kosztów stałych. AWS ma 30+ regionów geograficznych i 450+ edge locations CDN. Znajomość AWS to jeden z najlepiej płatnych skillów technicznych na rynku pracy.',
      },
      concepts: [
        {
          title: 'Regiony i Availability Zones',
          desc: 'Region = geograficzna lokalizacja (eu-west-1 = Irlandia, eu-central-1 = Frankfurt, us-east-1 = Wirginia). Każdy region ma 3-6 AZ (Availability Zones) = fizycznie oddzielne data centers w tej samej lokalizacji. Deploy na 2+ AZ = odporność na awarię jednego DC. Dane nie opuszczają regionu bez Twojej zgody — ważne dla GDPR.',
          icon: '🌍'
        },
        {
          title: 'IAM — Tożsamość i Dostęp',
          desc: 'Identity and Access Management to fundament bezpieczeństwa AWS. Użytkownicy, Grupy, Role, Polityki. Zasada: Principle of Least Privilege — dawaj MINIMUM uprawnień. Root account: tylko do konfiguracji konta, nigdy do codziennej pracy. Role IAM > Access Keys dla serwisów.',
          icon: '🔐'
        },
        {
          title: 'Model Odpowiedzialności (Shared Responsibility)',
          desc: 'AWS odpowiada za bezpieczeństwo CHMURY (fizyczne DC, sprzęt, sieć, hypervisor). Ty odpowiadasz za bezpieczeństwo W CHMURZE (OS patching, konfiguracja security groups, szyfrowanie danych, zarządzanie uprawnieniami IAM, backup).',
          icon: '🤝'
        },
        {
          title: 'ARN — Amazon Resource Name',
          desc: 'Unikalny identyfikator każdego zasobu AWS w formacie: arn:aws:s3:::moj-bucket lub arn:aws:lambda:eu-west-1:123456789:function:moja-funkcja. Zawiera: partition, service, region, account-id, resource. Używany w politykach IAM do precyzyjnego wskazania zasobu.',
          icon: '🏷️'
        },
        {
          title: 'Free Tier — 12 miesięcy bezpłatnie',
          desc: 'Nowe konto = 12 miesięcy Free Tier: 750h/mies EC2 t2.micro, 5GB S3, 1M wywołań Lambda, 25GB DynamoDB. Część serwisów (Lambda do 1M/mies, DynamoDB 25GB) jest zawsze free. Ustaw billing alerts — Free Tier można przekroczyć przez przypadek!',
          icon: '🆓'
        },
        {
          title: 'Pay-as-you-go + Sposoby Oszczędzania',
          desc: 'On-Demand: płacisz za używanie, bez zobowiązań. Reserved Instances: płacisz z góry na 1-3 lata, 40-75% taniej. Savings Plans: elastyczny odpowiednik RI. Spot Instances: wolne moce obliczeniowe, 60-90% taniej, ale mogą być przerwane z 2min ostrzeżeniem. Compute Savings Plans.',
          icon: '💰'
        },
        {
          title: 'Dostęp: Console, CLI, SDK, IaC',
          desc: 'AWS Console — interfejs webowy, dobry do nauki i eksploracji. AWS CLI — terminal, skrypty, automatyzacja. AWS SDK — Python (boto3), JavaScript, Java, Go, Ruby, .NET. Infrastructure as Code: CloudFormation (YAML/JSON), CDK (TypeScript/Python), Terraform (multi-cloud). Produkcja = zawsze IaC, nie console.',
          icon: '🖥️'
        },
        {
          title: 'Tags — Organizacja i Kontrola Kosztów',
          desc: 'Każdy zasób można otagować: klucz=wartość (Env=prod, Team=backend, Project=checki). Bez tagów nie wiesz które zasoby za co kosztują. Cost Allocation Tags → Cost Explorer → "backend kosztuje $1500/mies, frontend $200". Obowiązkowe w każdej organizacji.',
          icon: '🏷️'
        },
        {
          title: 'Well-Architected Framework — 6 Filarów',
          desc: 'Framework AWS do projektowania solidnych systemów cloud. Narzędzie bezpłatne w Console — robi review architektury i wskazuje High/Medium Risk.\n\n1. Operational Excellence — automatyzacja, IaC, observability, continuous improvement. "Fail small, recover fast."\n2. Security — IAM least privilege, szyfrowanie at-rest i in-transit, WAF, GuardDuty, audit logs. Treat identities as perimeter.\n3. Reliability — multi-AZ deploy, auto-scaling, backup + DR, chaos engineering, retry z exponential backoff.\n4. Performance Efficiency — właściwy typ instancji, caching (ElastiCache), CDN (CloudFront), database selection.\n5. Cost Optimization — reserved/spot instances, auto-scaling down, S3 lifecycle policies, rightsizing. Serverless tam gdzie możliwe.\n6. Sustainability — energy efficiency, minimize waste, graviton (arm) zamiast x86, serverless, shared infra.',
          icon: '🏛️'
        },
        {
          title: 'Migracja do AWS — 7R i Snow Family',
          desc: 'Strategia migracji aplikacji (Gartner 7R):\n\n• Retire — wyłącz to co niepotrzebne (20-30% zasobów)\n• Retain — zostaw na-premises to co nie może być migrowane jeszcze\n• Relocate — VMware Cloud on AWS, przeniesienie wirtualnych maszyn bez refactoru\n• Rehost (Lift & Shift) — EC2, szybko, 0 kodu zmienionego\n• Replatform (Lift & Tinker) — RDS zamiast MySQL na EC2, Fargate zamiast ECS EC2\n• Repurchase — przejdź na SaaS (Salesforce zamiast własnego CRM)\n• Refactor (Re-architect) — mikroserwisy, serverless, cloud-native — max korzyści, max pracy\n\nAWS Migration Hub — centralny dashboard śledzenia postępu migracji.\nMigration Evaluator — szacuje TCO (Total Cost of Ownership) przed migracją.',
          icon: '🚚'
        },
        {
          title: 'Pricing Calculator & Cost Management',
          desc: 'Narzędzia kontroli kosztów AWS:\n\n• AWS Pricing Calculator (calculator.aws) — oszacuj koszty PRZED deployem\n• Cost Explorer — analiza historycznych kosztów, forecastowanie, anomaly detection\n• AWS Budgets — alerty gdy koszty/użycie przekraczają próg\n• Cost Anomaly Detection — ML wykrywa nieoczekiwane wzrosty kosztów\n• Savings Plans — 1 lub 3 lata, oszczędność 40-72% vs On-Demand\n• Compute Optimizer — AI rekomenduje rightsizing (np. zmień m5.xlarge na m5.large)\n• Cost Allocation Reports — S3 bucket z CSV per tag/service/account\n\nZasada: koszty zawsze rosną gdy się nie patrzy. Ustaw budżet i alerty od pierwszego dnia.',
          icon: '💸'
        },
      ],
      whenToUse: [
        'Startup potrzebuje skalować od 0 do milionów użytkowników bez zarządzania serwerami',
        'Enterprise wymaga compliance: HIPAA, PCI-DSS, SOC 2, ISO 27001 — AWS ma certyfikacje',
        'Potrzebujesz ML/AI: SageMaker, Bedrock (Claude, Llama), Rekognition, Comprehend',
        'Globalna aplikacja wymagająca niskiego latency na wszystkich kontynentach',
        'Big Data: przetwarzaj terabajty dziennie przez Athena, Glue, EMR, Kinesis',
        'Disaster Recovery: backup w innym regionie, failover w minutach',
        'Infrastruktura jako kod: reproducible environments, no snowflake servers',
        'Serverless: Lambda + API Gateway + DynamoDB = zero zarządzania serwerami, płacisz za użycie',
        'Potrzebujesz serwisów których nie ma nigdzie indziej: Ground Station, Quantum, Wavelength',
      ],
      firstComponent: `# 1. Zainstaluj AWS CLI v2
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o awscliv2.zip
unzip awscliv2.zip && sudo ./aws/install
aws --version  # aws-cli/2.x

# 2. Utwórz IAM User z programmatic access (nigdy nie używaj root!)
# AWS Console → IAM → Users → Create user
# Permissions: AdministratorAccess (na początku, potem zawęź)
# Security credentials → Create access key → CLI

# 3. Skonfiguruj CLI
aws configure
# AWS Access Key ID: AKIAIOSFODNN7EXAMPLE
# AWS Secret Access Key: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
# Default region name: eu-west-1
# Default output format: json

# 4. Sprawdź konfigurację
aws sts get-caller-identity
# → Account: "123456789", UserId: "AIDAIOSFODNN7EXAMPLE"

# 5. Pierwsze polecenia
aws s3 ls                          # lista bucketów
aws ec2 describe-regions --output table  # dostępne regiony
aws iam list-users                 # lista użytkowników IAM

# 6. Profil dla projektu (nie mieszaj kont!)
aws configure --profile checki-dev
export AWS_PROFILE=checki-dev       # aktywuj profil

# 7. Zawsze ustaw billing alert!
aws budgets create-budget --account-id 123456789 \
  --budget '{"BudgetName":"monthly","BudgetLimit":{"Amount":"20","Unit":"USD"},"TimeUnit":"MONTHLY","BudgetType":"COST"}' \
  --notifications-with-subscribers '[{"Notification":{"NotificationType":"ACTUAL","ComparisonOperator":"GREATER_THAN","Threshold":80},"Subscribers":[{"SubscriptionType":"EMAIL","Address":"twoj@email.com"}]}]'`
    },

    // ── Tab 2: Compute ───────────────────────────────────────────────────────
    komponenty: [
      {
        title: 'EC2 — Elastic Compute Cloud (Wirtualne Maszyny)',
        desc: 'Serce AWS compute — wirtualne maszyny (instances) ze wszystkimi zaletami chmury. Setki typów instancji:\n\n• t3/t4g.micro/small/medium — Burstable (tańsze, burst CPU gdy potrzeba). T4g = ARM (Graviton, 20% taniej)\n• m7g/m6i.large/xlarge — General Purpose (backend API, microservices)\n• c7g/c6i.xlarge — Compute Optimized (web serwery, HPC, encoding)\n• r7g/r6i.xlarge — Memory Optimized (bazy danych in-memory, Spark)\n• p3.2xlarge / g4dn.xlarge — GPU (ML training/inference, rendering)\n• i3/i4i.xlarge — Storage Optimized (OLTP, Elasticsearch, Redis cluster)\n\nGłówne koncepcje:\n• AMI (Amazon Machine Image) — "snapshot" systemu z OS i software. Publiczne (Ubuntu, Amazon Linux, Windows) lub własne.\n• Security Groups — stateful firewall; domyślnie blokuje wszystko\n• Key Pairs — SSH dostęp. Klucz prywatny pobierasz RAZ przy tworzeniu\n• Elastic IP — stały publiczny adres IP ($0.005/h gdy nie przypisany do działającej instancji)\n• Auto Scaling Group — automatycznie dodaje/usuwa instancje na podstawie metryk (CPU, custom)\n• Launch Template — szablon konfiguracji instancji (AMI, typ, SG, IAM role, user-data)',
        code: `# Szybki start — Amazon Linux 2023 t3.micro
aws ec2 run-instances \
  --image-id ami-0905a3c97561e0b69 \
  --instance-type t3.micro \
  --key-name moj-klucz \
  --security-group-ids sg-xxx \
  --subnet-id subnet-xxx \
  --iam-instance-profile Name=EC2S3Role \
  --user-data '#!/bin/bash
    dnf update -y
    dnf install -y python3 pip
    pip3 install fastapi uvicorn
    # uruchom aplikację
    cd /home/ec2-user/app && uvicorn main:app --host 0.0.0.0 --port 8000 &' \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=api-prod},{Key=Env,Value=prod}]'

# Auto Scaling Group — horizontal scaling
aws autoscaling create-auto-scaling-group \
  --auto-scaling-group-name prod-api-asg \
  --launch-template LaunchTemplateId=lt-xxx,Version='$Latest' \
  --min-size 2 --max-size 10 --desired-capacity 3 \
  --target-group-arns arn:aws:elasticloadbalancing:... \
  --health-check-type ELB \
  --vpc-zone-identifier "subnet-1a,subnet-1b,subnet-1c"`,
        lang: 'bash'
      },
      {
        title: 'AWS Lambda — Serverless Functions (FaaS)',
        desc: 'Uruchamiaj kod bez zarządzania serwerami. Płacisz za milisekundy wykonania. Kod uruchamiany w odpowiedzi na zdarzenia.\n\nSpecyfikacja:\n• Języki: Python 3.12, Node.js 20, Java 21, Go, Ruby 3.2, .NET 8, custom runtime (kontener)\n• Pamięć: 128MB – 10240MB (CPU proporcjonalnie do RAM)\n• Timeout: max 15 minut (900 sekund)\n• /tmp storage: do 10240MB\n• Concurrency: 1000 jednoczesnych invocacji per region (soft limit, można podnieść)\n• Deployment package: 50MB ZIP (250MB unzip), lub do 10GB Docker image\n\nTriggers (co wywołuje Lambda):\nAPI Gateway, ALB, S3 events, SQS, SNS, EventBridge, DynamoDB Streams, Kinesis, CloudWatch Events, Cognito, Lex, IoT, CloudFront (Lambda@Edge)\n\nCold Start:\n• Pierwsze wywołanie po "uśpieniu" = dodatkowe 100ms–2s\n• Provisioned Concurrency eliminuje cold start (płacisz za utrzymanie warm)\n• Snap Start (Java) — redukuje cold start\n• Container Image Lambda ma większy cold start niż ZIP\n\nCena: $0.20 per 1M requestów + $0.0000166667 per GB-sekunda',
        code: `# Typowy Lambda handler (Python) — API endpoint
import json, boto3, os

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['TABLE_NAME'])

def handler(event, context):
    # event od API Gateway (HTTP Proxy)
    method  = event['requestContext']['http']['method']
    path    = event['requestContext']['http']['path']
    user_id = event.get('pathParameters', {}).get('userId')

    if method == 'GET' and path.startswith('/users/'):
        response = table.get_item(Key={'userId': user_id})
        if 'Item' not in response:
            return {'statusCode': 404, 'body': json.dumps({'error': 'not found'})}
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps(response['Item'])
        }

    return {'statusCode': 405, 'body': json.dumps({'error': 'method not allowed'})}

# Deploy
zip function.zip lambda_function.py
aws lambda update-function-code \
  --function-name moja-funkcja --zip-file fileb://function.zip`,
        lang: 'python'
      },
      {
        title: 'Amazon ECS — Elastic Container Service',
        desc: 'Zarządzany orchestrator kontenerów Docker. Nie potrzebujesz znać Kubernetes. AWS zarządza control plane.\n\nGłówne komponenty:\n• Cluster — logiczna grupa EC2 lub Fargate zasobów\n• Task Definition — "przepis": jaki image, ile CPU/RAM, env vars, log config, secrets, volumes\n• Service — utrzymuje N działających tasków, integruje się z ALB, auto-healing\n• Task — jeden uruchomiony kontener (lub grupa sidecar containers)\n\nLaunch Types:\n• EC2 — Ty zarządzasz EC2 nodes (więcej kontroli, tańsze przy dużej skali)\n• Fargate — serverless (AWS zarządza serwerami, płacisz per task CPU/RAM)\n\nBest practices:\n• Jeden service = jeden mikroserwis\n• TaskRole IAM — rola dla kontenera (dostęp do S3, Secrets Manager itp.)\n• ECR (Elastic Container Registry) — prywatny Docker Hub na AWS\n• Service Connect / Cloud Map — service discovery między serwisami\n• Container Insights — monitoring CPU/RAM per task\n• Blue/Green Deploy przez CodeDeploy — zero-downtime',
        code: `# task-definition.json
{
  "family": "api-task",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::...:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::...:role/apiTaskRole",
  "containerDefinitions": [{
    "name": "api",
    "image": "123456789.dkr.ecr.eu-west-1.amazonaws.com/my-api:latest",
    "portMappings": [{"containerPort": 8000, "protocol": "tcp"}],
    "environment": [{"name": "ENV", "value": "prod"}],
    "secrets": [
      {"name": "DB_PASSWORD", "valueFrom": "arn:aws:secretsmanager:...:secret:prod/db/pass"}
    ],
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": "/ecs/api",
        "awslogs-region": "eu-west-1",
        "awslogs-stream-prefix": "ecs"
      }
    },
    "healthCheck": {
      "command": ["CMD-SHELL", "curl -f http://localhost:8000/health || exit 1"],
      "interval": 30, "timeout": 5, "retries": 3
    }
  }]
}`,
        lang: 'json'
      },
      {
        title: 'Amazon EKS — Elastic Kubernetes Service',
        desc: 'Managed Kubernetes. AWS zarządza control plane (API server, etcd), Ty zarządzasz worker nodes (lub używasz Fargate).\n\nKiedy EKS zamiast ECS:\n• Przenosisz istniejący workload K8s do chmury\n• Zespół zna K8s i Helm\n• Potrzebujesz zaawansowanego networking (Istio, Cilium)\n• Multi-cloud strategy (ten sam YAML na GKE/AKS/EKS)\n\nNode Groups:\n• Managed Node Groups — AWS zarządza EC2 nodes, auto-scaling, rolling updates\n• Self-managed nodes — pełna kontrola\n• Fargate profiles — serverless pods, bez node management\n\nAWS Load Balancer Controller — automatycznie tworzy ALB dla Kubernetes Ingress\nEBS CSI Driver — persistent volumes na EBS\nEFS CSI Driver — shared persistent volumes na EFS\nKarpenter — intelligent auto-scaler (zastępuje Cluster Autoscaler)\nAWS Secrets Store CSI — Secrets Manager/SSM → K8s secrets\n\nEKSctl — CLI do zarządzania EKS klastrami',
        code: `# Utwórz klaster EKS z eksctl
eksctl create cluster \
  --name prod-cluster \
  --region eu-west-1 \
  --nodegroup-name workers \
  --node-type m5.large \
  --nodes 3 \
  --nodes-min 2 \
  --nodes-max 10 \
  --managed

# Zaktualizuj kubeconfig
aws eks update-kubeconfig --name prod-cluster --region eu-west-1

# Deployment z ALB Ingress
kubectl apply -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
      - name: api
        image: 123456789.dkr.ecr.eu-west-1.amazonaws.com/api:latest
        ports:
        - containerPort: 8000
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
EOF`,
        lang: 'bash'
      },
      {
        title: 'AWS Fargate — Serverless Containers',
        desc: 'Fargate to launch type dla ECS i EKS — nie zarządzasz serwerami EC2. Podajesz tylko: image, CPU, RAM. AWS uruchamia kontener w izolowanej VM-per-task.\n\nCena: per vCPU-sekunda + per GB-sekunda (droższe niż EC2 ale zero ops overhead)\n• 0.25 vCPU + 0.5 GB = ~$9/mies (non-stop)\n• EC2 t3.micro (1vCPU + 1GB) = ~$8.5/mies\n→ Fargate opłaca się gdy nie masz stałego obciążenia lub masz wiele małych tasków\n\nFargate Spot — 70% tańszy, może być przerwany (idealne dla batch jobs)\n\nFargate vs EC2 Launch Type:\n• Fargate: zero patch/manage, izolacja per task, wolniejszy start (15-60s), brak GPU, brak dostępu do EC2 metadata\n• EC2: tańszy przy scale, GPU support, szybszy start, pełna kontrola\n\nFargate + ECS = najczęstszy wybór dla nowych projektów\nFargate + EKS = K8s bez node managementu',
        code: `# ECS Service z Fargate (przez CDK Python)
from aws_cdk import (
    aws_ecs as ecs,
    aws_ecs_patterns as patterns,
    aws_ec2 as ec2,
)

# ApplicationLoadBalancedFargateService = ALB + Fargate + Auto-scaling
# to 3 linie kodu zamiast 100 linii CloudFormation
service = patterns.ApplicationLoadBalancedFargateService(
    self, "ApiService",
    cluster=cluster,
    cpu=512,           # 0.5 vCPU
    memory_limit_mib=1024,
    desired_count=3,
    task_image_options=patterns.ApplicationLoadBalancedTaskImageOptions(
        image=ecs.ContainerImage.from_ecr_repository(repo, "latest"),
        container_port=8000,
        environment={"ENV": "prod"},
        secrets={"DB_PASS": ecs.Secret.from_secrets_manager(db_secret)},
    ),
    public_load_balancer=True,
)

# Auto-scaling na CPU
scaling = service.service.auto_scale_task_count(max_capacity=20)
scaling.scale_on_cpu_utilization("CpuScaling", target_utilization_percent=70)`,
        lang: 'python'
      },
      {
        title: 'AWS Elastic Beanstalk — PaaS (Platform as a Service)',
        desc: 'Deploy aplikacji bez znajomości infrastruktury. Podajesz kod lub Docker image → Beanstalk tworzy EC2, ALB, Auto Scaling Group, CloudWatch monitoring, S3 dla deploymentów.\n\nObsługiwane platformy: Python, Node.js, Java, .NET, Ruby, PHP, Go, Docker, Docker Compose\n\nZalety:\n• Szybki start — git push → live\n• Managed updates — AWS aktualizuje platformę\n• Zero dodatkowych kosztów — płacisz za EC2, ALB (nie za Beanstalk)\n• Rolling/Immutable/Blue-Green deployments wbudowane\n• .ebextensions — customizacja środowiska\n\nWady:\n• Mniejsza kontrola niż ECS/EKS\n• Ograniczone opcje dla złożonych architektur\n• Legacy — nowe projekty częściej używają ECS/Fargate\n\nBeanstalk CLI: eb init → eb create → eb deploy',
        code: `# .ebextensions/01-packages.config — dodatkowe pakiety
packages:
  yum:
    git: []
    postgresql-devel: []

option_settings:
  aws:elasticbeanstalk:application:environment:
    DJANGO_SETTINGS_MODULE: myapp.settings.prod
    DATABASE_URL: '{{resolve:secretsmanager:prod/db/url}}'
  aws:autoscaling:asg:
    MinSize: '2'
    MaxSize: '8'
  aws:elasticbeanstalk:environment:process:default:
    HealthCheckPath: /health
    MatcherHTTPCode: '200'

# Procfile — jak uruchomić aplikację
web: gunicorn --workers=3 --bind=0.0.0.0:8000 myapp.wsgi:application

# Deploy
eb init moja-app --region eu-west-1 --platform "Python 3.11"
eb create prod --elb-type application --instance-type t3.small
eb deploy prod`,
        lang: 'yaml'
      },
      {
        title: 'AWS App Runner — Kontener do Internetu w 2 minuty',
        desc: 'Najnowszy i najprostszy serwis do deploy kontenerów webowych. Połącz repo GitHub lub ECR → App Runner sam buduje (opcjonalnie), deploy, skaluje od 0, obsługuje HTTPS, custom domeny.\n\nPorównanie:\n• App Runner — najprościej, brak konfiguracji, droższy per req\n• Elastic Beanstalk — kod, więcej opcji, legacy\n• ECS Fargate — pełna kontrola, złożona konfiguracja\n• EKS — Kubernetes, dla dużych platform\n\nAuto-scaling: 0 → N instancji w sekundy. Min 0 instancji (płacisz za zużycie, nie uptime)\nCena: per vCPU-sekunda + per GB-sekunda aktywnych requestów. $0.007/vCPU/s podczas build.\n\nIdealne dla: REST API, web serwisy, wewnętrzne narzędzia, PoC które mają trafić na prod.',
        code: `# Utwórz App Runner service z ECR image
aws apprunner create-service \
  --service-name moja-api \
  --source-configuration '{
    "ImageRepository": {
      "ImageIdentifier": "123456789.dkr.ecr.eu-west-1.amazonaws.com/api:latest",
      "ImageRepositoryType": "ECR",
      "ImageConfiguration": {
        "Port": "8000",
        "RuntimeEnvironmentVariables": {"ENV": "prod"}
      }
    },
    "AutoDeploymentsEnabled": true
  }' \
  --instance-configuration '{
    "Cpu": "1 vCPU",
    "Memory": "2 GB",
    "InstanceRoleArn": "arn:aws:iam::...:role/AppRunnerRole"
  }'

# Sprawdź URL po deploy
aws apprunner describe-service \
  --service-arn arn:... \
  --query "Service.ServiceUrl"`,
        lang: 'bash'
      },
      {
        title: 'AWS Batch — Przetwarzanie Wsadowe',
        desc: 'Managed service do uruchamiania tysięcy batch jobów na EC2 lub Fargate. Automatycznie provisionuje compute, skaluje do 0 gdy brak pracy.\n\nKiedy używać:\n• Renderowanie 3D/video\n• Analiza genomowa, symulacje naukowe\n• ETL transformacje dużych zbiorów danych\n• Trening ML (alternative to SageMaker)\n• Nightly batch reporting\n\nKomponenty:\n• Job Definition — template joba (image, vCPU, RAM, retry, timeout)\n• Job Queue — kolejka z priorytetami\n• Compute Environment — EC2 On-Demand, Reserved, Spot (70% taniej)\n• Array Jobs — uruchom ten sam job N razy z różnymi parametrami (np. przetworz 1000 plików)\n• Multi-node Parallel — distributed computing (MPI)\n\nAWS Batch vs Step Functions: Batch = duże obliczenia, Step Functions = workflow orchestration',
        code: `# Zarejestruj job definition
aws batch register-job-definition \
  --job-definition-name process-dataset \
  --type container \
  --container-properties '{
    "image": "123456789.dkr.ecr.eu-west-1.amazonaws.com/processor:latest",
    "vcpus": 4,
    "memory": 8192,
    "jobRoleArn": "arn:aws:iam::...:role/BatchJobRole",
    "environment": [{"name": "S3_BUCKET", "value": "moje-dane"}],
    "mountPoints": [],
    "volumes": []
  }' \
  --retry-strategy '{"attempts": 3}' \
  --timeout '{"attemptDurationSeconds": 3600}'

# Wyślij Array Job — 100 równoległych tasków
aws batch submit-job \
  --job-name process-all-files \
  --job-queue prod-queue \
  --job-definition process-dataset \
  --array-properties '{"size": 100}'
  # AWS_BATCH_JOB_ARRAY_INDEX = 0-99 w każdym kontenerze`,
        lang: 'bash'
      },
      {
        title: 'Amazon Lightsail — Prosty VPS dla Małych Projektów',
        desc: 'Uproszczony VPS z przewidywalną ceną miesięczną. Dla deweloperów którzy znają tradycyjny hosting.\n\n$3.50/mies: 512MB RAM, 1 vCPU, 20GB SSD, 1TB transfer\n$5/mies: 1GB RAM, 1 vCPU, 40GB SSD, 2TB transfer\n$10/mies: 2GB RAM, 1 vCPU, 60GB SSD, 3TB transfer\n\nWbudowane: statyczny IP, DNS, SSL (Let\'s Encrypt), snapshots, load balancer ($18/mies)\n\nBlueprinty: WordPress, LAMP, Node.js, Django, Plesk, cPanel, MEAN, Nginx, GitLab\n\nKiedy Lightsail:\n• Blog, mały sklep, strona firmowa\n• Dev/staging środowisko\n• Znasz tradycyjny hosting, nie chcesz uczyć się AWS\n• Stały przewidywalny koszt\n\nKiedy NIE Lightsail:\n• Potrzebujesz auto-scaling\n• Integracja z innymi serwisami AWS (Lightsail jest odizolowany)\n• Duże workloady',
        code: `# Utwórz Lightsail instance
aws lightsail create-instances \
  --instance-names blog-server \
  --availability-zone eu-west-1a \
  --blueprint-id wordpress \
  --bundle-id nano_3_0 \
  --user-data "#!/bin/bash
    apt-get update -y"

# Statyczny IP
aws lightsail allocate-static-ip --static-ip-name blog-ip
aws lightsail attach-static-ip \
  --static-ip-name blog-ip \
  --instance-name blog-server

# Snapshot (backup)
aws lightsail create-instance-snapshot \
  --instance-name blog-server \
  --instance-snapshot-name blog-backup-$(date +%Y%m%d)

# Lista instancji
aws lightsail get-instances \
  --query "instances[].[name,state.name,publicIpAddress]" \
  --output table`,
        lang: 'bash'
      },
      {
        title: 'AWS Snow Family — Dane Fizyczne + Edge Computing',
        desc: 'Kiedy łącze internetowe jest za wolne lub niedostępne — przenieś petabajty danych fizycznie.\n\n• Snowcone (8TB HDD / 14TB SSD, 4GB RAM, 2 vCPU) — najmniejszy, rozmiar zeszytu, wytrzymały. Drone delivery, remote locations, IoT edge.\n• Snowball Edge Storage (210TB) — skrzynka z zamkiem, 24TB NVMe do obliczeń. ETL na miejscu zanim wyślesz do AWS.\n• Snowball Edge Compute (52 vCPU, 208GB RAM, optional GPU) — przetwarzanie danych na miejscu (IoT factory, okręt wojenny, wiertnia)\n• Snowmobile (100 PB w ciężarówce) — dla hiperscale migracji. Fibre channel do ciężarówki.\n\nTypowy workflow:\n1. Zamów urządzenie online → AWS dostarcza FedEx\n2. Podepnij do sieci, skopiuj dane\n3. Odeślij do AWS → dane trafiają do S3/S3 Glacier\n\nLepszy niż internet gdy:\n100 TB przez 100 Mbps łącze = ~111 dni. Snowball = 2-3 tygodnie (+ czas transportu).\n\nOpsHub — GUI zamiast CLI dla Snowball.',
        code: `# Zamów Snowball Edge
aws snowball create-job \
  --job-type IMPORT \
  --resources '{"S3Resources":[{"BucketArn":"arn:aws:s3:::cel-bucket"}]}' \
  --address-id ADID123 \
  --kms-key-arn arn:aws:kms:eu-west-1:123:key/xxx \
  --role-arn arn:aws:iam::123:role/SnowballRole \
  --snowball-capacity T214 \
  --shipping-option EXPRESS \
  --snowball-type EDGE_STORAGE_OPTIMIZED

# Na Snowball: uruchamiaj EC2 (AMI) lokalnie!
# Załaduj AMI na Snowball → uruchom lokalny EC2 → przetworz dane → wyślij do S3
snowballEdge describe-service --service-id ec2
snowballEdge start-service --service-id ec2 --virtual-network-interface-arns ...

# Snowcone — zbieranie danych IoT/edge
aws datasync create-task \
  --source-location-arn arn:aws:datasync:...:location/LOC-SNOWCONE \
  --destination-location-arn arn:aws:datasync:...:location/LOC-S3 \
  --cloud-watch-log-group-arn arn:aws:logs:...`,
        lang: 'bash'
      },
      {
        title: 'AWS Outposts — AWS On-Premises',
        desc: 'Rack serwerów AWS zainstalowany w Twoim data center — te same serwisy AWS, te same API, ta sama konsola, ale sprzęt jest u Ciebie. "AWS za ścianą".\n\nDlaczego Outposts:\n• Latency < 5ms — dane muszą zostać lokalnie (manufacturing, healthcare, trading)\n• Data residency — prawo wymaga że dane fizycznie nie opuszczają konkretnej lokalizacji\n• Lokalne przetwarzanie z synchronizacją do chmury\n• Hybrid bursting: normalnie na Outpost, spike → AWS Region\n\nDostępne serwisy na Outpost:\nEC2 (wybrane typy), ECS, EKS, RDS, ElastiCache, EMR, ALB, SageMaker, EBS, S3 (Outpost S3)\n\nFormy:\n• Rack: pełna szafa serwerów (42U), 1-96 racków\n• Server: mniejszy format (1U/2U), do 3 serwerów\n\nBilling: 3-letni kontrakt, $120k-$3M+ zależnie od konfiguracji.\n\nłączność: wymaga dedykowanego połączenia do AWS Region (Direct Connect lub VPN).',
        code: `# Outpost: te same API co AWS Region, ale lokalnie
# EC2 na Outpost
aws ec2 run-instances \
  --image-id ami-xxx \
  --instance-type m5.xlarge \
  --subnet-id subnet-outpost-xxx  # subnet outpostowy

# RDS na Outpost (PostgreSQL, MySQL)
aws rds create-db-instance \
  --db-instance-identifier local-db \
  --db-instance-class db.m5.xlarge \
  --engine postgres \
  --outpost-identifier arn:aws:outposts:eu-west-1:123:outpost/op-xxx \
  --db-subnet-group-name outpost-subnet-group

# S3 on Outposts — przechowuj dane lokalnie
aws s3api create-bucket \
  --bucket local-data-bucket \
  --outpost-id op-xxx

# Lista Outpostów
aws outposts list-outposts \
  --query "Outposts[].[OutpostId,Name,LifeCycleStatus,Description]" \
  --output table`,
        lang: 'bash'
      },
      {
        title: 'EC2 Image Builder — Automatyzacja AMI',
        desc: 'Pipeline do automatycznego budowania, testowania i dystrybuowania AMI (Amazon Machine Images) i Docker images.\n\nDlaczego Image Builder:\n• Golden AMI Strategy: bazowy image z patchami, agentami (CloudWatch, SSM), hardening (CIS Benchmark), zamiast ręcznego aktualizowania\n• Automatyczne patche bezpieczeństwa — Schedule: co tydzień → nowy AMI z aktualnymi pakietami\n• Compliance: każdy AMI testowany przez Inspector przed dystrybucją\n• Multi-region distribution — jeden pipeline → AMI w 5 regionach\n\nKomponenty:\n• Recipe — bazowy image + lista komponentów (co instalować)\n• Component — YAML z fazami (build, validate, test)\n• Infrastructure Configuration — jaki typ EC2 do buildowania\n• Distribution Configuration — do których regionów i kont\n• Pipeline — łączy wszystko + schedule',
        code: `# Component — instalacja agentów i konfiguracja (YAML)
name: InstallAgents
description: Install CloudWatch + SSM agents and harden
schemaVersion: 1.0
phases:
  - name: build
    steps:
      - name: UpdateOS
        action: UpdateOS
      - name: InstallCloudWatchAgent
        action: ExecuteBash
        inputs:
          commands:
            - rpm -Uvh https://s3.amazonaws.com/amazoncloudwatch-agent/amazon_linux/amd64/latest/amazon-cloudwatch-agent.rpm
            - /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a start
      - name: DisableRootLogin
        action: ExecuteBash
        inputs:
          commands:
            - sed -i 's/^PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
  - name: validate
    steps:
      - name: CheckSSHConfig
        action: ExecuteBash
        inputs:
          commands:
            - grep "PermitRootLogin no" /etc/ssh/sshd_config || exit 1

# Schedule: co poniedziałek nowy AMI
aws imagebuilder create-image-pipeline \
  --image-pipeline-name weekly-hardened-ami \
  --image-recipe-arn arn:aws:imagebuilder:...:image-recipe/prod-recipe/1.0.0 \
  --schedule '{"ScheduleExpression":"cron(0 9 ? * MON *)","PipelineExecutionStartCondition":"EXPRESSION_MATCH_AND_DEPENDENCY_UPDATES_AVAILABLE"}'`,
        lang: 'yaml'
      },
      {
        title: 'AWS Wavelength — 5G Edge Computing',
        desc: 'Infrastruktura AWS wbudowana bezpośrednio w sieci 5G operatorów (Verizon, Vodafone, KDDI, SK Telecom). Ultra-niski latency: 1-10ms do urządzenia końcowego (vs 50-100ms przez internet do regionu).\n\nJak działa:\n• Wavelength Zone = mini AWS Region w RAN (Radio Access Network) operatora\n• Deploy EC2/ECS w Wavelength Zone → serwer jest fizycznie w stacji bazowej 5G\n• Telefon 5G → stacja bazowa → Wavelength Zone (1ms!) → nie wychodzi do internetu\n\nKiedy używać:\n• Autonomous vehicles — real-time decision making (AI inference <10ms)\n• Smart manufacturing — industrial IoT, roboty, CNC\n• Live video streaming — low-latency encoding na edge\n• Gaming — cloud gaming (streaming, 60fps), multiplayer servers\n• AR/VR — nie możesz mieć latency > 20ms dla VR bez motion sickness\n• Healthcare — remote surgery assistance, real-time imaging\n\nDostępność: US (Verizon), UK/Germany (Vodafone), Japan (KDDI/SoftBank), Korea (SK Telecom)',
        code: `# Wavelength Zone = rozszerzenie regionu
# eu-west-1-wl1-lon-wlz-1 = Wavelength Zone w Londynie (Vodafone)

# Opt-in do Wavelength Zone
aws ec2 modify-availability-zone-group \
  --group-name eu-west-1-wl1-lon-wlz-1 \
  --opt-in-status opted-in

# Subnet w Wavelength Zone
aws ec2 create-subnet \
  --vpc-id vpc-xxx \
  --cidr-block 10.0.100.0/24 \
  --availability-zone-id euw1-wl1-lon-wlz1

# EC2 w Wavelength Zone (inference serwer dla AI)
aws ec2 run-instances \
  --image-id ami-xxx \
  --instance-type t3.medium \
  --subnet-id subnet-wavelength \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=edge-inference}]'

# Carrier IP — publiczny adres dostępny przez sieć 5G operatora
aws ec2 allocate-address \
  --network-border-group eu-west-1-wl1-lon-wlz-1

# Aplikacja: telefon 5G → Carrier IP → EC2 w Wavelength Zone
# Ruch nigdy nie opuszcza sieci Vodafone → 1-5ms latency!`,
        lang: 'bash'
      },
      {
        title: 'Amazon WorkSpaces — Wirtualne Pulpity (DaaS)',
        desc: 'Desktop-as-a-Service — wirtualne pulpity Windows/Linux w chmurze AWS. Użytkownicy łączą się z dowolnego urządzenia (PC, Mac, Chromebook, tablet) przez klienta WorkSpaces lub przeglądarkę (WorkSpaces Web).\n\nDwa modele:\n• WorkSpaces Personal — dedykowany pulpit per użytkownik. Zawsze działa, zawsze dostępny.\n• WorkSpaces Pools — współdzielone pulpity, użytkownicy dostają dostęp na żądanie (jak AppStream ale pełny pulpit).\n\nSpecyfikacja:\n• Bundle: Value (2vCPU, 2GB RAM), Standard (2vCPU, 4GB), Performance (2vCPU, 7.5GB), Power (4vCPU, 16GB), Graphics (8vCPU, 15GB + GPU)\n• Storage: 80GB C: + 50GB D: (SSD, rozszerzalne)\n• OS: Windows 10/11, Amazon Linux 2, Ubuntu\n• Protokół: PCoIP lub WSP (WorkSpaces Streaming Protocol)\n\nKiedy używać:\n• Remote work/home office — bezpieczny dostęp do korporacyjnych danych\n• Kontrahenci/konsultanci — dostęp bez instalowania czegokolwiek na ich urządzeniu\n• Regulowane branże (finanse, zdrowie) — dane nigdy nie opuszczają AWS\n• BYOD environments — separacja korporacyjnych i prywatnych danych\n\nCena: od $21/mies (Value) do $88/mies (Power) + opłata za bundle',
        code: `# Utwórz WorkSpaces Directory (AD Connector lub Simple AD)
aws ds create-directory \
  --name corp.example.com \
  --password "SecureP@ss1" \
  --size Small \
  --vpc-settings VpcId=vpc-xxx,SubnetIds=subnet-1a,subnet-1b

# Zarejestruj directory z WorkSpaces
aws workspaces register-workspace-directory \
  --directory-id d-xxx \
  --subnet-ids subnet-1a subnet-1b \
  --enable-work-docs

# Utwórz WorkSpace dla użytkownika
aws workspaces create-workspaces --workspaces '[
  {
    "DirectoryId": "d-xxx",
    "UserName": "jan.kowalski",
    "BundleId": "wsb-bh8rsxt14",
    "WorkspaceProperties": {
      "RunningMode": "ALWAYS_ON",
      "RootVolumeSizeGib": 80,
      "UserVolumeSizeGib": 50
    },
    "Tags": [{"Key": "Team", "Value": "Finance"}]
  }
]'

# Lista WorkSpaces i status
aws workspaces describe-workspaces --directory-id d-xxx \
  --query "Workspaces[].[WorkspaceId,UserName,State,BundleId]" \
  --output table`,
        lang: 'bash'
      },
      {
        title: 'Amazon AppStream 2.0 — Streaming Aplikacji',
        desc: 'Streaming aplikacji desktopowych przez przeglądarkę — bez instalowania czegokolwiek na urządzeniu użytkownika. Uruchamiasz aplikację na instancji AWS, obraz jest streamowany do przeglądarki użytkownika.\n\nRóżnica AppStream vs WorkSpaces:\n• AppStream — stream konkretnych aplikacji (np. AutoCAD, SAP, Photoshop)\n• WorkSpaces — pełny pulpit Windows/Linux\n\nKluczowe koncepcje:\n• Fleet — pula instancji EC2 uruchamiających aplikacje\n• Stack — zbiera Fleet + polityki dostępu + ustawienia użytkownika\n• Image — Amazon Machine Image z zainstalowanymi aplikacjami\n• Image Builder — EC2 do tworzenia obrazów z aplikacjami\n\nTypy flot:\n• Always-On — instancje zawsze uruchomione, brak cold start, droższe\n• On-Demand — instancje startują gdy użytkownik się łączy (1-2min czekania)\n• Elastic Fleet — auto-scaling, płacisz za streaming seconds\n\nZastosowania:\n• CAD/CAM — AutoCAD, CATIA, SolidWorks ze słabego laptopa\n• Business apps — SAP, Oracle E-Business Suite, Citrix migracja\n• Education — każdy student ma te same aplikacje\n• Seasonal workers — dostęp do software tylko w sezonie',
        code: `# Utwórz Image Builder (EC2 do budowania obrazu)
aws appstream create-image-builder \
  --name my-app-builder \
  --instance-type stream.standard.medium \
  --image-name AppStream-WinServer2019-08-05-2024

# Po połączeniu przez konsolę → zainstaluj aplikacje → Image Actions → Create Image

# Utwórz Fleet
aws appstream create-fleet \
  --name prod-fleet \
  --instance-type stream.standard.medium \
  --fleet-type ON_DEMAND \
  --image-name my-company-apps-2024 \
  --compute-capacity DesiredInstances=5 \
  --max-user-duration-in-seconds 28800 \
  --disconnect-timeout-in-seconds 900 \
  --enable-default-internet-access

# Utwórz Stack (łączy fleet z politykami)
aws appstream create-stack \
  --name prod-stack \
  --display-name "Aplikacje Korporacyjne" \
  --storage-connectors '[{"ConnectorType":"HOMEFOLDERS"}]' \
  --user-settings '[
    {"Action":"CLIPBOARD_COPY_FROM_LOCAL_DEVICE","Permission":"ENABLED"},
    {"Action":"FILE_UPLOAD","Permission":"DISABLED"},
    {"Action":"PRINTING_TO_LOCAL_DEVICE","Permission":"DISABLED"}
  ]'

# Powiąż Fleet ze Stackiem
aws appstream associate-fleet --fleet-name prod-fleet --stack-name prod-stack

# Wygeneruj URL dla użytkownika (ważny 1h)
aws appstream create-streaming-url \
  --stack-name prod-stack \
  --fleet-name prod-fleet \
  --user-id "jan.kowalski@example.com" \
  --validity 3600`,
        lang: 'bash'
      },
      {
        title: 'Amazon Connect — Cloud Contact Center',
        desc: 'Zarządzane call center w chmurze — to samo rozwiązanie co Amazon.com używa dla swoich 70,000 agentów. Setup w minutach, zero licencji per-seat.\n\nCo oferuje:\n• Inbound/Outbound voice (VoIP przez PSTN lub WebRTC w przeglądarce)\n• Omnichannel: telefon, chat (website widget), SMS, email, WhatsApp Business\n• Contact Flows — drag-and-drop IVR (Interactive Voice Response) designer\n• Real-time i historyczne metryki w dashboardzie\n• Call Recording — automatyczne nagrywanie, przechowywane w S3\n• Contact Lens — AI: transkrypcja, analiza sentymentu, keyword detection\n• Amazon Q in Connect — AI assistant dla agentów (real-time sugestie odpowiedzi)\n\nIntegracje:\n• Lambda — własna logika biznesowa (sprawdź zamówienie, zarezerwuj slot)\n• DynamoDB/RDS — baza klientów\n• Salesforce, Zendesk, ServiceNow — CRM integracja\n• Lex — chatbot w IVR menu\n\nCena: $0.018/min inbound voice, $0.025/min outbound, $0.004/chat message (pierwsze 12 mies 10% taniej przez Free Tier)',
        code: `# Amazon Connect — programatyczne zarządzanie przez API

# Utwórz instancję Connect
aws connect create-instance \
  --identity-management-type CONNECT_MANAGED \
  --instance-alias my-contact-center \
  --inbound-calls-enabled \
  --outbound-calls-enabled

# Przypisz numer telefonu do instancji
aws connect associate-phone-number-contact-flow \
  --phone-number-id pn-xxx \
  --instance-id xxx \
  --contact-flow-id cf-xxx

# Utwórz użytkownika (agenta)
aws connect create-user \
  --username jan.kowalski \
  --password "SecureP@ss1!" \
  --identity-info FirstName=Jan,LastName=Kowalski \
  --phone-config PhoneType=SOFT_PHONE,AutoAccept=false \
  --routing-profile-id rp-xxx \
  --security-profile-ids sp-xxx \
  --instance-id xxx

# Uruchom outbound call (programatyczny)
aws connect start-outbound-voice-contact \
  --destination-phone-number +48123456789 \
  --contact-flow-id cf-outbound-xxx \
  --instance-id xxx \
  --source-phone-number +48800xxx \
  --attributes '{"orderNumber":"ORD-001","customerName":"Jan"}'

# Pobierz metryki real-time (ile agentów online, kolejka)
aws connect get-current-metric-data \
  --instance-id xxx \
  --filters Channels=VOICE,Queues=queue-xxx \
  --current-metrics '[{"Name":"AGENTS_ONLINE","Unit":"COUNT"},{"Name":"CONTACTS_IN_QUEUE","Unit":"COUNT"}]'`,
        lang: 'bash'
      },
      {
        title: 'Amazon GameLift — Serwery Dla Gier Multiplayer',
        desc: 'Zarządzana infrastruktura dla real-time multiplayer game servers. Automatyczne skalowanie, matchmaking, low-latency na całym świecie.\n\nDwa tryby:\n• Managed GameLift — pełne zarządzanie; wgraj binarkę gry, AWS zarządza flotą EC2\n• Anywhere Fleet — uruchom game server na własnej infrastrukturze lub lokalnie (dev/test)\n\nKluczowe koncepcje:\n• Fleet — pula EC2 z uruchomionym game serverem\n• Game Session — jedna sesja gry (serwer dla 1 meczu/room)\n• Player Session — slot dla jednego gracza w game session\n• Matchmaker (FlexMatch) — elastyczny matchmaking: skill-based, region-based, custom rules\n• Spot Fleet — 70-80% taniej niż On-Demand dla game serverów (przerwanie z 2min notice)\n\nIntegracja z Realtime Servers:\n• GameLift Realtime Servers — lekki JavaScript relay server bez własnego kodu serwera\n• Dla prostych gier: tylko client-side logic, GameLift koordynuje sesje\n\nDlaczego GameLift a nie własne EC2?\n• Matchmaking + skalowanie gotowe out-of-the-box\n• Multi-region Fleet: gracze łączą się z najniższym latency\n• DDoS protection za EC2\n• Metryki: active sessions, player wait times, fleet utilization',
        code: `# Deploy game server build
aws gamelift upload-build \
  --name "MyGame-v1.2" \
  --build-version "1.2.0" \
  --build-root ./build/server/ \
  --operating-system AMAZON_LINUX_2023 \
  --region eu-west-1

# Utwórz Fleet z game serverem
aws gamelift create-fleet \
  --name prod-game-fleet \
  --build-id build-xxx \
  --ec2-instance-type c6g.large \
  --ec2-inbound-permissions '[
    {"FromPort":7777,"ToPort":7777,"IpRange":"0.0.0.0/0","Protocol":"UDP"}
  ]' \
  --runtime-configuration '{
    "ServerProcesses": [{
      "LaunchPath": "/local/game/GameServer",
      "Parameters": "-logFile /local/game/logs/server.log -port 7777",
      "ConcurrentExecutions": 1
    }]
  }' \
  --new-game-session-protection-policy FULL_PROTECTION

# Scaling policy — dodaj serwery gdy >80% wykorzystane
aws gamelift put-scaling-policy \
  --fleet-id fleet-xxx \
  --name scale-up-policy \
  --scaling-adjustment 2 \
  --scaling-adjustment-type ChangeInCapacity \
  --threshold 80 \
  --comparison-operator GreaterThanOrEqualToThreshold \
  --metric-name PercentAvailableGameSessions

# FlexMatch — matchmaking (w Lambdzie)
import boto3
gamelift = boto3.client('gamelift', region_name='eu-west-1')
gamelift.start_matchmaking(
    TicketId='ticket-001',
    ConfigurationName='ranked-1v1',
    Players=[{
        'PlayerId': 'player-123',
        'PlayerAttributes': {
            'skill': {'N': 1500},
            'region': {'S': 'eu'}
        },
        'LatencyInMs': {'eu-west-1': 15, 'us-east-1': 120}
    }]
)`,
        lang: 'bash'
      },
    ],

    // ── Tab 3: Storage & DB ──────────────────────────────────────────────────
    hooki: [
      {
        name: 'S3 — Simple Storage Service',
        desc: 'Nieograniczone, trwałe przechowywanie obiektów (pliki, obrazy, backupy, logi, statyczne strony). 99.999999999% durability (11 dziewiątek). Nie jest dyskiem — nie ma hierarchii folderów (klucz to po prostu string ze /).',
        when: 'Backupy, logi, artefakty buildu, statyczne strony, źródło dla CloudFront, storage dla Lambda, data lake, media pliki użytkowników',
        code: `# Klasy przechowywania (S3 Storage Classes)
Standard:          $0.023/GB  — dostęp w ms, 99.99% availability
Standard-IA:       $0.0125/GB — rzadki dostęp, $0.01/GB retrieval
One Zone-IA:       $0.01/GB  — jak IA, tylko 1 AZ (dane nietrwałe)
Glacier Instant:   $0.004/GB — ms retrieval, rzadki dostęp
Glacier Flexible:  $0.0036/GB— 1-5min retrieval (Expedited), free Bulk (5-12h)
Glacier Deep Archive: $0.00099/GB — 12h retrieval, najtańszy
Intelligent-Tiering: automatycznie przenosi między klasami (za $0.0025/1k objects)

# S3 Versioning — przechowuj wszystkie wersje obiektu
aws s3api put-bucket-versioning \
  --bucket moj-bucket \
  --versioning-configuration Status=Enabled

# S3 Event → Lambda (trigger przy upload)
aws s3api put-bucket-notification-configuration \
  --bucket moj-bucket \
  --notification-configuration '{
    "LambdaFunctionConfigurations": [{
      "LambdaFunctionArn": "arn:aws:lambda:...:process-upload",
      "Events": ["s3:ObjectCreated:*"],
      "Filter": {"Key": {"FilterRules": [{"Name": "suffix","Value": ".jpg"}]}}
    }]
  }'`
      },
      {
        name: 'Amazon EBS — Elastic Block Store',
        desc: 'Dyski wirtualne dla instancji EC2. Block storage — jak SSD/HDD podpięty do maszyny. Persystentny (przeżywa restart instancji, możesz odpiąć i przepiąć). Snapshoty → S3 (incremental).',
        when: 'Dysk systemowy EC2, bazy danych (MySQL, PostgreSQL), Elasticsearch, Redis — wszędzie gdzie potrzebujesz dysku podpiętego do konkretnej instancji',
        code: `# Typy wolumenów EBS
gp3 (General Purpose SSD):  $0.08/GB/mies, 3000 IOPS base, max 16k IOPS
gp2 (poprzednia generacja): $0.10/GB/mies, IOPS = 3x rozmiar (min 100, max 16k)
io2 Block Express:          $0.125/GB + $0.065/IOPS — dla Oracle, SAP HANA
st1 (Throughput HDD):       $0.045/GB — sekwencyjny dostęp, big data, log processing
sc1 (Cold HDD):             $0.015/GB — najrzadziej używane dane

# Utwórz i podepnij wolumen
aws ec2 create-volume \
  --volume-type gp3 \
  --size 100 \
  --availability-zone eu-west-1a \
  --iops 3000 --throughput 125 \
  --encrypted

aws ec2 attach-volume \
  --volume-id vol-xxx \
  --instance-id i-xxx \
  --device /dev/xvdf

# Na instancji: formatuj i montuj
mkfs -t ext4 /dev/xvdf
mount /dev/xvdf /data`
      },
      {
        name: 'Amazon EFS — Elastic File System',
        desc: 'Sieciowy system plików NFS który możesz zamontować jednocześnie na wielu instancjach EC2 lub kontenerach. Skaluje się automatycznie. Droższy niż EBS ale shared access.',
        when: 'Shared storage między EC2 w różnych AZ, WordPress/CMS z wieloma instancjami, shared code dla kontenerów ECS, ML model artifacts dostępne dla wielu Lambda/ECS',
        code: `# Utwórz EFS filesystem
aws efs create-file-system \
  --performance-mode generalPurpose \
  --throughput-mode elastic \
  --encrypted \
  --tags Key=Name,Value=shared-storage

# Mount target w każdej AZ (subnet)
aws efs create-mount-target \
  --file-system-id fs-xxx \
  --subnet-id subnet-1a \
  --security-groups sg-efs

# Na EC2 — zamontuj przez NFS
# amazon-linux-extras install -y amazon-efs-utils
mount -t efs fs-xxx:/ /mnt/shared

# Lambda z EFS — shared cache między instancjami Lambda
# W Lambda Configuration: File system → dodaj EFS access point
# Ścieżka /mnt/efs → dostęp do shared filesystemu

# Klasy EFS:
# Standard: $0.30/GB/mies — frequent access
# Infrequent Access: $0.025/GB/mies + $0.01/GB retrieval
# Archive: $0.008/GB/mies + $0.03/GB retrieval (nowa!)`
      },
      {
        name: 'Amazon RDS — Relacyjne Bazy Danych',
        desc: 'Managed relational databases. AWS zarządza: instalacją, patching, backup (PITR do 35 dni), Multi-AZ failover (<2 min), monitoring, storage autoscaling. Ty zarządzasz schematem i danymi.',
        when: 'PostgreSQL, MySQL, MariaDB, Oracle, SQL Server — wszędzie gdzie potrzebujesz relacyjnej bazy z managed operations. OLTP workloady, backend aplikacji.',
        code: `# Silniki: MySQL 8.0, PostgreSQL 16, MariaDB, Oracle EE/SE, SQL Server
# Klasy instancji: db.t3.micro (dev), db.t3.medium, db.m5.large, db.r5.xlarge

# Multi-AZ = automatyczny failover (nie read scaling!)
# Read Replicas = horizontal read scaling (do 15)
# Parameter Groups = konfiguracja bazy (max_connections, work_mem itp.)

# Tworzenie przez CDK (zalecane)
db = rds.DatabaseInstance(
    self, "DB",
    engine=rds.DatabaseInstanceEngine.postgres(
        version=rds.PostgresEngineVersion.VER_16_2
    ),
    instance_type=ec2.InstanceType.of(
        ec2.InstanceClass.T3, ec2.InstanceSize.MEDIUM
    ),
    vpc=vpc,
    multi_az=True,
    allocated_storage=100,
    max_allocated_storage=500,  # autoscaling storage
    storage_encrypted=True,
    backup_retention=Duration.days(7),
    deletion_protection=True,
    enable_performance_insights=True,
    performance_insight_retention=rds.PerformanceInsightRetention.DEFAULT
)

# Point-in-Time Recovery — przywróć DB do dowolnego momentu
aws rds restore-db-instance-to-point-in-time \
  --source-db-instance-identifier prod-db \
  --target-db-instance-identifier prod-db-restored \
  --restore-time 2024-01-15T10:30:00Z`
      },
      {
        name: 'Amazon Aurora — AWS-Own DB Engine',
        desc: 'Kompatybilny z MySQL i PostgreSQL ale przepisany przez AWS. 5x szybszy niż MySQL, 3x szybszy niż PostgreSQL. Storage niezależny od compute — skaluje się automatycznie do 128TB. 6 kopii danych w 3 AZ.',
        when: 'Gdy potrzebujesz wydajności powyżej RDS MySQL/PostgreSQL ale chcesz zostać z SQL. Aurora Serverless v2 = auto-scale compute od 0.5 do 128 ACU (brak cold start).',
        code: `# Aurora vs RDS PostgreSQL:
# - Szybsze zapytania (5-15% w testach, więcej przy write-heavy)
# - Storage auto-scale 10GB → 128TB bez przestojów
# - Read replicas: do 15, failover <30s (vs 60-120s RDS)
# - Global Database: read w 5 regionach, <1s lag
# - Backtrack: "cofnij czas" bez snapshot (w godzinach, nie dniach)

# Aurora Serverless v2 — skaluje ACU (Aurora Capacity Units)
aurora_serverless = rds.DatabaseCluster(
    self, "AuroraServerless",
    engine=rds.DatabaseClusterEngine.aurora_postgres(
        version=rds.AuroraPostgresEngineVersion.VER_16_2
    ),
    writer=rds.ClusterInstance.serverless_v2("writer"),
    readers=[
        rds.ClusterInstance.serverless_v2("reader",
            scale_with_writer=True)
    ],
    serverless_v2_min_capacity=0.5,   # min 0.5 ACU = ~$0.20/h idle
    serverless_v2_max_capacity=64,    # max 64 ACU
    vpc=vpc,
)

# Aurora Global Database — primary + 5 read regions
# Write: eu-west-1, Read: us-east-1 + ap-southeast-1 (<1s replication lag)`
      },
      {
        name: 'Amazon DynamoDB — NoSQL Serverless',
        desc: 'Serverless key-value i document store. Single-digit millisecond latency w każdej skali. Nie potrzebujesz zarządzać serwerami — podajesz capacity lub on-demand. DynamoDB Streams = CDC events. TTL = automatyczne usuwanie danych.',
        when: 'High-throughput OLTP (miliony ops/s), gaming leaderboards, session storage, IoT telemetry, katalogi produktów. Ale: wymaga starannego projektowania access patterns z góry. Nie dla ad-hoc queries.',
        code: `import boto3
from boto3.dynamodb.conditions import Key, Attr

table = boto3.resource('dynamodb').Table('Orders')

# Podstawowy dostęp: PK + SK zawsze, GSI dla innych patterns
# PK (Partition Key) = rozkład danych na shardy
# SK (Sort Key) = sortowanie, range queries

# Single Table Design — cała aplikacja w jednej tabeli
# PK=USER#123 SK=PROFILE → dane użytkownika
# PK=USER#123 SK=ORDER#2024-01-15#456 → zamówienie użytkownika (sorted by date)
# PK=PRODUCT#abc SK=METADATA → dane produktu

# Put (upsert)
table.put_item(Item={
    'PK': 'USER#123',
    'SK': f'ORDER#{datetime.utcnow().isoformat()}#456',
    'status': 'pending',
    'total': Decimal('99.99'),
    'ttl': int(time.time()) + 90 * 86400  # usuń po 90 dniach
})

# Query — tylko klucze (szybkie, bez pełnego skanu!)
orders = table.query(
    KeyConditionExpression=
        Key('PK').eq('USER#123') &
        Key('SK').begins_with('ORDER#2024')
)['Items']`
      },
      {
        name: 'Amazon ElastiCache — In-Memory Cache',
        desc: 'Managed Redis (ElastiCache for Redis/Valkey) i Memcached. Mikrosekund latency. Cache wyników DB, session storage, rate limiting, pub/sub, distributed locks.',
        when: 'Cachowanie wyników ciężkich zapytań SQL, session storage w aplikacjach webowych, rate limiting w API, real-time leaderboards (Redis Sorted Sets), pub/sub messaging, distributed locks (Redis SETNX).',
        code: `# ElastiCache Redis — klastry
# cache.t3.micro: $0.016/h = ~$12/mies (dev)
# cache.r6g.large: $0.166/h = ~$120/mies (prod, 13GB RAM)

# Multi-AZ: Primary + Replica z auto-failover
# Cluster Mode: sharding na wielu nodach (do 500 shardów, 340TB)
# Backup: snapshot co 24h, retention do 35 dni

import redis

r = redis.Redis(
    host='moj-klaster.xxxxx.cache.amazonaws.com',
    port=6379, ssl=True,
    decode_responses=True
)

# Cache-aside pattern
def get_user(user_id):
    cached = r.get(f"user:{user_id}")
    if cached:
        return json.loads(cached)
    user = db.query("SELECT * FROM users WHERE id = %s", user_id)
    r.setex(f"user:{user_id}", 3600, json.dumps(user))  # TTL 1h
    return user

# Rate limiting (sliding window)
def is_rate_limited(user_id, limit=100, window=60):
    key = f"ratelimit:{user_id}:{int(time.time() // window)}"
    count = r.incr(key)
    r.expire(key, window * 2)
    return count > limit`
      },
      {
        name: 'Amazon Redshift — Data Warehouse',
        desc: 'Petabajtowy data warehouse zoptymalizowany dla analitycznych zapytań SQL (OLAP). Kolumnowe przechowywanie danych, masywnie równoległe (MPP). Redshift Serverless — bez zarządzania klastrem.',
        when: 'Business Intelligence, analizy historyczne, łączenie danych z wielu źródeł, dashboardy. Kiedy DynamoDB/RDS nie wyrabia z complex analytical queries na dużych danych. Integruje się z Tableau, PowerBI, QuickSight.',
        code: `# Redshift vs Athena:
# Redshift: dedykowany klaster, szybszy dla złożonych joins, lepszy dla regularnych queries
# Athena: serverless, $5/TB, idealny dla sporadycznych analiz na S3

# Redshift Serverless (zalecane dla start):
aws redshift-serverless create-namespace \
  --namespace-name prod-analytics \
  --admin-username admin \
  --admin-user-password "TajneHaslo123!"

aws redshift-serverless create-workgroup \
  --workgroup-name analytics-wg \
  --namespace-name prod-analytics \
  --base-capacity 8  # RPU (Redshift Processing Units)

-- Załaduj dane z S3 przez COPY (najszybszy sposób)
COPY sales_data
FROM 's3://moj-datalake/sales/2024/'
IAM_ROLE 'arn:aws:iam::123:role/RedshiftS3Role'
FORMAT AS PARQUET;

-- Analityczne zapytanie z WINDOW functions
SELECT
  date_trunc('month', order_date) as month,
  product_category,
  SUM(revenue) as monthly_revenue,
  SUM(SUM(revenue)) OVER (PARTITION BY product_category ORDER BY date_trunc('month', order_date)) as cumulative_revenue
FROM sales_data
WHERE order_date >= '2024-01-01'
GROUP BY 1, 2`
      },
      {
        name: 'Amazon S3 Glacier — Archiwizacja',
        desc: 'Najtańsze przechowywanie danych w AWS. Dla danych do których rzadko potrzebujesz dostępu — archiwa, logi starsze niż rok, kopie zapasowe dla compliance (RODO wymaga 5 lat).',
        when: 'Long-term backup (financial records, medical data, compliance), media archival, log archival po roku, disaster recovery cold standby',
        code: `# Klasy Glacier:
# Glacier Instant Retrieval: $0.004/GB, dostęp w ms (jak S3 IA ale tańszy)
# Glacier Flexible Retrieval: $0.0036/GB
#   - Expedited: 1-5 min, $0.03/GB retrieval
#   - Standard: 3-5h, $0.01/GB retrieval
#   - Bulk: 5-12h, $0.0025/GB retrieval (najtańszy!)
# Glacier Deep Archive: $0.00099/GB
#   - Standard: 12h retrieval
#   - Bulk: 48h retrieval

# S3 Lifecycle → automatyczne przenoszenie do Glacier
aws s3api put-bucket-lifecycle-configuration \
  --bucket prod-logs \
  --lifecycle-configuration '{
    "Rules": [{
      "ID": "archive-old-logs",
      "Status": "Enabled",
      "Filter": {"Prefix": "logs/"},
      "Transitions": [
        {"Days": 30,  "StorageClass": "STANDARD_IA"},
        {"Days": 90,  "StorageClass": "GLACIER"},
        {"Days": 365, "StorageClass": "DEEP_ARCHIVE"}
      ],
      "Expiration": {"Days": 2555}
    }]
  }'`
      },
      {
        name: 'Amazon DocumentDB — MongoDB Compatible',
        desc: 'Managed document database kompatybilna z MongoDB 6.0 API. AWS zarządza: replikacją, backup, failover. Nie jest to MongoDB — używa własnego storage engine.',
        when: 'Jeśli używasz MongoDB i chcesz managed service na AWS z minimalnymi zmianami kodu. Dokumenty JSON, elastyczne schematy, nested queries, array operators.',
        code: `# DocumentDB — kompatybilność z MongoDB 6.0 driverem
# Dostęp przez standardowy pymongo klient

from pymongo import MongoClient

client = MongoClient(
    'mongodb://admin:password@moj-klaster.xxx.docdb.amazonaws.com:27017/',
    tls=True,
    tlsCAFile='rds-combined-ca-bundle.pem',
    retryWrites=False  # DocumentDB nie wspiera retryWrites=true
)

db = client['moja-baza']
orders = db['orders']

# Wstaw dokument
orders.insert_one({
    'orderId': 'ord-123',
    'userId': 'usr-456',
    'items': [
        {'productId': 'p-1', 'qty': 2, 'price': 29.99},
        {'productId': 'p-2', 'qty': 1, 'price': 49.99}
    ],
    'total': 109.97,
    'status': 'pending'
})

# Znajdź zamówienia > 100 PLN z konkretnym produktem
result = orders.find({
    'total': {'$gt': 100},
    'items.productId': 'p-1'
}).sort('total', -1).limit(10)`
      },
      {
        name: 'Amazon Neptune — Graph Database',
        desc: 'Managed graph database wspierająca Gremlin (TinkerPop), openCypher (jak Neo4j) i SPARQL (RDF). Przechowuje relacje i traversals jako first-class obywateli — dużo szybszy niż SQL JOIN dla głębokch grafów.',
        when: 'Sieci społecznościowe (znajomi, polecenia), fraud detection (sieć powiązań), knowledge graphs, network topology, rekomendacje (kto kupił X kupił też Y), compliance graphs',
        code: `# Gremlin traversal API (Python)
from gremlin_python.driver import client as gremlin_client
from gremlin_python.driver.driver_remote_connection import DriverRemoteConnection
from gremlin_python.process.anonymous_traversal import traversal

conn = DriverRemoteConnection(
    'wss://moj-neptune.xxx.neptune.amazonaws.com:8182/gremlin', 'g'
)
g = traversal().withRemote(conn)

# Dodaj węzły i krawędzie
g.addV('Person').property('name', 'Alice').property('age', 30).next()
g.addV('Person').property('name', 'Bob').next()
g.V().has('name', 'Alice').addE('KNOWS').to(
    g.V().has('name', 'Bob')
).property('since', 2020).next()

# Znajdź wszystkich znajomych znajomych Alice (depth 2)
friends_of_friends = g.V().has('name', 'Alice')\
    .out('KNOWS').out('KNOWS')\
    .dedup()\
    .values('name').toList()

# Fraud detection: znajdź konta współdzielące >2 urządzenia
g.V().hasLabel('Account')\
    .where(out('USES').count().is_(gt(2)))\
    .values('accountId').toList()`
      },
      {
        name: 'Amazon FSx — Managed File Systems',
        desc: 'Managed file systems dla wyspecjalizowanych workloadów — nie używaj EFS do wszystkiego.\n\n• FSx for Windows File Server — SMB, Active Directory integration, DFS Namespaces. Dla aplikacji Windows, SharePoint, SQL Server backup.\n• FSx for Lustre — High Performance Computing. Równoległy distributed filesystem, throughput do 1 TB/s. Bezpośrednia integracja z S3 (lazy load → tylko pobiera pliki gdy potrzebne). Dla ML training, genomics, seismic analysis, CFD.\n• FSx for NetApp ONTAP — pełne NetApp features w chmurze. Multi-protocol (NFS, SMB, iSCSI). Snapshots, replication, deduplication. Lift-and-shift aplikacji NetApp.\n• FSx for OpenZFS — ZFS filesystem. Snapshots, klony, szyfrowanie. Dla developerów znających ZFS na Linux.',
        when: 'Windows apps wymagające SMB (FSx Windows), ML training z danymi w S3 (FSx Lustre), migracja workloadów NetApp (FSx ONTAP), ZFS na Linux (FSx OpenZFS)',
        code: `# FSx for Lustre — ML training z danymi w S3
aws fsx create-file-system \
  --file-system-type LUSTRE \
  --storage-capacity 1200 \
  --lustre-configuration '{
    "ImportPath": "s3://ml-datasets/imagenet/",
    "ExportPath": "s3://ml-results/",
    "AutoImportPolicy": "NEW_CHANGED_DELETED",
    "DeploymentType": "SCRATCH_2",
    "PerUnitStorageThroughput": 200
  }' \
  --subnet-ids subnet-xxx

# Na instancji EC2/p3 (GPU) zamontuj Lustre
amazon-linux-extras install lustre
mount -t lustre fs-xxx.fsx.eu-west-1.amazonaws.com@tcp:/fsx /mnt/fsx
# Teraz /mnt/fsx zawiera dane z S3 — lazy load przy pierwszym dostępie

# FSx for Windows File Server — AD integration
aws fsx create-file-system \
  --file-system-type WINDOWS \
  --storage-capacity 300 \
  --windows-configuration '{
    "ActiveDirectoryId": "d-xxx",
    "ThroughputCapacity": 64,
    "DeploymentType": "MULTI_AZ_1",
    "PreferredSubnetId": "subnet-xxx",
    "StandbySubnetId": "subnet-yyy"
  }' \
  --subnet-ids subnet-xxx subnet-yyy`
      },
      {
        name: 'AWS Backup — Centralne Zarządzanie Backupami',
        desc: 'Jeden serwis do zarządzania backupami wszystkich zasobów AWS. Policies, schedules, retention, cross-region, cross-account — z jednego miejsca zamiast konfigurowania backupów per-serwis.\n\nObsługuje: EBS, RDS (wszystkie silniki), Aurora, DynamoDB, EFS, FSx, EC2 (AMI), Storage Gateway, DocumentDB, Neptune, S3, VMware on-premises.\n\nKluczowe koncepcje:\n• Backup Plan — polityka: kiedy (cron), jak długo trzymać, do których vaultów\n• Backup Vault — kontener na recovery points. Vault Lock (WORM) = nieusuwalne przez X dni nawet przez root!\n• Recovery Points — poszczególne punkty przywrócenia\n• Cross-Region Backup — automatyczna kopia do innego regionu\n• Cross-Account Backup — kopia do izolowanego "backup account" (najlepsza praktyka dla ransomware protection)\n\nCompliance: GDPR, HIPAA, PCI-DSS wymagają backupów. AWS Backup generuje raporty zgodności.',
        when: 'Enterprise backup strategy, compliance (GDPR/HIPAA), ransomware protection (cross-account vault), DR, centralne zarządzanie politykami backupu dla wielu kont AWS',
        code: `# Backup Plan — codziennie o 2 AM, trzymaj 35 dni, kopia do drugiego regionu
aws backup create-backup-plan --backup-plan '{
  "BackupPlanName": "prod-backup-plan",
  "Rules": [
    {
      "RuleName": "DailyBackup",
      "TargetBackupVaultName": "prod-vault",
      "ScheduleExpression": "cron(0 2 * * ? *)",
      "StartWindowMinutes": 60,
      "CompletionWindowMinutes": 120,
      "Lifecycle": {
        "MoveToColdStorageAfterDays": 30,
        "DeleteAfterDays": 365
      },
      "CopyActions": [{
        "DestinationBackupVaultArn": "arn:aws:backup:us-east-1:123:backup-vault:dr-vault",
        "Lifecycle": {"DeleteAfterDays": 90}
      }]
    },
    {
      "RuleName": "MonthlyBackup",
      "TargetBackupVaultName": "prod-vault",
      "ScheduleExpression": "cron(0 3 1 * ? *)",
      "Lifecycle": {"DeleteAfterDays": 2555}
    }
  ]
}'

# Vault Lock — WORM (Write Once Read Many)
aws backup put-backup-vault-lock-configuration \
  --backup-vault-name prod-vault \
  --min-retention-days 7 \
  --max-retention-days 365
  # Nawet root nie może usunąć recovery points przez 7-365 dni
  # Idealne: protection przed ransomware i złośliwymi administratorami`
      },
      {
        name: 'Amazon Timestream — Baza Danych Szeregów Czasowych',
        desc: 'Serverless time-series database zoptymalizowana dla danych z timestampem. 1000x szybsza od relacyjnych baz do time-series queries.\n\nArchitektura dwuwarstwowa:\n• Memory Store — ostatnie dane (hot data), dane "hot" trzymane w RAM, bardzo szybki zapis (milisekundy)\n• Magnetic Store — dane historyczne (cold data), tani S3-backed storage\n• Automatyczna tiering: po N dniach dane przenoszą się do Magnetic Store\n\nKluczowe cechy:\n• Wbudowane funkcje time-series: interpolate, smoothing, moving average, percentile, anomaly detection\n• SQL-like query language z time-series extensions\n• Scheduled Queries — precomputed aggregates (redukuje koszty)\n• AWS IoT Core, Kinesis Data Streams → Timestream (natywna integracja)\n• Grafana datasource out-of-the-box\n\nCena: $0.036/GB (memory) + $0.03/GB (magnetic) + $0.01/1M queries',
        when: 'IoT sensor data (temperatury, ciśnienia, GPS), application metrics (CPU/RAM per sekunda), financial ticks (ceny akcji), infrastructure monitoring, clickstream analysis',
        code: `import boto3

timestream = boto3.client('timestream-write', region_name='eu-west-1')

# Wstaw dane IoT (batch — do 100 rekordów)
timestream.write_records(
    DatabaseName='iot-data',
    TableName='sensors',
    CommonAttributes={
        'Dimensions': [
            {'Name': 'factory', 'Value': 'warszawa-1'},
            {'Name': 'machine_id', 'Value': 'cnc-042'}
        ],
        'Time': str(int(time.time() * 1000)),
        'TimeUnit': 'MILLISECONDS'
    },
    Records=[
        {'MeasureName': 'temperature',   'MeasureValue': '72.5',  'MeasureValueType': 'DOUBLE'},
        {'MeasureName': 'vibration',      'MeasureValue': '0.023', 'MeasureValueType': 'DOUBLE'},
        {'MeasureName': 'rpm',            'MeasureValue': '1450',  'MeasureValueType': 'BIGINT'},
        {'MeasureName': 'error_code',     'MeasureValue': '0',     'MeasureValueType': 'BIGINT'},
    ]
)

# Query — average temperature z ostatnich 24h per maszyna
query_client = boto3.client('timestream-query', region_name='eu-west-1')
result = query_client.query(QueryString="""
    SELECT machine_id,
           AVG(measure_value::double) as avg_temp,
           MAX(measure_value::double) as max_temp,
           BIN(time, 1h) as hour_bucket
    FROM "iot-data"."sensors"
    WHERE measure_name = 'temperature'
      AND time >= ago(24h)
    GROUP BY machine_id, BIN(time, 1h)
    HAVING AVG(measure_value::double) > 70
    ORDER BY hour_bucket DESC
""")`
      },
      {
        name: 'Amazon MemoryDB for Redis — Durable In-Memory',
        desc: 'Redis-kompatybilna baza danych w pełni trwała (persystentna, nie tylko cache). MemoryDB zachowuje dane nawet po restart/failover — w przeciwieństwie do ElastiCache Redis gdzie dane są w pamięci.\n\n• Multi-AZ transaction log — każdy zapis jest potwierdzony przez quorum w wielu AZ zanim zwróci ACK\n• Micro-second reads, single-digit millisecond writes\n• Redis 6.2/7.0 kompatybilny — te same komendy, te same data structures\n• Snapshots do S3, point-in-time recovery\n\nElastiCache Redis vs MemoryDB:\n• ElastiCache: cache layer (TTL, eviction, OK gdy dane giną). Tańszy.\n• MemoryDB: primary database. Dane nigdy nie giną. Droższy (3x).\n\nKiedy MemoryDB: Redis jako główna baza (nie tylko cache), potrzebujesz durability i Redis API, gaming leaderboards jako primary store, session DB które NIGDY nie może stracić danych.',
        when: 'Redis jako primary database (nie cache), gaming leaderboards, session storage z gwarancją trwałości, real-time analytics przechowywane w Redis, aplikacje wymagające Redis + durability',
        code: `import redis

# Połączenie — identyczne jak ElastiCache Redis
r = redis.Redis(
    host='clustercfg.moj-klaster.xxx.memorydb.eu-west-1.amazonaws.com',
    port=6379, ssl=True, decode_responses=True
)

# MemoryDB obsługuje cały Redis API — Sorted Sets, Streams, Hashes itp.

# Gaming Leaderboard (Sorted Set) — trwały, nie wyparuje po restart!
r.zadd('global-leaderboard', {'player:alice': 15420, 'player:bob': 12890})
top10 = r.zrevrange('global-leaderboard', 0, 9, withscores=True)

# Redis Streams — event log z gwarancją durability
r.xadd('orders-stream', {
    'orderId': 'ord-789',
    'userId': 'user-123',
    'total': '199.99',
    'status': 'created'
})
# Consumer Group — równoległy processing z at-least-once delivery
r.xgroup_create('orders-stream', 'payment-workers', id='0', mkstream=True)
messages = r.xreadgroup('payment-workers', 'worker-1', {'orders-stream': '>'}, count=10)

# Hash — user session (nigdy nie wygasa bez TTL!)
r.hset('session:abc123', mapping={'userId': 'user-1', 'role': 'admin', 'loginAt': str(time.time())})`
      },
      {
        name: 'AWS DataSync — Transfer Danych',
        desc: 'Managed service do transferu danych między on-premises a AWS, między serwisami AWS lub między chmurami.\n\nŹródła i cele:\n• On-premises → AWS: NFS, SMB, HDFS, object storage\n• AWS → AWS: S3 ↔ S3 (inne regiony/konta), EFS ↔ EFS, FSx\n• Other clouds → AWS: Google Cloud Storage, Azure Blob, Wasabi\n\nCechy:\n• Automatyczna weryfikacja integralności (checksums)\n• Filtrowanie: include/exclude patterns\n• Scheduling: jednorazowo lub cyklicznie\n• Bandwidth throttling — nie blokuj produkcji\n• Szyfrowanie w transit (TLS) i at-rest\n• CloudWatch logi i metryki\n\nCena: $0.0125/GB transferowanych danych\n\nDataSync vs Snow Family:\n• DataSync: masz dobre łącze, < 100TB, cykliczne transfery\n• Snow: słabe łącze, > 100TB, jednorazowa migracja',
        when: 'Migracja NAS/NFS do S3/EFS, cykliczne backupy on-premises do AWS, replikacja S3 między kontami/regionami, transfer między EFS filesystemami, migracja z GCS/Azure do S3',
        code: `# Task = konfiguracja transferu (source → destination)
aws datasync create-task \
  --source-location-arn arn:aws:datasync:eu-west-1:123:location/LOC-xxx \
  --destination-location-arn arn:aws:datasync:eu-west-1:123:location/LOC-yyy \
  --name "daily-backup-sync" \
  --options '{
    "VerifyMode": "ONLY_FILES_TRANSFERRED",
    "OverwriteMode": "ALWAYS",
    "PreserveDeletedFiles": "PRESERVE",
    "LogLevel": "TRANSFER"
  }' \
  --schedule '{"ScheduleExpression": "cron(0 2 * * ? *)"}' \
  --cloud-watch-log-group-arn arn:aws:logs:...:log-group:datasync-logs

# Utwórz Location dla NFS on-premises
aws datasync create-location-nfs \
  --server-hostname 192.168.1.50 \
  --subdirectory /backup \
  --on-prem-config '{"AgentArns": ["arn:aws:datasync:...:agent/agent-xxx"]}'

# Agent DataSync: VM zainstalowana w Twoim DC
# Komunikuje się z DataSync service przez port 443 (HTTPS)

# Uruchom task jednorazowo
aws datasync start-task-execution --task-arn arn:aws:datasync:...:task/task-xxx

# Sprawdź status i statystyki
aws datasync describe-task-execution \
  --task-execution-arn arn:... \
  --query "[Status,Result.TransferredFiles,Result.BytesTransferred]"`
      },
      {
        name: 'Amazon QLDB — Quantum Ledger Database',
        desc: 'Transparentny, niezmienny dziennik transakcji — każda zmiana jest kryptograficznie weryfikowalna. Nikt nie może potajemnie zmienić historii.\n\n• Immutable journal — append-only, żadna zmiana nie może być usunięta bez pozostawienia śladu\n• Kryptograficzna weryfikacja (SHA-256 digest) — możesz udowodnić że rekord NIE był zmieniany\n• Serverless — nie zarządzasz infrastrukturą\n• PartiQL — SQL-like query language\n\nKiedy QLDB vs Blockchain:\n• QLDB = centralized, Amazon jest trusted party, super proste\n• Blockchain (Amazon Managed Blockchain) = decentralized, wiele niezależnych stron, skomplikowany\n\nTypowe zastosowania:\n• Finanse: historia transakcji bankowych, audit trail transferów pieniędzy\n• Supply chain: historia każdego kroku towaru od producenta do klienta\n• Systemy tożsamości: historia zmian uprawnień i dostępów\n• Compliance: nienaruszalny audit log dla regulatorów',
        when: 'Fintech (historia transakcji), healthcare (audit log dostępu do danych pacjenta), supply chain (nienaruszalny łańcuch dostaw), compliance (zapis działań w systemie który audytorzy muszą zweryfikować)',
        code: `from pyqldb.driver.qldb_driver import QldbDriver

driver = QldbDriver(ledger_name='fintech-ledger')

# Wstaw transakcję
def insert_transaction(driver, transaction_data):
    def executor(transaction_executor):
        transaction_executor.execute_statement(
            "INSERT INTO Transactions VALUE ?",
            transaction_data
        )
    driver.execute_lambda(executor)

insert_transaction(driver, {
    'transactionId': 'TXN-001',
    'from_account': 'ACC-123',
    'to_account': 'ACC-456',
    'amount': 1500.00,
    'currency': 'PLN',
    'timestamp': '2024-01-15T10:30:00Z',
    'type': 'TRANSFER'
})

# Sprawdź historię rekordu (kto co zmienił)
def get_history(driver, doc_id):
    def executor(transaction_executor):
        return list(transaction_executor.execute_statement(
            "SELECT * FROM history(Transactions) AS h WHERE h.metadata.id = ?",
            doc_id
        ))
    return driver.execute_lambda(executor)

# Weryfikacja kryptograficzna
# Digest = SHA-256 hash całego journal
# Możesz udowodnić że rekord istniał i nie był zmieniony MIĘDZY dwoma digestami
aws qldb get-digest --name fintech-ledger`
      },
      {
        name: 'AWS Transfer Family — Managed SFTP/FTP/FTPS',
        desc: 'Managed file transfer service — SFTP, FTPS, FTP i AS2 bezposrednio do/z S3 lub EFS. Zero serwerow do zarzadzania, zero patchy, high availability w wielu AZ.\n\nProtokoly:\n• SFTP — SSH File Transfer Protocol (port 22). Najbardziej popularny.\n• FTPS — FTP over TLS (port 21). Legacy enterprise.\n• FTP — nieszyfrowany (tylko dla izolowanych sieci prywatnych).\n• AS2 — Applicability Statement 2, EDI dla B2B.\n\nGlowne koncepcje:\n• Server — endpoint SFTP/FTP. Jeden endpoint = jeden protokol.\n• User — konto z SSH key lub haslem. Kazdy user ma swoj "home directory" w S3.\n• Home directory — S3 prefix lub bucket. Ukrywasz strukture S3 przez logical home dirs.\n• Workflow — automatyczne akcje po transferze (Lambda, move, copy, decrypt).\n\nKiedy uzywac:\n• Partnerzy B2B przesylajacy pliki przez SFTP (zamowienia, faktury)\n• Systemy legacy wymagajace FTP/SFTP jako protokolu\n• Migracja z FTP serwera on-premises do cloud\n• Compliance: audit trail transferow (CloudWatch + S3 access logs)\n\nCena: $0.30/h per enabled protocol endpoint + $0.04/GB uploaded + $0.04/GB downloaded',
        when: 'Partnerzy B2B wymagajacy SFTP, migracja FTP serwerow do cloud, systemy legacy potrzebujace file transfer, EDI/AS2 dla retail/healthcare',
        code: `# Utworz Transfer Family Server (SFTP)
aws transfer create-server \
  --protocols SFTP \
  --identity-provider-type SERVICE_MANAGED \
  --endpoint-type PUBLIC \
  --logging-role arn:aws:iam::123:role/TransferLoggingRole

# Utworz uzytkownika z SSH key i home directory w S3
aws transfer create-user \
  --server-id s-xxx \
  --user-name sftp-partner \
  --role arn:aws:iam::123:role/SFTPUserRole \
  --home-directory-type LOGICAL \
  --home-directory-mappings '[{"Entry":"/","Target":"/moj-bucket/partners/partner-abc"}]' \
  --ssh-public-key-body "ssh-rsa AAAAB3NzaC1yc2EAAA..."

# Polityka IAM dla SFTP user (dostep tylko do swojego folderu)
# s3:PutObject, GetObject, DeleteObject na moj-bucket/partners/partner-abc/*
# s3:ListBucket z condition StringLike s3:prefix: partners/partner-abc/*

# Workflow — automatycznie uruchom Lambda po kazdym transferze
aws transfer create-workflow \
  --steps '[
    {"Type":"CUSTOM","CustomStepDetails":{"Name":"ProcessFile","Target":"arn:aws:lambda:...:process-sftp-upload","TimeoutSeconds":60}},
    {"Type":"MOVE","MoveStepDetails":{"Name":"Archive","DestinationFileLocation":{"S3FileLocation":{"Bucket":"archive-bucket","Key":"processed/"}}}}
  ]'`
      },
      {
        name: 'Amazon MQ — Managed Message Broker',
        desc: 'Managed message broker service — RabbitMQ i Apache ActiveMQ w chmurze. Lift-and-shift istniejacych aplikacji uzywajacych AMQP, MQTT, OpenWire, STOMP, bez przepisywania kodu.\n\nDwa silniki:\n• ActiveMQ — Java-based, dojrzaly. Protokoly: OpenWire (Java/JMS), AMQP 1.0, MQTT, STOMP, WebSocket.\n• RabbitMQ — Erlang-based, lekki, popularny. Protokol: AMQP 0-9-1, MQTT, STOMP.\n\nKiedy Amazon MQ vs SQS/SNS:\n• SQS/SNS — nowe aplikacje cloud-native, prostsze, tansze, skaluje sie bez limitu\n• Amazon MQ — migracja existing aplikacji uzywajacych JMS/AMQP, protokolarna zgodnosc wymagana\n\nKonfiguracja:\n• Single-instance broker — dev/test, tanszy\n• Active/Standby broker — produkcja, automatic failover do standby w <30s\n• Siec brokerow — multiple brokers w mesh (ActiveMQ)\n\nBezpieczenstwo:\n• Broker w VPC — niedostepny publicznie\n• TLS — szyfrowanie w transit\n• Username/password lub LDAP\n\nCena: mq.m5.large Active/Standby = ok $0.576/h per broker (~$413/mies)',
        when: 'Migracja on-premises aplikacji JMS/AMQP/MQTT do cloud, systemy legacy Java EE wymagajace JMS, IoT z MQTT, integracje B2B wymagajace standardowych protokolow message broker',
        code: `# Utworz RabbitMQ broker (Active/Standby)
aws mq create-broker \
  --broker-name prod-rabbitmq \
  --engine-type RABBITMQ \
  --engine-version 3.13 \
  --deployment-mode ACTIVE_STANDBY_MULTI_AZ \
  --host-instance-type mq.m5.large \
  --publicly-accessible false \
  --subnet-ids subnet-1a subnet-1b \
  --security-groups sg-xxx \
  --users '[{"Username":"admin","Password":"SecureP@ss1","Groups":["administrators"]}]' \
  --logs '{"General":true}'

# Endpoint po created:
# amqps://b-xxx.mq.eu-west-1.amazonaws.com:5671

# RabbitMQ Python (pika)
import pika, ssl

ssl_context = ssl.create_default_context()
credentials = pika.PlainCredentials('admin', 'SecureP@ss1')
params = pika.ConnectionParameters(
    host='b-xxx.mq.eu-west-1.amazonaws.com',
    port=5671,
    credentials=credentials,
    ssl_options=pika.SSLOptions(ssl_context)
)
connection = pika.BlockingConnection(params)
channel = connection.channel()
channel.queue_declare(queue='orders', durable=True)

# Publisher
channel.basic_publish(
    exchange='', routing_key='orders',
    body='{"orderId":"123","total":199.99}',
    properties=pika.BasicProperties(delivery_mode=2)
)

# Consumer
def callback(ch, method, properties, body):
    print(f"Order: {body.decode()}")
    ch.basic_ack(delivery_tag=method.delivery_tag)

channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='orders', on_message_callback=callback)
channel.start_consuming()`
      },
      {
        name: 'Amazon Keyspaces — Managed Apache Cassandra',
        desc: 'W pelni zarzadzany, serverless Cassandra-compatible database. Nie zarzadzasz wezlami, partycjami, replikacja — AWS to robi.\n\nCassandra idealny dla:\n• Write-heavy workloads (miliony writes/s)\n• Time-series data (IoT, metryki, logi zdarzen)\n• Dane z naturalnym partitionem (user_id, device_id)\n• Aplikacje wymagajace geo-redundancy\n\nZgodnosc:\n• CQL (Cassandra Query Language) — kompatybilny z Cassandra 3.11+\n• Cassandra drivers dzialaja bez modyfikacji kodu\n\nRoznice vs self-managed Cassandra:\n• Serverless — automatyczne skalowanie, brak wezlow do zarzadzania\n• 99.99% SLA — trzy repliki w roznych AZ\n• Backup automatyczny — point-in-time recovery do 35 dni\n• Encryption at-rest (KMS) i in-transit (TLS)\n• IAM authentication — zamiast Cassandra native auth\n\nKiedy Keyspaces vs DynamoDB:\n• Masz istniejacy kod Cassandra/CQL → Keyspaces (lift-and-shift)\n• Nowa aplikacja → DynamoDB (lepiej zintegrowany z AWS, tanszy dla malych workloadow)',
        when: 'Lift-and-shift istniejacych aplikacji Cassandra, time-series IoT data, write-heavy workloads (telemetria, logi uzytkownika), aplikacje z geograficzna dystrybucja danych',
        code: `# Keyspaces uzywa CQL — identycznie jak Cassandra
from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider
import ssl

ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)
ssl_context.load_verify_locations('./sf-class2-root.crt')
auth_provider = PlainTextAuthProvider(
    username='my-iam-user',
    password='my-service-specific-password'
)
cluster = Cluster(
    ['cassandra.eu-west-1.amazonaws.com'],
    ssl_context=ssl_context,
    auth_provider=auth_provider,
    port=9142
)
session = cluster.connect()

# Utworz keyspace
session.execute(
    "CREATE KEYSPACE IF NOT EXISTS iot_data WITH replication = {'class': 'SingleRegionStrategy'}"
)

# Tabela time-series z TTL 90 dni
session.execute(
    """CREATE TABLE IF NOT EXISTS iot_data.sensor_readings (
        device_id text,
        timestamp timestamp,
        temperature double,
        humidity double,
        PRIMARY KEY (device_id, timestamp)
    ) WITH CLUSTERING ORDER BY (timestamp DESC)
    AND default_time_to_live = 7776000"""
)

# Insert
from datetime import datetime
prepared = session.prepare(
    "INSERT INTO iot_data.sensor_readings (device_id, timestamp, temperature, humidity) VALUES (?, ?, ?, ?)"
)
session.execute(prepared, ('device-001', datetime.now(), 22.5, 65.0))

# Query ostatnich 100 odczytow
rows = session.execute(
    "SELECT * FROM iot_data.sensor_readings WHERE device_id = 'device-001' LIMIT 100"
)`
      },
      {
        name: 'Amazon SES — Simple Email Service',
        desc: 'Managed email sending i receiving. Wysylaj transakcyjne emaile (potwierdzenia zamowien, reset hasla, faktury) i marketingowe z wysoka dostarczalnoscia.\n\nDwa tryby:\n• Wysylanie — SMTP endpoint lub API (boto3). Tanie: $0.10 per 1000 emaili.\n• Odbieranie — SES odbiera emaile na Twoja domene i przekazuje do Lambda/S3.\n\nKluczowe koncepcje:\n• Verified Identity — zweryfikuj domene (DNS TXT record) lub email\n• DKIM — DomainKeys Identified Mail. SES generuje klucze automatycznie.\n• SPF — Sender Policy Framework. Dodaj SES do DNS.\n• DMARC — polityka co z mailami bez SPF/DKIM.\n• Suppression list — automatycznie NIE wysylaj do adresow ktore zbouncoWaly lub oznaczyly jako spam.\n• Configuration Sets — loguj do CloudWatch/Kinesis (bounces, complaints, opens, clicks).\n\nSandbox vs Production:\n• Sandbox — mozesz wysylac tylko do zweryfikowanych emaili. Sandbox removal = wniosek przez Support.\n\nCena: $0.10 per 1000 emaili (via API), $0.11 per 1000 emaili (via SMTP)',
        when: 'Transakcyjne emaile (reset hasla, potwierdzenia zamowien), bulk marketing emaile, email receiving (support inbox, inbound routing), wysoka dostarczalnosc i monitoring bounce/complaint rates',
        code: `# === Wysylanie przez boto3 (API) ===
import boto3
from botocore.exceptions import ClientError

ses = boto3.client('ses', region_name='eu-west-1')

try:
    response = ses.send_email(
        Source='noreply@twoja-domena.pl',
        Destination={'ToAddresses': ['jan.kowalski@example.com']},
        Message={
            'Subject': {'Data': 'Potwierdzenie zamowienia #12345'},
            'Body': {
                'Html': {'Data': '<h1>Dziekujemy!</h1><p>Zamowienie #12345 przyjete. Kwota: 199,99 PLN</p>'},
                'Text': {'Data': 'Dziekujemy! Zamowienie #12345 przyjete. Kwota: 199,99 PLN'}
            }
        },
        ConfigurationSetName='transactional-emails'
    )
    print(f"Email ID: {response['MessageId']}")
except ClientError as e:
    print(f"Blad: {e.response['Error']['Message']}")

# === Email Receiving — MX record → inbound-smtp.eu-west-1.amazonaws.com ===
aws ses create-receipt-rule \
  --rule-set-name default-rule-set \
  --rule '{
    "Name": "forward-to-lambda",
    "Enabled": true,
    "Recipients": ["support@twoja-domena.pl"],
    "Actions": [
      {"LambdaAction": {"FunctionArn": "arn:aws:lambda:...:process-email", "InvocationType": "Event"}},
      {"S3Action": {"BucketName": "email-archive", "ObjectKeyPrefix": "inbound/"}}
    ]
  }'

# Lambda handler — parsuj przychodzacy email
def handler(event, context):
    message = event['Records'][0]['ses']['mail']
    subject = message['commonHeaders']['subject']
    from_addr = message['commonHeaders']['from'][0]
    print(f"Email od: {from_addr}, temat: {subject}")

# === SMTP (dla legacy apps) ===
import smtplib
from email.mime.text import MIMEText
msg = MIMEText('Tresc emaila')
msg['Subject'] = 'Temat'
msg['From'] = 'noreply@twoja-domena.pl'
msg['To'] = 'odbiorca@example.com'
with smtplib.SMTP_SSL('email-smtp.eu-west-1.amazonaws.com', 465) as smtp:
    smtp.login('SMTP_USER_FROM_IAM', 'SMTP_PASSWORD')
    smtp.send_message(msg)`
      },
    ],

    routing: _advanced.routing,
    state:   _advanced.state,
    rywale:  _ref.rywale,
    pluginy: _ref.pluginy,
    komendy: _komendy,
  },
};
