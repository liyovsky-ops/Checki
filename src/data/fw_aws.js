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
    ],

    routing: _advanced.routing,
    state:   _advanced.state,
    rywale:  _ref.rywale,
    pluginy: _ref.pluginy,
    komendy: _komendy,
  },
};
