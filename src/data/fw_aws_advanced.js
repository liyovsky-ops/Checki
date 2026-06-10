export default {

// ── Networking ────────────────────────────────────────────────────────────────

routing: {
  title: 'Networking — VPC, DNS, CDN, Load Balancery, API Gateway',
  items: [
    {
      name: 'VPC — Virtual Private Cloud',
      desc: 'Twoja własna, izolowana sieć w chmurze AWS. Każde konto dostaje domyślny VPC, ale w produkcji zawsze twórz własny. VPC = fundament bezpieczeństwa sieciowego.\n\n• Subnets public (z Internet Gateway) — dla Load Balancerów, NAT Gateway, bastion hostów\n• Subnets private — dla EC2, RDS, ECS; nie mają bezpośredniego dostępu do internetu\n• Internet Gateway (IGW) — brama do internetu dla subnets public\n• NAT Gateway — pozwala instancjom w private subnet wychodzić do internetu (update pakietów, call API), ale nie pozwala na wejście z zewnątrz. Kosztuje ~$32/mies + transfer\n• Route Tables — tablica routingu: co idzie gdzie. Public subnet: 0.0.0.0/0 → IGW. Private: 0.0.0.0/0 → NAT Gateway\n• Security Groups — stateful firewall na poziomie instancji (EC2, RDS, Lambda w VPC). Białe listy — domyślnie blokujesz wszystko\n• Network ACLs (NACLs) — stateless firewall na poziomie subnetu. Rzadziej używane, bardziej granularne\n• VPC Peering — bezpośrednie połączenie między dwoma VPC (nietranzytywne: A↔B, B↔C nie daje A↔C)\n• Transit Gateway — centralny hub do połączenia wielu VPC i on-premises. Tranzytywny. Płacisz za attachment i transfer\n• VPC Endpoints — prywatne połączenie do serwisów AWS bez wychodzenia do internetu:\n  - Gateway Endpoints: S3, DynamoDB (FREE)\n  - Interface Endpoints: Lambda, SQS, SNS, ECR i 100+ innych (~$7/mies + transfer)\n• Flow Logs — logi ruchu sieciowego (kto, skąd, dokąd, port, protokół, akceptowane/odrzucane) do CloudWatch lub S3',
      code: `# Schemat typowego VPC produkcyjnego (eu-west-1)
VPC: 10.0.0.0/16 (65536 adresów IP)

Public Subnets:
  10.0.1.0/24  — eu-west-1a  (ALB, NAT Gateway, Bastion)
  10.0.2.0/24  — eu-west-1b
  10.0.3.0/24  — eu-west-1c

Private Subnets:
  10.0.11.0/24 — eu-west-1a  (EC2, ECS, Lambda)
  10.0.12.0/24 — eu-west-1b
  10.0.13.0/24 — eu-west-1c

Data Subnets:
  10.0.21.0/24 — eu-west-1a  (RDS, ElastiCache)
  10.0.22.0/24 — eu-west-1b

# Security Group dla API (port 443 z ALB)
aws ec2 create-security-group --group-name api-sg --description "API servers" --vpc-id vpc-xxx
aws ec2 authorize-security-group-ingress --group-id sg-api --protocol tcp --port 8000 --source-group sg-alb`,
      lang: 'bash'
    },
    {
      name: 'Route 53 — DNS i Routing',
      desc: 'Managed DNS service. 100% SLA uptime. Obsługuje public hosted zones (publiczny DNS), private hosted zones (DNS wewnątrz VPC) i health checks.\n\n• Routing policies:\n  - Simple — jeden rekord, jeden cel. Podstawowy.\n  - Weighted — 80% na prod, 20% na nową wersję (A/B testing, canary deploy)\n  - Latency-based — użytkownik trafia do regionu z najniższym latency\n  - Geolocation — Polacy → eu-west-1, Niemcy → eu-central-1\n  - Geoproximity — jak geolocation ale z bias (możesz rozszerzać/zawężać region)\n  - Failover — Active/Passive: primary na EC2, secondary na S3 static page (DR)\n  - Multivalue answer — kilka IP, Route53 sprawdza health checks i zwraca tylko zdrowe\n\n• Health Checks — co 30 sekund (lub 10s = fast), HTTP/HTTPS/TCP, może pingować endpoint i sprawdzać response body. Używane w Failover routing.\n• Alias records — jak CNAME ale dla apex domeny (example.com, nie sub.example.com). Pointuje na: ALB, CloudFront, S3 website, inne Route53 records\n• Traffic Flow — visual editor do budowania złożonych routing policies. Policies można wersjonować.',
      code: `# Utwórz hosted zone
aws route53 create-hosted-zone --name example.com --caller-reference $(date +%s)

# Dodaj rekord A → ALB (Alias)
aws route53 change-resource-record-sets --hosted-zone-id Z123 --change-batch '{
  "Changes": [{
    "Action": "UPSERT",
    "ResourceRecordSet": {
      "Name": "api.example.com",
      "Type": "A",
      "AliasTarget": {
        "HostedZoneId": "Z3DZXE0Q79N41H",
        "DNSName": "my-alb-xxx.eu-west-1.elb.amazonaws.com",
        "EvaluateTargetHealth": true
      }
    }
  }]
}'

# Weighted routing — 90% stara wersja, 10% nowa
# RecordSet 1: Weight=90, SetIdentifier=v1, → ALB-v1
# RecordSet 2: Weight=10, SetIdentifier=v2, → ALB-v2`,
      lang: 'json'
    },
    {
      name: 'CloudFront — CDN z 450+ lokalizacjami',
      desc: 'Content Delivery Network. Cachuje content na edge locations (PoP) na całym świecie. Użytkownik pobiera z najbliższej lokalizacji zamiast z origin (S3, ALB, EC2).\n\n• Origin types: S3 bucket (statyczne strony), ALB/EC2 (dynamiczne API), Lambda Function URL, Custom HTTP origin\n• Cache Behaviors — różne ustawienia cache dla różnych ścieżek URL:\n  - /api/* — TTL=0, pass-through do ALB (bez cache)\n  - /static/* — TTL=365 dni, cache agresywnie\n  - /* — domyślne, TTL=24h\n• Origin Access Control (OAC) — CloudFront może pobierać z prywatnego S3 bez publicznego bucketu. Tylko CloudFront może czytać S3.\n• Lambda@Edge / CloudFront Functions — kod wykonywany na edge:\n  - Redirect HTTP→HTTPS\n  - Dodaj security headers (HSTS, CSP, X-Frame-Options)\n  - A/B testing przez cookie\n  - JWT autoryzacja na poziomie CDN\n• Signed URLs / Signed Cookies — dostęp do prywatnych treści (video streaming, płatny content)\n• Invalidation — wymuś odświeżenie cache (kosztuje po 1000 ścieżek/miesiąc)\n• Real-time logs → Kinesis Data Streams. Standard logs → S3.',
      code: `# Unieważnij cache CloudFront po deploy
aws cloudfront create-invalidation \
  --distribution-id EDFDVBD6EXAMPLE \
  --paths "/*"

# Tylko zmienione pliki (szybciej i taniej)
aws cloudfront create-invalidation \
  --distribution-id EDFDVBD6EXAMPLE \
  --paths "/index.html" "/static/main.js" "/api/*"

# Sprawdź status invalidation
aws cloudfront get-invalidation \
  --distribution-id EDFDVBD6EXAMPLE \
  --id I3UN6WX5RRO2AG

# Lista dystrybucji
aws cloudfront list-distributions \
  --query "DistributionList.Items[].[Id,DomainName,Comment,Status]" \
  --output table`,
      lang: 'bash'
    },
    {
      name: 'ALB / NLB — Load Balancery',
      desc: 'Dwa główne typy Load Balancerów na AWS:\n\n• ALB (Application Load Balancer) — warstwa 7 (HTTP/HTTPS/WebSocket/gRPC)\n  - Path-based routing: /api/* → ECS api-service, /admin/* → ECS admin-service\n  - Host-based routing: api.example.com → jedno target group, web.example.com → drugie\n  - Header-based routing, query string routing\n  - Sticky sessions (cookie-based)\n  - WebSocket support\n  - Integracja z WAF i Cognito (out-of-the-box auth)\n  - Access logs → S3 (wszystkie requesty z timestampem, IP, latency, status)\n\n• NLB (Network Load Balancer) — warstwa 4 (TCP/UDP/TLS)\n  - Ultra-niskie latency (<1ms), miliony request/s\n  - Static IP per AZ (ważne dla whitelistowania IP)\n  - Pass-through — widzi oryginalne IP klienta\n  - Gaming, IoT, finansowe systemy wymagające stałego IP\n\n• Target Groups — gdzie LB wysyła ruch: EC2 instances, ECS tasks (IP mode), Lambda functions, inne ALBs\n• Health Checks — ALB regularnie sprawdza endpoint (np. /health). Niezdrowe instancje → ruch nie trafia.\n• Listener Rules — priorytetyzowane reguły: match conditions → actions (forward, redirect, return fixed response)',
      code: `# Utwórz target group
aws elbv2 create-target-group \
  --name prod-api-tg \
  --protocol HTTP --port 8000 \
  --vpc-id vpc-xxx \
  --health-check-path /health \
  --health-check-interval-seconds 15 \
  --healthy-threshold-count 2 \
  --unhealthy-threshold-count 3

# Dodaj reguły routingu do ALB Listener (przykład YAML CloudFormation)
# ListenerRule:
#   Priority: 10
#   Conditions:
#     - Field: path-pattern
#       Values: ["/api/v2/*"]
#   Actions:
#     - Type: forward
#       TargetGroupArn: !Ref ApiV2TargetGroup

# Sprawdź health target group
aws elbv2 describe-target-health \
  --target-group-arn arn:aws:elasticloadbalancing:...`,
      lang: 'bash'
    },
    {
      name: 'API Gateway — REST, HTTP i WebSocket API',
      desc: 'Managed service do tworzenia, publikowania i monitorowania API. Trzy typy:\n\n• REST API — pełne możliwości: request/response transformation, validation, API keys, usage plans, mock integrations. Droższy i wolniejszy. Legacy cases.\n• HTTP API — prostszy, tańszy (70% taniej), szybszy. Lambda proxy, JWT autoryzacja, CORS. Wybierz w 90% nowych projektów.\n• WebSocket API — dwukierunkowa komunikacja, chat apps, real-time dashboards\n\n• Integracje: Lambda (proxy), HTTP endpoint (ALB, zewnętrzny URL), AWS Service (SQS, DynamoDB bezpośrednio), Mock\n• Lambda Proxy Integration — cały request (method, headers, body, querystring, pathParams) jako event do Lambda. Response: {statusCode, headers, body}.\n• Authorizers:\n  - Lambda Authorizer — custom logika (np. JWT validation). Może cachować przez TTL.\n  - Cognito Authorizer — walidacja JWT z User Pool automatycznie\n  - IAM Auth — dla serwisów AWS (SigV4)\n• Stages — dev, staging, prod. Każdy stage ma własny URL i zmienne.\n• Throttling — Rate limiting: burst limit + steady rate (requests/second). Zapobiega DDoS.\n• Caching — do 3600s cache per endpoint (REST API). Redukuje wywołania Lambda.\n• Custom Domain — api.example.com zamiast xxxxxx.execute-api.eu-west-1.amazonaws.com',
      code: `# Lambda handler dla API Gateway HTTP Proxy
import json

def handler(event, context):
    # event zawiera: httpMethod, path, headers,
    # queryStringParameters, body, pathParameters
    body = json.loads(event.get('body') or '{}')
    user_id = event['pathParameters']['userId']

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'userId': user_id,
            'data': 'response'
        })
    }

# Eksport API URL po deploy przez CDK
# const api = new apigateway.HttpApi(this, 'Api', {
#   corsPreflight: { allowOrigins: ['*'], allowMethods: [CorsHttpMethod.ANY] }
# });
# new CfnOutput(this, 'ApiUrl', { value: api.url! });`,
      lang: 'python'
    },
    {
      name: 'Direct Connect & VPN Gateway',
      desc: 'Połączenia między on-premises a AWS poza publicznym internetem:\n\n• AWS Direct Connect — dedykowane, fizyczne połączenie sieciowe do AWS\n  - Prędkości: 1 Gbps, 10 Gbps, 100 Gbps (lub sub-1G przez partnerów)\n  - Niższy latency, stable bandwidth, tańszy transfer danych niż przez internet\n  - SLA, dedykowane połączenie fizyczne (nie przez internet)\n  - Czas setup: tygodnie do miesięcy\n  - Dla enterprise: banki, healthcare, duże dane\n  - Direct Connect Gateway — jeden DX połączony z wieloma VPC\n\n• AWS Site-to-Site VPN — VPN tunel przez internet (IPSec)\n  - Setup w minuty\n  - Fallback dla Direct Connect\n  - Do 1.25 Gbps throughput per tunel\n  - Virtual Private Gateway (VGW) po stronie AWS\n  - Customer Gateway — Twoje urządzenie/router\n\n• AWS Client VPN — VPN dla pojedynczych pracowników (OpenVPN)\n  - Pracownicy łączą się z VPN i mają dostęp do zasobów w VPC private subnets\n  - Cognito lub Active Directory dla autoryzacji',
      code: `# Site-to-Site VPN — szybki setup
# 1. Utwórz Virtual Private Gateway
aws ec2 create-vpn-gateway --type ipsec.1

# 2. Attach do VPC
aws ec2 attach-vpn-gateway \
  --vpn-gateway-id vgw-xxx \
  --vpc-id vpc-xxx

# 3. Utwórz Customer Gateway (Twój router)
aws ec2 create-customer-gateway \
  --type ipsec.1 \
  --public-ip 1.2.3.4 \
  --bgp-asn 65000

# 4. Utwórz VPN Connection
aws ec2 create-vpn-connection \
  --type ipsec.1 \
  --customer-gateway-id cgw-xxx \
  --vpn-gateway-id vgw-xxx

# Pobierz konfigurację dla routera
aws ec2 describe-vpn-connections \
  --vpn-connection-ids vpn-xxx`,
      lang: 'bash'
    },
    {
      name: 'Global Accelerator',
      desc: 'Serwis który routuje ruch przez globalną backbone sieć AWS (nie publiczny internet) do Twoich endpointów.\n\n• Użytkownik → najbliższy AWS edge location → backbone AWS → Twój ALB/EC2/NLB\n• Zamiast: Użytkownik → internet (wiele hopów) → Twój serwis\n\n• 2 statyczne Anycast IP (globalnie stałe) — nie zmieniają się przy failover\n• Automatyczny failover między regionami (sub-minutowy)\n• Traffic dials — przenieś % ruchu między endpointami (canary deploy między regionami)\n• Health checks — usuwa niezdrowe endpointy automatycznie\n\nKiedy używać:\n• Aplikacje wymagające niskiego latency globalnie (gaming, live streaming)\n• Failover między regionami AWS\n• Potrzebujesz stałego IP dla whitelistowania (VPN, firewall)\n• Aplikacje non-HTTP (TCP/UDP) — tu CloudFront nie działa',
      code: `# Utwórz Global Accelerator
aws globalaccelerator create-accelerator \
  --name prod-accelerator \
  --ip-address-type IPV4

# Dodaj listener (TCP 443)
aws globalaccelerator create-listener \
  --accelerator-arn arn:aws:globalaccelerator::... \
  --protocol TCP \
  --port-ranges FromPort=443,ToPort=443

# Dodaj endpoint group (region + endpoint)
aws globalaccelerator create-endpoint-group \
  --listener-arn arn:... \
  --endpoint-group-region eu-west-1 \
  --endpoint-configurations \
    EndpointId=arn:aws:elasticloadbalancing:...,Weight=100

# Sprawdź przydzielone statyczne IP
aws globalaccelerator list-accelerators \
  --query "Accelerators[].[Name,IpSets]"`,
      lang: 'bash'
    },
  ]
},

// ── Security & DevOps ─────────────────────────────────────────────────────────

state: [
  {
    name: 'IAM — Identity and Access Management',
    icon: '🔐',
    color: '#FF9900',
    bundle: 'Free',
    complexity: 'Krytyczna złożoność',
    when: 'Zarządzanie KAŻDYM dostępem do AWS. Kto co może robić. Fundament bezpieczeństwa — bez IAM nie możesz nic.',
    code: `# Principle of Least Privilege — dawaj minimum uprawnień
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": [
      "s3:GetObject",
      "s3:PutObject"
    ],
    "Resource": "arn:aws:s3:::moj-bucket/uploads/*",
    "Condition": {
      "StringEquals": {"aws:RequestedRegion": "eu-west-1"},
      "Bool": {"aws:MultiFactorAuthPresent": "true"}
    }
  }]
}

# Typy tożsamości:
# Root account — TYLKO do: billing, support plans, zamknięcie konta. Nigdy daily use!
# IAM User — person lub service z long-term credentials (access key). Unikaj dla serwisów.
# IAM Role — tożsamość z tymczasowymi credentials. Używaj dla EC2, Lambda, ECS, cross-account.
# IAM Group — kolekcja userów. Polityki na grupach, nie na indywidualnych userach.

# Kluczowe pojęcia:
# Permission boundary — maksymalne uprawnienia które rola/user może mieć (caps)
# Service Control Policy (SCP) — limity na poziomie AWS Organization/OU
# Resource-based policy — S3 bucket policy, Lambda resource policy (kto może wywołać)`
  },
  {
    name: 'Cognito — Autentykacja Użytkowników',
    icon: '👤',
    color: '#C925D1',
    bundle: 'Free do 50k MAU',
    complexity: 'Średnia',
    when: 'Rejestracja i logowanie użytkowników w aplikacji webowej/mobilnej. Social login (Google, Facebook, Apple). JWT tokens dla API.',
    code: `# Dwa komponenty Cognito:

# 1. User Pools — katalog użytkowników + autentykacja
#    - Signup, signin, MFA, email verification
#    - OAuth 2.0 / OIDC, hosted UI
#    - Zwraca JWT (ID token, access token, refresh token)
#    - Integracja z ALB i API Gateway jako autorizer

# 2. Identity Pools (Federated Identities) — AWS credentials dla użytkowników
#    - Swap JWT na tymczasowe AWS credentials (STS)
#    - Użytkownik może bezpośrednio pisać do S3, DynamoDB itp.
#    - Authenticated i Unauthenticated (guest) roles

# Python SDK (boto3) — weryfikacja tokenu
import boto3
client = boto3.client('cognito-idp', region_name='eu-west-1')

# Login
response = client.initiate_auth(
    AuthFlow='USER_PASSWORD_AUTH',
    AuthParameters={'USERNAME': email, 'PASSWORD': password},
    ClientId='xxx'
)
access_token = response['AuthenticationResult']['AccessToken']`
  },
  {
    name: 'WAF — Web Application Firewall',
    icon: '🛡️',
    color: '#FF4F8B',
    bundle: '$5/WebACL + reguły',
    complexity: 'Średnia',
    when: 'Ochrona przed OWASP Top 10, SQL injection, XSS, boty, rate limiting. Dołącz do CloudFront lub ALB.',
    code: `# WAF WebACL — reguły w kolejności priorytetów
# Akcje: Allow, Block, Count (monitoring bez blokowania), CAPTCHA

# AWS Managed Rule Groups (gotowe, $0.80-2/mies):
# - AWSManagedRulesCommonRuleSet — OWASP Top 10
# - AWSManagedRulesSQLiRuleSet — SQL Injection
# - AWSManagedRulesKnownBadInputsRuleSet — Log4j, Spring4Shell
# - AWSManagedRulesAmazonIpReputationList — złe IP botów
# - AWSManagedRulesBotControlRuleSet — zarządzanie botami

# Custom rule — Rate Limiting (max 100 req/5min z jednego IP)
aws wafv2 create-web-acl --name prod-waf --scope REGIONAL \
  --default-action Allow={} \
  --rules '[{
    "Name": "RateLimit",
    "Priority": 1,
    "Action": {"Block": {}},
    "Statement": {
      "RateBasedStatement": {
        "Limit": 100,
        "AggregateKeyType": "IP"
      }
    },
    "VisibilityConfig": {"SampledRequestsEnabled": true, "CloudWatchMetricsEnabled": true, "MetricName": "RateLimit"}
  }]'`
  },
  {
    name: 'KMS — Key Management Service',
    icon: '🔑',
    color: '#E7157B',
    bundle: '$1/klucz/mies + $0.03/10k wywołań',
    complexity: 'Niska (transparent)',
    when: 'Szyfrowanie danych w spoczynku (S3, RDS, EBS, DynamoDB, Secrets Manager). Compliance HIPAA, PCI-DSS, SOC2. Zarządzanie kluczami kryptograficznymi.',
    code: `# KMS szyfruje dane za pomocą DEK (Data Encryption Key)
# Envelope encryption: KMS-CMK szyfruje DEK, DEK szyfruje dane

# Typy kluczy:
# AWS Managed Keys — automatycznie dla serwisów AWS (aws/s3, aws/rds). Free, brak kontroli.
# Customer Managed Keys (CMK) — pełna kontrola: rotation, policies, audit. $1/mies.
# CloudHSM Keys — dedykowany hardware. Compliance Level 3. $$$

# Szyfrowanie S3 bucket (server-side, transparent)
aws s3api put-bucket-encryption \
  --bucket moj-bucket \
  --server-side-encryption-configuration '{
    "Rules": [{"ApplyServerSideEncryptionByDefault": {
      "SSEAlgorithm": "aws:kms",
      "KMSMasterKeyID": "arn:aws:kms:eu-west-1:123:key/xxx"
    }}]
  }'

# Szyfruj/odszyfruj własne dane
aws kms encrypt --key-id alias/moj-klucz --plaintext fileb://secret.txt --output text --query CiphertextBlob | base64 --decode > secret.enc
aws kms decrypt --ciphertext-blob fileb://secret.enc --output text --query Plaintext | base64 --decode`
  },
  {
    name: 'Secrets Manager — Zarządzanie Sekretami',
    icon: '🗝️',
    color: '#DD344C',
    bundle: '$0.40/sekret/mies',
    complexity: 'Niska',
    when: 'Przechowywanie i automatyczna rotacja credentials: hasła DB, API keys, OAuth secrets. Aplikacje pobierają secret przez API zamiast trzymać w env/kodzie.',
    code: `# Utwórz sekret (np. credentials DB)
aws secretsmanager create-secret \
  --name prod/database/credentials \
  --secret-string '{"username":"admin","password":"SuperTajne123!"}'

# Włącz automatyczną rotację (Lambda robi nowe hasło w DB co 30 dni)
aws secretsmanager rotate-secret \
  --secret-id prod/database/credentials \
  --rotation-rules AutomaticallyAfterDays=30 \
  --rotation-lambda-arn arn:aws:lambda:...

# Pobierz sekret w aplikacji Python
import boto3, json
client = boto3.client('secretsmanager', region_name='eu-west-1')
secret = json.loads(
    client.get_secret_value(SecretId='prod/database/credentials')['SecretString']
)
db_password = secret['password']

# Nigdy nie hardcoduj haseł w kodzie ani ENV!
# Secret cachuj lokalnie (aws-secretsmanager-caching-python)`
  },
  {
    name: 'CloudFormation — Infrastructure as Code',
    icon: '🏗️',
    color: '#8C4FFF',
    bundle: 'Free (zasoby płatne)',
    complexity: 'Wysoka',
    when: 'Deklaratywny opis całej infrastruktury w YAML/JSON. Reproducible environments: dev=prod. Rollback przy błędzie. Standard w enterprise.',
    code: `# infrastructure.yaml — przykładowy stack z VPC + EC2
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Production API Stack'

Parameters:
  Environment:
    Type: String
    AllowedValues: [dev, staging, prod]
  InstanceType:
    Type: String
    Default: t3.micro

Conditions:
  IsProd: !Equals [!Ref Environment, prod]

Resources:
  ApiSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: API Security Group
      VpcId: !ImportValue shared-vpc-id
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 8000
          ToPort: 8000
          SourceSecurityGroupId: !ImportValue alb-sg-id

  ApiInstance:
    Type: AWS::EC2::Instance
    Properties:
      InstanceType: !If [IsProd, m5.large, !Ref InstanceType]
      ImageId: ami-0c55b159cbfafe1f0
      SecurityGroupIds: [!Ref ApiSecurityGroup]
      IamInstanceProfile: !Ref ApiInstanceProfile

Outputs:
  ApiSecurityGroupId:
    Value: !GetAtt ApiSecurityGroup.GroupId
    Export:
      Name: !Sub '\${AWS::StackName}-api-sg-id'`
  },
  {
    name: 'CodePipeline + CodeBuild + CodeDeploy',
    icon: '🔄',
    color: '#14AAF5',
    bundle: '$1/pipeline/mies + build min',
    complexity: 'Wysoka',
    when: 'Pełne CI/CD na AWS. Source → Build → Test → Deploy. Integruje się z GitHub, BitBucket, S3. Deploy na EC2, ECS, Lambda, Beanstalk, CloudFormation.',
    code: `# CodePipeline stages
Source:
  GitHub/CodeCommit/S3 → triggeruje pipeline po push

Build (CodeBuild):
  # buildspec.yml w repo
  version: 0.2
  phases:
    install:
      commands:
        - pip install -r requirements.txt
    build:
      commands:
        - python -m pytest tests/
        - docker build -t $ECR_REPO:$CODEBUILD_RESOLVED_SOURCE_VERSION .
        - docker push $ECR_REPO:$CODEBUILD_RESOLVED_SOURCE_VERSION
  artifacts:
    files: ['imagedefinitions.json']

Deploy (CodeDeploy → ECS Blue/Green):
  # Zero-downtime deploy:
  # 1. Uruchom nowe taski z nowym image (Green)
  # 2. Przenieś ruch ALB z Blue → Green
  # 3. Po TestTrafficHook — pełny ruch na Green
  # 4. Zatrzymaj Blue taski

# Manualne zatwierdzenie przed prod
  ApproveDeployProd:
    Type: Manual
    Configuration:
      NotificationArn: arn:aws:sns:...:deploy-approvals`
  },
  {
    name: 'CloudWatch — Monitoring, Logi, Alarmy',
    icon: '📊',
    color: '#FF6B35',
    bundle: 'Free tier + pay-per-use',
    complexity: 'Średnia',
    when: 'Centralny monitoring AWS. Metryki wszystkich serwisów, logi aplikacji, alarmy, dashboardy. Bez CloudWatch nie wiesz co się dzieje w produkcji.',
    code: `# CloudWatch składa się z:

# 1. Metrics — dane numeryczne w czasie
#    Każdy serwis AWS wysyła metryki automatycznie:
#    EC2: CPUUtilization, NetworkIn, DiskReadOps
#    Lambda: Duration, Errors, Throttles, ConcurrentExecutions
#    RDS: DatabaseConnections, FreeStorageSpace, ReadLatency
#    ALB: TargetResponseTime, HTTPCode_Target_5XX_Count
#    Custom metrics: aws cloudwatch put-metric-data --namespace App --metric-name OrdersPerMin --value 42

# 2. Logs — logi z CloudWatch Logs Agent, Lambda, ECS, API Gateway
#    Log Groups → Log Streams → Log Events
#    Retention: 1 dzień do Never (domyślnie Never = płacisz za storage!)

# 3. Alarms → SNS → Email/PagerDuty/Slack/Lambda
# 4. Dashboards — widżety z metrykami, liczniki, mapy serwisów
# 5. Logs Insights — SQL-like query po logach

# 6. Container Insights — CPU/RAM per ECS task, per pod K8s
# 7. Lambda Insights — cold starts, init duration, memory usage
# 8. Synthetic Canaries — HTTP monitor co X minut (uptime checking)`
  },
  {
    name: 'CloudTrail — Audit Log Wszystkich Operacji',
    icon: '📋',
    color: '#00A8E1',
    bundle: 'Free (1 trail), $2/100k events',
    complexity: 'Niska',
    when: 'Compliance, forensics, security audit. Kto wywołał jakie API, kiedy, z jakiego IP. "Kto usunął ten bucket o 3 w nocy?" — CloudTrail wie.',
    code: `# CloudTrail zapisuje KAŻDE wywołanie AWS API:
# - Kto: IAM user/role/root/service
# - Co: akcja (DeleteBucket, RunInstances, GetSecretValue)
# - Skąd: IP address, User Agent (konsola/CLI/SDK)
# - Kiedy: timestamp
# - Czy się udało: errorCode (jeśli był błąd)

# Przykładowy event (uproszczony):
{
  "eventTime": "2024-01-15T03:42:00Z",
  "userIdentity": {
    "type": "IAMUser",
    "userName": "jan.kowalski"
  },
  "eventName": "DeleteBucket",
  "requestParameters": {"bucketName": "prod-backups"},
  "sourceIPAddress": "203.0.113.42",
  "userAgent": "aws-cli/2.x"
}

# CloudTrail → S3 (90 dni w CloudTrail console, potem archiwum)
# Przeszukuj przez Athena zapytania na S3

# Włącz Data Events (GetObject, PutObject, InvokeFunction):
aws cloudtrail put-event-selectors --trail-name moj-trail \
  --event-selectors '[{"ReadWriteType":"All","DataResources":[{"Type":"AWS::S3::Object","Values":["arn:aws:s3:::prod-bucket/"]}]}]'`
  },
  {
    name: 'X-Ray — Distributed Tracing',
    icon: '🔍',
    color: '#E8A838',
    bundle: '$0.50/1M traces',
    complexity: 'Średnia',
    when: 'Debugowanie latency w mikrousługach. "Które wywołanie Lambda spowalnia ten endpoint?" Service Map pokazuje cały flow: ALB → Lambda → DynamoDB → zewnętrzne API.',
    code: `# Python — instrumentacja z AWS X-Ray SDK
from aws_xray_sdk.core import xray_recorder, patch_all

# Instrumentuj wszystkie AWS SDK calls (boto3, requests itp.)
patch_all()

# Lambda: X-Ray włącz w konfiguracji (Active Tracing)
# Każda invocacja = trace = seria subsegmentów

@xray_recorder.capture('process-order')
def process_order(order_id):
    # Ten blok pojawi się jako subsegment na timeline
    with xray_recorder.in_subsegment('validate'):
        validate_order(order_id)

    with xray_recorder.in_subsegment('save-to-db'):
        save_order(order_id)

# Dodaj custom metadata do trace
xray_recorder.current_subsegment().put_metadata(
    'order_id', order_id, 'order-service'
)

# Service Map: wizualizacja w konsoli AWS
# Latency histogramy dla każdego node
# Błędy i fault rates`
  },
  {
    name: 'GuardDuty — Threat Detection ML',
    icon: '🚨',
    color: '#FF4444',
    bundle: '~$3-5/mies (VolumeBase)',
    complexity: 'Niska (turn-on)',
    when: 'Automatyczne wykrywanie zagrożeń: cryptomining, credential theft, unusual API calls, port scanning. Wystarczy włączyć — ML robi resztę.',
    code: `# GuardDuty analizuje:
# - VPC Flow Logs (anomalie ruchu sieciowego)
# - DNS logs (communication z C&C servers)
# - CloudTrail (podejrzane wywołania API)
# - S3 access logs
# - EKS audit logs (opcjonalnie)
# - RDS login logs (opcjonalnie)
# - Lambda network activity (opcjonalnie)

# Przykładowe typy findings:
# UnauthorizedAccess:EC2/SSHBruteForce
# CryptoCurrency:EC2/BitcoinTool.B!DNS
# Recon:IAMUser/TorIPCaller        # ktoś używa Tora
# UnauthorizedAccess:IAMUser/ConsoleLoginSuccess.B  # logowanie z nieznanego miejsca
# Policy:S3/BucketBlockPublicAccessDisabled  # ktoś wyłączył blokadę public access

# Włącz GuardDuty (5 minut, klikasz OK)
aws guardduty create-detector --enable --finding-publishing-frequency FIFTEEN_MINUTES

# Automatyczna remediation: GuardDuty finding → EventBridge → Lambda → blokuj IP w Security Group`
  },
  {
    name: 'Systems Manager (SSM)',
    icon: '⚙️',
    color: '#4AB29A',
    bundle: 'Bezpłatny rdzeń + $0.001/param',
    complexity: 'Średnia',
    when: 'Zarządzanie flotą EC2 bez SSH. Remote command execution, patch management, session manager (bezpieczne shell bez key pairs), parameter store, automation playbooks.',
    code: `# Session Manager — shell do EC2 bez SSH, bez key pair, przez HTTPS
aws ssm start-session --target i-0123456789abcdef0
# Działa nawet dla instancji w private subnet bez bastion host!
# Wymaga: SSM Agent + rola IAM z AmazonSSMManagedInstanceCore

# Run Command — wykonaj komendę na wielu instancjach naraz
aws ssm send-command \
  --document-name "AWS-RunShellScript" \
  --targets "Key=tag:Env,Values=prod" \
  --parameters 'commands=["apt-get update -y && apt-get upgrade -y"]'

# Patch Manager — automatyczne patche bezpieczeństwa
# Patch Baseline → Maintenance Window → Patch Group (tag: "Patch Group: prod")

# Parameter Store — config i sekrety (tańszy niż Secrets Manager)
aws ssm put-parameter --name /prod/api/key --value "xxx" --type SecureString
aws ssm get-parameter --name /prod/api/key --with-decryption

# State Manager — wymuszaj stan (np. zawsze zainstalowany CloudWatch agent)`
  },
],

};
