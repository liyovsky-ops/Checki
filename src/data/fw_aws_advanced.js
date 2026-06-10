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
    },
    {
      name: 'AWS PrivateLink — Interface VPC Endpoints',
      desc: 'Prywatne połączenie do serwisów AWS i serwisów partnerów SaaS bez wychodzenia do publicznego internetu.\n\n• Interface Endpoint = Elastic Network Interface (ENI) z prywatnym IP w Twoim VPC → prywatne DNS → ruch nigdy nie opuszcza AWS network\n• Gateway Endpoint: S3 i DynamoDB — FREE, trasa przez route table\n• Interface Endpoint: Lambda, SQS, SNS, Secrets Manager, ECR, CloudWatch, SSM, Kinesis i 100+ innych — ~$7/mies per endpoint per AZ + transfer\n\nDlaczego używać:\n• Security: EC2 w private subnet może korzystać z S3 bez NAT Gateway ($32/mies)\n• Compliance: dane nigdy nie wychodzą do internetu\n• Latency: direct path, no internet round-trip\n\nNajlepsze praktyki:\n• Utwórz Gateway Endpoints dla S3 i DynamoDB ZAWSZE (darmowe)\n• Interface Endpoints twórz tylko dla serwisów których prywatność jest wymagana\n• Enable DNS: private DNS name np. secretsmanager.eu-west-1.amazonaws.com → prywatne IP (nie trzeba zmieniać kodu)\n\nVPC Endpoint Policies — IAM-like policies ograniczające co można przez endpoint robić',
      code: `# Gateway Endpoint dla S3 (BEZPŁATNY) — zawsze twórz!
aws ec2 create-vpc-endpoint \
  --vpc-id vpc-xxx \
  --service-name com.amazonaws.eu-west-1.s3 \
  --route-table-ids rtb-private-1a rtb-private-1b

# Interface Endpoint dla Secrets Manager (prywatny)
aws ec2 create-vpc-endpoint \
  --vpc-id vpc-xxx \
  --vpc-endpoint-type Interface \
  --service-name com.amazonaws.eu-west-1.secretsmanager \
  --subnet-ids subnet-private-1a subnet-private-1b \
  --security-group-ids sg-endpoints \
  --private-dns-enabled  # ← AWS DNS = prywatne IP, kod bez zmian!

# Lista dostępnych usług w regionie
aws ec2 describe-vpc-endpoint-services \
  --query "ServiceNames[?contains(@, 'eu-west-1')]" \
  --output text | tr '\\t' '\\n' | head -30

# Endpoint Policy — ogranicz dostęp tylko do własnych bucketów
{
  "Statement": [{
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:*",
    "Resource": [
      "arn:aws:s3:::moj-bucket",
      "arn:aws:s3:::moj-bucket/*"
    ]
  }]
}`,
      lang: 'bash'
    },
    {
      name: 'AWS Network Firewall',
      desc: 'Managed, stateful firewall na poziomie VPC z IDS/IPS, filtrowanie URL/domeny, deep packet inspection.\n\nArchitektura: wstrzyknij Network Firewall między Internet Gateway a Twoimi publicznymi subnetami.\n\n• Stateful Rules — TCP/UDP z kontekstem sesji, Suricata IDS/IPS kompatybilne reguły\n• Stateless Rules — szybkie pakietowe filtrowanie (jak NACL, ale zarządzane centralnie)\n• Domain List Rules — blokuj/zezwalaj na konkretne domeny (HTTP hostname, SNI dla TLS)\n• URL Filtering — blokuj kategorie URL (adult, malware, botnet)\n• Managed Rule Groups — AWS i partnerzy dostarczają gotowe listy zagrożeń\n\nPorównanie z WAF:\n• WAF — chroni aplikacje webowe (HTTP/HTTPS, layer 7, per-ALB/CloudFront)\n• Network Firewall — chroni całą sieć VPC (wszystkie protokoły, layer 3-7)\n\nLogging: alerts + flow logs → S3, CloudWatch, Kinesis Data Firehose',
      code: `# Schemat architektury:
# Internet Gateway → Firewall Subnet → Firewall Endpoint
#                                    → Public Subnet (ALB)
#                                    → Private Subnet (EC2)

# Utwórz firewall policy
aws network-firewall create-firewall-policy \
  --firewall-policy-name prod-policy \
  --firewall-policy '{
    "StatelessDefaultActions": ["aws:forward_to_sfe"],
    "StatelessFragmentDefaultActions": ["aws:forward_to_sfe"],
    "StatefulRuleGroupReferences": [
      {"ResourceArn": "arn:aws:network-firewall:eu-west-1:aws-managed:stateful-rulegroup/AbusedLegitBotNetCommandAndControlDomainsActionOrder"},
      {"ResourceArn": "arn:aws:network-firewall:eu-west-1:aws-managed:stateful-rulegroup/MalwareDomainsActionOrder"}
    ],
    "StatefulEngineOptions": {"RuleOrder": "STRICT_ORDER"}
  }'

# Blokuj złośliwe domeny (własna reguła Suricata)
# reject dns $HOME_NET any -> any 53 (msg:"Block malware C2";
#   dns.query; content:"malware-domain.com"; nocase; sid:1001; rev:1;)

# Reguła domain list — zezwalaj tylko na znane domeny
aws network-firewall create-rule-group \
  --rule-group-name allow-known-domains \
  --type STATEFUL \
  --rules '{"RulesSource":{"RulesSourceList":{"Targets":[".google.com",".amazonaws.com"],"TargetTypes":["HTTP_HOST","TLS_SNI"],"GeneratedRulesType":"ALLOWLIST"}}}' \
  --capacity 100`,
      lang: 'bash'
    },
    {
      name: 'AWS Transit Gateway — Centralny Hub Sieci',
      desc: 'Hub łączący wiele VPC, sieci on-premises (Direct Connect, VPN) w topologię hub-and-spoke. Zastępuje skomplikowane VPC Peering meshes.\n\n• Tranzytywny routing: VPC-A ↔ TGW ↔ VPC-B, VPC-B ↔ TGW ↔ VPC-C → A może rozmawiać z C\n• VPC Peering: tylko point-to-point, nietranzytywne (A↔B, B↔C ≠ A↔C)\n• Multi-account: Transit Gateway działa cross-account przez RAM (Resource Access Manager)\n• Route Tables TGW: kontrolujesz routing między attachmentami\n• Shared Services VPC: jedna VPC z DNS, NAT, Firewall → reszta VPC przez TGW\n\nPrzykład enterprise:\n• 50 VPC dla 50 teamów → wszystkie podłączone do TGW\n• Shared Services VPC: centralne NAT Gateway (oszczędność vs NAT per VPC)\n• Security VPC: Network Firewall inspektuje cały ruch przed wyjściem do internetu\n\nCena: $0.05/h per attachment + $0.02/GB danych',
      code: `# Utwórz Transit Gateway
aws ec2 create-transit-gateway \
  --description "Central networking hub" \
  --options '{"AutoAcceptSharedAttachments":"enable","DefaultRouteTableAssociation":"enable","DefaultRouteTablePropagation":"enable","DnsSupport":"enable","VpnEcmpSupport":"enable"}'

# Attach VPC do TGW
aws ec2 create-transit-gateway-vpc-attachment \
  --transit-gateway-id tgw-xxx \
  --vpc-id vpc-prod \
  --subnet-ids subnet-tgw-1a subnet-tgw-1b \
  --tag-specifications 'ResourceType=transit-gateway-attachment,Tags=[{Key=Name,Value=prod-vpc}]'

# Routing: VPC route table → TGW dla innych CIDR
aws ec2 create-route \
  --route-table-id rtb-private-xxx \
  --destination-cidr-block 10.0.0.0/8 \
  --transit-gateway-id tgw-xxx

# Segmentacja: TGW Route Tables oddzielają prod od dev
# prod-rt: prod VPCs + on-premises. dev-rt: tylko dev VPCs.
aws ec2 create-transit-gateway-route-table \
  --transit-gateway-id tgw-xxx \
  --tag-specifications 'ResourceType=transit-gateway-route-table,Tags=[{Key=Name,Value=prod-rt}]'`,
      lang: 'bash'
    },
    {
      name: 'Amazon CloudFront Functions & Lambda@Edge',
      desc: 'Kod wykonywany na edge locations CloudFront — bliżej użytkownika, bez round-trip do origin.\n\nDwa warianty:\n\n• CloudFront Functions (CF Functions):\n  - JavaScript, sub-millisecond, ~$0.10/1M invocations\n  - Tylko Viewer Request i Viewer Response fazy\n  - Max 10KB kodu, 2ms execution time\n  - Ideal: URL rewrites, redirects, security headers, A/B testing, token validation\n\n• Lambda@Edge:\n  - Node.js lub Python, 1-30s timeout\n  - Wszystkie 4 fazy: Viewer Request, Origin Request, Origin Response, Viewer Response\n  - Max 1MB (Viewer) / 10MB (Origin) kodu\n  - Droższy, ale pełna moc Lambda\n  - Ideal: authentication, dynamiczne routing do origins, personalizacja, SSR\n\nFazy:\n1. Viewer Request — klient → CloudFront (przed cache)\n2. Origin Request — CloudFront → origin (cache miss)\n3. Origin Response — origin → CloudFront (zanim zapisze do cache)\n4. Viewer Response — CloudFront → klient',
      code: `// CloudFront Function — Security Headers (Viewer Response)
function handler(event) {
    var response = event.response;
    var headers  = response.headers;

    headers['strict-transport-security'] = {value: 'max-age=63072000; includeSubdomains; preload'};
    headers['x-content-type-options']    = {value: 'nosniff'};
    headers['x-frame-options']           = {value: 'DENY'};
    headers['x-xss-protection']          = {value: '1; mode=block'};
    headers['referrer-policy']           = {value: 'strict-origin-when-cross-origin'};
    headers['permissions-policy']        = {value: 'camera=(), microphone=(), geolocation=()'};
    headers['content-security-policy']   = {value: "default-src 'self'; script-src 'self' 'unsafe-inline'"};

    return response;
}

// Lambda@Edge — JWT autoryzacja (Viewer Request)
exports.handler = async (event) => {
    const request = event.Records[0].cf.request;
    const token   = (request.headers['authorization'] || [{}])[0].value;

    if (!token || !verifyJWT(token.replace('Bearer ', ''))) {
        return {
            status: '401',
            statusDescription: 'Unauthorized',
            body: JSON.stringify({error: 'Unauthorized'}),
            headers: {'content-type': [{value: 'application/json'}]}
        };
    }
    return request; // przejdź dalej do origin
};`,
      lang: 'javascript'
    },
    {
      name: 'AWS Global Accelerator — Globalny Routing przez Sieć AWS',
      desc: 'Kieruje ruch użytkowników przez backbone AWS zamiast publicznego internetu — redukuje latency o 60%, usuwa routing-flaps.\n\n• Statyczne anycast IP: 2 dedykowane IP dla całej aplikacji — nie zmieniają się nigdy\n• Routing oparty na AWS backbone: od PoP (Point of Presence) → sieć AWS → do regionu\n• Multi-region failover: automatyczne przekierowanie gdy region niedostępny\n• Traffic dials: kontrolujesz % ruchu do każdego regionu (blue/green deployments)\n• Endpoint types: ALB, NLB, EC2, Elastic IP — można miksować regiony\n\nKiedy używać?\n• Aplikacje globalne: latency-sensitive gaming, trading, VoIP\n• Multi-region HA: failover szybszy niż Route53 TTL\n• DDoS protection: AWS absorbs at edge zanim dotrze do aplikacji\n• Nie zastępuje Route53 dla DNS-based routing — uzupełnia go\n\nCena: $0.025/h per accelerator + $0.01/GB premium traffic',
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
    {
      name: 'VPC Flow Logs — Monitoring Ruchu Sieciowego',
      desc: 'Przechwytuj metadane każdego pakietu w VPC — source IP, destination IP, port, protocol, bytes, accept/reject. Nie przechwytuje treści pakietów (privacy/compliance).\n\nGdzie można włączyć:\n• VPC — wszystkie interfejsy sieciowe\n• Subnet — wszystkie ENI w podsieci\n• Network Interface (ENI) — konkretny interfejs\n\nFormat logu: version account-id interface-id srcaddr dstaddr srcport dstport protocol packets bytes start end action log-status\n\nDo czego służy:\n• Diagnozowanie odrzuconych połączeń (Security Group/NACL blokuje)\n• Analiza bezpieczeństwa: nieoczekiwane połączenia, port scanning, lateral movement\n• Compliance: dowód że ruch był lub nie był dozwolony\n• Capacity planning: które porty/protokoły generują ruch\n\nDestinacja logów: CloudWatch Logs (drogi ale przeszukiwalny), S3 (tani, Athena do analizy), Kinesis Data Firehose (real-time).\n\nCena: $0.50/GB za zebranie danych (Log Collection) + storage S3/CloudWatch',
      code: `# Włącz Flow Logs dla VPC → S3
aws ec2 create-flow-logs \\
  --resource-type VPC \\
  --resource-ids vpc-xxx \\
  --traffic-type ALL \\
  --log-destination-type s3 \\
  --log-destination arn:aws:s3:::moje-flow-logs/vpc-logs/ \\
  --log-format '\${version} \${account-id} \${interface-id} \${srcaddr} \${dstaddr} \${srcport} \${dstport} \${protocol} \${packets} \${bytes} \${start} \${end} \${action} \${tcp-flags}'

# Analiza przez Athena (utwórz tabelę na S3 z logami)
CREATE EXTERNAL TABLE vpc_flow_logs (
  version INT, account_id STRING, interface_id STRING,
  srcaddr STRING, dstaddr STRING, srcport INT, dstport INT,
  protocol INT, packets BIGINT, bytes BIGINT,
  start BIGINT, end BIGINT, action STRING, log_status STRING
)
ROW FORMAT DELIMITED FIELDS TERMINATED BY ' '
LOCATION 's3://moje-flow-logs/vpc-logs/'
TBLPROPERTIES ("skip.header.line.count"="1");

-- Znajdź odrzucone połączenia z konkretnego IP
SELECT srcaddr, dstaddr, dstport, count(*) as rejects
FROM vpc_flow_logs
WHERE action = 'REJECT' AND srcaddr = '1.2.3.4'
GROUP BY srcaddr, dstaddr, dstport
ORDER BY rejects DESC;

-- Top 10 najbardziej "rozgadanych" par IP
SELECT srcaddr, dstaddr, sum(bytes) as total_bytes
FROM vpc_flow_logs
WHERE action = 'ACCEPT'
GROUP BY srcaddr, dstaddr
ORDER BY total_bytes DESC
LIMIT 10;`,
      lang: 'sql'
    },
    {
      name: 'Amazon VPC Lattice — Service-to-Service Networking',
      desc: 'Nowy (2023) managed service networking layer dla mikroserwisów — zastępuje złożone konfiguracje NLB + PrivateLink + service mesh.\n\nCo rozwiązuje:\n• Bez Lattice: serwis A chce wywołać serwis B w innym VPC → NLB + PrivateLink + DNS + Security Groups = dużo konfiguracji\n• Z Lattice: zdefiniuj Service Network, dodaj serwisy, skonfiguruj access policies — gotowe\n\nGłówne koncepcje:\n• Service Network — logyczny namespace grupujący serwisy\n• Service — jeden endpoint (Lambda, ALB lub serwis EKS). Ma własny URL: svc-name.svc-id.eu-west-1.on.aws\n• Target Group — gdzie ruch ląduje (ECS, Lambda, instancje)\n• Listener Rules — routing based on path/method/headers\n• Auth Policy — IAM-based AuthZ między serwisami (kto może wywołać co)\n\nKluczowe cechy:\n• Automatyczny mTLS (szyfrowanie między serwisami bez konfiguracji certyfikatów)\n• IAM-based auth: signature v4 request signing\n• Multi-VPC i multi-account out of the box\n• Observability: CloudWatch metrics per service-to-service call',
      code: `# 1. Utwórz Service Network
aws vpc-lattice create-service-network \\
  --name prod-service-network \\
  --auth-type AWS_IAM  # wymagaj IAM auth dla wszystkich serwisów

# 2. Zarejestruj serwis
aws vpc-lattice create-service \\
  --name orders-service \\
  --auth-type AWS_IAM

# 3. Utwórz Listener (HTTP/HTTPS)
aws vpc-lattice create-listener \\
  --service-identifier svc-xxx \\
  --protocol HTTP \\
  --port 80 \\
  --default-action Forward='TargetGroups=[{TargetGroupIdentifier=tg-xxx,Weight=100}]'

# 4. Target Group (np. Lambda)
aws vpc-lattice create-target-group \\
  --type LAMBDA \\
  --name orders-lambda-tg \\
  --config LambdaEventStructureVersion=V2

# 5. Zarejestruj Lambdę w Target Group
aws vpc-lattice register-targets \\
  --target-group-identifier tg-xxx \\
  --targets Id=arn:aws:lambda:...:orders-handler

# 6. Podpnij serwis do Service Network
aws vpc-lattice create-service-network-service-association \\
  --service-network-identifier sn-xxx \\
  --service-identifier svc-xxx

# 7. Podpnij VPC do Service Network
aws vpc-lattice create-service-network-vpc-association \\
  --service-network-identifier sn-xxx \\
  --vpc-identifier vpc-yyy \\
  --security-group-ids sg-xxx

# Wywołanie z serwisu A (w powiązanym VPC):
# URL format: https://orders-service.abc123def456.eu-west-1.vpc-lattice-svcs.io
# Wymaga podpisania requestu (IAM SigV4) lub VPC Lattice bearer token
# boto3: sigv4a signing z library requests-aws4auth`,
      lang: 'bash'
    },
    {
      name: 'AWS App Mesh — Service Mesh (Envoy Proxy)',
      desc: 'Managed service mesh oparty na Envoy proxy — observability, traffic management i security dla mikroserwisów bez zmiany kodu aplikacji.\n\nCzym jest service mesh:\n• Sidecar proxy (Envoy) wstrzykiwany do każdego kontenera\n• Proxy interceptuje CAŁY ruch in/out — Twój kod nie wie że istnieje\n• Centralny control plane zarządza konfiguracją wszystkich proxy\n\nCo daje App Mesh:\n• Observability: automatyczne traces (X-Ray), metryki (CloudWatch), logi\n• Traffic control: weighted routing (canary deploys 5%/95%), retries, circuit breaker\n• mTLS: automatyczne certyfikaty między serwisami (ACMPCA lub Envoy własne)\n• Outlier detection: usuń "chory" pod z load balancera automatycznie\n\nKiedy App Mesh vs VPC Lattice:\n• App Mesh: zaawansowane Envoy features, Kubernetes-native, istniejące workloady\n• VPC Lattice: prostszy setup, multi-account, Lambda-friendly, AWS-native\n• W 2024: AWS pushuje VPC Lattice jako następcę App Mesh dla nowych projektów\n\nDeployment:\n• ECS: App Mesh Controller dla ECS Fargate (sidecar Envoy container w Task Definition)\n• EKS: App Mesh Controller for Kubernetes (Helm chart + CRDs)',
      code: `# App Mesh Mesh
aws appmesh create-mesh --mesh-name prod-mesh \\
  --spec '{"egressFilter":{"type":"DROP_ALL"}}'

# Virtual Node = jeden mikroserwis
aws appmesh create-virtual-node \\
  --mesh-name prod-mesh \\
  --virtual-node-name orders-service \\
  --spec '{
    "listeners": [{"portMapping":{"port":8080,"protocol":"http"}}],
    "serviceDiscovery": {
      "awsCloudMap": {
        "namespaceName":"prod.svc.cluster.local",
        "serviceName":"orders"
      }
    },
    "logging": {
      "accessLog": {
        "file": {"path":"/dev/stdout"}
      }
    }
  }'

# Virtual Router = load balancer dla serwisu
aws appmesh create-virtual-router \\
  --mesh-name prod-mesh \\
  --virtual-router-name orders-router \\
  --spec '{"listeners":[{"portMapping":{"port":8080,"protocol":"http"}}]}'

# Route z weighted routing (canary — 10% na nową wersję)
aws appmesh create-route \\
  --mesh-name prod-mesh \\
  --virtual-router-name orders-router \\
  --route-name orders-canary \\
  --spec '{
    "httpRoute": {
      "match": {"prefix": "/"},
      "action": {
        "weightedTargets": [
          {"virtualNode":"orders-service-v1","weight":90},
          {"virtualNode":"orders-service-v2","weight":10}
        ]
      },
      "retryPolicy": {
        "maxRetries":3,
        "perRetryTimeout":{"value":5,"unit":"s"},
        "httpRetryEvents":["server-error","gateway-error","reset"]
      }
    }
  }'`,
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
  {
    name: 'AWS Organizations & Service Control Policies',
    icon: '🏢',
    color: '#E7157B',
    bundle: 'Free',
    complexity: 'Wysoka',
    when: 'Zarządzanie wieloma kontami AWS w firmie. Centralne billing, granty uprawnień, guardrails dla całej organizacji. Każde środowisko (dev/staging/prod) = osobne konto = naturalna izolacja.',
    code: `# Dlaczego wiele kont:
# • Izolacja blast radius: błąd w dev nie dosięga prod
# # • Billing per team/projekt
# • Granice uprawnień: dev nie może dotknąć prod nawet z "admin" rolą
# • Compliance: prod ma surowsze SCP, dev może eksperymentować

# Struktura Organizations:
Root
├── Suspended Accounts OU     # zablokowane konta
├── Infrastructure OU
│   ├── Network Account       # Transit Gateway, Direct Connect
│   └── Security Account      # GuardDuty master, SecurityHub, CloudTrail org
├── Workloads OU
│   ├── Production OU
│   │   └── Prod Account      # surowsze SCP (brak delete*)
│   └── NonProd OU
│       ├── Dev Account
│       └── Staging Account
└── Sandbox OU                # playground, SCP block expensive services

# SCP — Service Control Policies (maksymalne uprawnienia konta)
# Przykład: zablokuj tworzenie zasobów poza EU
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "DenyNonEURegions",
    "Effect": "Deny",
    "Action": "*",
    "Resource": "*",
    "Condition": {
      "StringNotEquals": {
        "aws:RequestedRegion": ["eu-west-1", "eu-central-1", "eu-north-1"]
      },
      "BoolIfExists": {"aws:PrincipalIsAWSService": "false"}
    }
  }]
}
# SCP: zablokuj wyłączenie CloudTrail i GuardDuty
# {"Sid":"DenyDisableTrail","Effect":"Deny","Action":["cloudtrail:DeleteTrail","cloudtrail:StopLogging","guardduty:DeleteDetector","guardduty:DisassociateFromMasterAccount"],...}`
  },
  {
    name: 'AWS Config — Compliance & Drift Detection',
    icon: '📋',
    color: '#FF6B6B',
    bundle: '$0.003/config item + $1/rule evaluation',
    complexity: 'Średnia',
    when: 'Ciągła ocena zgodności zasobów z politykami. "Czy wszystkie S3 mają szyfrowanie?" "Czy RDS ma Multi-AZ?" "Czy EC2 nie ma sg z portem 22 otwartym na 0.0.0.0/0?" Auto-remediation przez SSM.',
    code: `# Config rejestruje każdą zmianę konfiguracji zasobu (historia)
# Managed Rules — gotowe reguły compliance:
# - encrypted-volumes: czy EBS jest zaszyfrowany?
# - rds-storage-encrypted: czy RDS ma szyfrowanie?
# - s3-bucket-public-read-prohibited: brak publicznego odczytu S3
# - ec2-instance-no-public-ip: EC2 bez publicznych IP
# - iam-user-mfa-enabled: MFA dla userów IAM
# - required-tags: wymagane tagi na zasobach
# - multi-region-cloudtrail-enabled: CloudTrail we wszystkich regionach

# Włącz Config w regionie
aws configservice put-configuration-recorder \
  --configuration-recorder '{
    "name": "default",
    "roleARN": "arn:aws:iam::123:role/ConfigRole",
    "recordingGroup": {
      "allSupported": true,
      "includeGlobalResourceTypes": true
    }
  }'

aws configservice put-delivery-channel \
  --delivery-channel '{
    "name": "default",
    "s3BucketName": "config-bucket-prod",
    "configSnapshotDeliveryProperties": {"deliveryFrequency": "Six_Hours"}
  }'

# Dodaj managed rule
aws configservice put-config-rule --config-rule '{
  "ConfigRuleName": "encrypted-volumes",
  "Source": {"Owner": "AWS", "SourceIdentifier": "ENCRYPTED_VOLUMES"}
}'

# Auto-remediation: Config → SSM Automation → napraw problem automatycznie
# np. S3 bez szyfrowania → automatycznie włącz szyfrowanie`
  },
  {
    name: 'Amazon Macie — Ochrona Danych Wrażliwych',
    icon: '🔍',
    color: '#FF4F8B',
    bundle: '$1/GB skanowanych danych',
    complexity: 'Niska',
    when: 'Automatyczne wykrywanie danych wrażliwych (PII, dane osobowe, numery kart kredytowych, hasła, klucze API) w S3. GDPR compliance. Wykrywa błędy konfiguracji S3 (publiczne buckety, brak szyfrowania).',
    code: `# Macie skanuje S3 buckets w poszukiwaniu:
# PII: imiona, nazwiska, adresy, daty urodzenia (GDPR!)
# Finansowe: numery kart kredytowych, konta bankowe
# Dane zdrowotne (HIPAA): diagnoza, leczenie, ubezpieczenie
# Credentials: AWS Access Keys, OAuth tokens, hasła, private keys
# Własnościowe: możesz definiować własne wzorce (regex)

# Włącz Macie
aws macie2 enable-macie

# Utwórz classification job — skanuj bucket
aws macie2 create-classification-job \
  --job-type ONE_TIME \
  --name "scan-prod-bucket" \
  --s3-job-definition '{
    "BucketDefinitions": [{
      "AccountId": "123456789",
      "Buckets": ["prod-uploads", "prod-backups"]
    }]
  }' \
  --managed-data-identifier-selector RECOMMENDED

# Findings: lista wykrytych problemów
aws macie2 list-findings \
  --finding-criteria '{
    "Criterion": {
      "severity.description": {"Eq": ["High", "Critical"]}
    }
  }'

# Integracja: Macie Findings → EventBridge → Lambda → automatyczna kwarantanna`
  },
  {
    name: 'AWS Security Hub — Centralny Dashboard Bezpieczeństwa',
    icon: '🛡️',
    color: '#C925D1',
    bundle: '$0.001/check/region',
    complexity: 'Niska',
    when: 'Agreguj findings z GuardDuty, Macie, Inspector, Config, IAM Analyzer, Firewall Manager w jednym miejscu. Scoring ASFF (Amazon Security Finding Format). CIS AWS Foundations Benchmark automatycznie.',
    code: `# Security Hub = SIEM-lite dla AWS
# Agreguje findings z: GuardDuty, Macie, Inspector, Config, IAM Access Analyzer,
# AWS Firewall Manager, i zewnętrznych (CrowdStrike, Palo Alto, Splunk...)

# Włącz Security Hub
aws securityhub enable-security-hub \
  --enable-default-standards  # CIS AWS Foundations + AWS Foundational Security

# Dostępne standardy compliance:
# - AWS Foundational Security Best Practices (FSBP)
# - CIS AWS Foundations Benchmark v1.4
# - PCI DSS v3.2.1
# - NIST SP 800-53 Rev 5

# Lista findings (priorytet HIGH i CRITICAL)
aws securityhub get-findings \
  --filters '{
    "SeverityLabel": [{"Value": "CRITICAL", "Comparison": "EQUALS"}, {"Value": "HIGH", "Comparison": "EQUALS"}],
    "WorkflowStatus": [{"Value": "NEW", "Comparison": "EQUALS"}],
    "RecordState": [{"Value": "ACTIVE", "Comparison": "EQUALS"}]
  }' \
  --sort-criteria '[{"Field": "SeverityLabel", "SortOrder": "desc"}]'

# Security Score: aws securityhub list-standards-control-associations
# Automatyczna remediation: Security Hub custom action → EventBridge → Lambda`
  },
  {
    name: 'Amazon Inspector v2 — Vulnerability Management',
    icon: '🔬',
    color: '#FF7070',
    bundle: '$0.30/EC2/mies + $0.09/Lambda/mies',
    complexity: 'Niska',
    when: 'Ciągłe skanowanie EC2 i kontenerów ECR pod kątem CVE (znanych podatności). Automatyczne — nie musisz niczego konfigurować, Inspector skanuje przy każdym starcie instancji i nowym pakiecie.',
    code: `# Inspector v2 skanuje:
# EC2: pakiety OS (yum, apt), software, biblioteki
# ECR: Docker images przed i po push
# Lambda: kod funkcji i warstwy (layers)

# Włącz Inspector v2
aws inspector2 enable --resource-types EC2 ECR LAMBDA

# Lista findings
aws inspector2 list-findings \
  --filter-criteria '{
    "fixAvailable": [{"comparison": "EQUALS", "value": "YES"}],
    "severity": [{"comparison": "EQUALS", "value": "CRITICAL"}]
  }' \
  --query "findings[].[title,severity,packageVulnerabilityDetails.cvss[0].baseScore,packageVulnerabilityDetails.vulnerablePackages[0].name]" \
  --output table

# Przykładowe findings:
# CRITICAL: CVE-2021-44228 (Log4Shell) w log4j-2.14.1
# HIGH: CVE-2022-0847 (Dirty Pipe) w kernel 5.8
# MEDIUM: Outdated OpenSSL z dostępną łatką

# Inspector + ECR: każdy pushed image automatycznie skanowany
# aws ecr describe-image-scan-findings --repository-name api --image-id imageTag=latest

# Risk Score 0-10: Inspector priorytetyzuje na podstawie:
# CVSS score + exploitability + exposure (publiczny IP?) + fix availability`
  },
  {
    name: 'AWS Shield & Shield Advanced — DDoS Protection',
    icon: '🛡️',
    color: '#C7131F',
    bundle: 'Shield Standard: FREE | Shield Advanced: $3000/mies',
    complexity: 'Niska',
    when: 'Shield Standard chroni automatycznie ALL CloudFront, Route53, Global Accelerator, ELB. Shield Advanced dla aplikacji wymagających gwarantowanej ochrony i SRT (Shield Response Team) pomocy.',
    code: `# Shield Standard (DOMYŚLNY, BEZPŁATNY):
# - Automatyczna ochrona przed warstwą 3 i 4 DDoS
# - Chroni: CloudFront, Route53, Global Accelerator, ALB/NLB
# - SYN floods, UDP reflection, volumetric attacks
# - Zero konfiguracji — działa od razu

# Shield Advanced ($3000/mies flat + 1 rok kontrakt):
# - Layer 7 DDoS (HTTP floods)
# - Shield Response Team (SRT) 24/7 wsparcie podczas ataku
# - DDoS cost protection (refund za EC2/ALB/CloudFront spike przy ataku)
# - Advanced attack visibility w konsoli
# - WAF zintegrowany
# - Proactive engagement — SRT kontaktuje się sam gdy wykryje atak

# Włącz Shield Advanced
aws shield create-subscription

# Chroń ALB przez Shield Advanced
aws shield create-protection \
  --name prod-alb-protection \
  --resource-arn arn:aws:elasticloadbalancing:eu-west-1:123:loadbalancer/app/prod-alb/xxx

# Lista aktywnych ataków (tylko Shield Advanced)
aws shield list-attacks \
  --start-time '{"FromInclusive": "2024-01-01T00:00:00Z"}' \
  --end-time '{"ToExclusive": "2024-02-01T00:00:00Z"}'

# Automatyczna response: Shield + Route53 Health Check → failover
# Gdy atak na region → Route53 przenosi ruch do drugiego regionu`
  },
  {
    name: 'Amazon Detective — Forensics & Root Cause Analysis',
    icon: '🕵️',
    color: '#8C4FFF',
    bundle: '~$2-4/GB ingested data',
    complexity: 'Niska',
    when: 'Ktoś powiedział "jesteśmy zhackowani" — Detective pozwala szybko zrozumieć co się stało, gdy, skąd, co atakujący zrobił. Analiza GuardDuty findings z kontekstem behawioralnym.',
    code: `# Detective automatycznie zbiera i analizuje:
# - VPC Flow Logs (network behavior)
# - CloudTrail (API calls)
# - GuardDuty findings
# - EKS audit logs (opcjonalnie)
# → Buduje grafy behawioralne w czasie

# Dla każdego GuardDuty finding Detective pokazuje:
# - Mapa powiązań: IP → IAM role → zasoby → inne konta
# - Timeline: kiedy ta rola była używana pierwszy/ostatni raz
# - Czy ta aktywność jest anomalią vs normal behavior?
# - Inne zasoby dotknięte przez to samo IP/konto

# Włącz Detective
aws detective create-graph

# Sprawdź member accounts (multi-account)
aws detective list-members --graph-arn arn:aws:detective:eu-west-1:123:graph:xxx

# Typowe śledztwo:
# 1. GuardDuty: "UnauthorizedAccess:EC2/SSHBruteForce z IP 1.2.3.4"
# 2. Detective: kliknij finding → "Ten IP połączył się z 15 instancjami"
#    → "Między 03:00-04:00 wykonano 347 wywołań API z tej roli"
#    → "Ta rola nigdy wcześniej nie wywoływała s3:GetObject na prod-bucket"
# 3. Wniosek: compromised credentials, lateral movement, data exfiltration

# Detective jest read-only — analizuje, nie naprawia.
# Remediation → GuardDuty + EventBridge → Lambda (blokuj IP, revoke session tokens)`
  },
  {
    name: 'AWS Control Tower — Landing Zone dla Wielu Kont',
    icon: '🏰',
    color: '#14AAF5',
    bundle: 'Free (płacisz za zasoby)',
    complexity: 'Wysoka',
    when: 'Automatyczne tworzenie nowych kont AWS z wbudowanymi guardrails, logowaniem, SSO. Kiedy masz 10+ kont lub budujesz enterprise multi-account setup od zera.',
    code: `# Control Tower = zautomatyzowany setup Organizations + SSO + Config + CloudTrail
# dla całej organizacji

# Tworzy Landing Zone:
# ├── Management Account (billing, Organizations, Control Tower)
# ├── Log Archive Account (CloudTrail logi ze wszystkich kont → S3)
# ├── Audit Account (Config Aggregator, Security Hub master, read-only)
# └── Twoje konta przez Account Factory

# Account Factory — nowe konto w 30 minut:
# Service Catalog → "Utwórz konto" → podaj: email, OU, SSO user
# → Control Tower: tworzy konto, konfiguruje IAM Identity Center, guardrails, logi

# Guardrails (Controls):
# Mandatory: zawsze aktywne (nie można wyłączyć)
#   - Włącz CloudTrail we wszystkich regionach
#   - Włącz Config we wszystkich regionach
#   - Zablokuj zmianę ustawień CloudTrail
# Strongly Recommended: warto włączyć
#   - Wymagaj MFA dla root
#   - Nie pozwól na publiczne EC2 AMI
#   - Wymagaj szyfrowania EBS
# Elective: opcjonalne, branżowe
#   - PCI DSS guardrails
#   - HIPAA guardrails

# Drift detection: Control Tower wykrywa odejście kont od standardów
aws controltower list-enabled-controls \
  --target-identifier arn:aws:organizations::123:ou/o-xxx/ou-xxx`
  },
  {
    name: 'AWS Trusted Advisor — Best Practices Audyt',
    icon: '💡',
    color: '#FF9900',
    bundle: 'Podstawowy: Free | Full: Business/Enterprise Support',
    complexity: 'Niska',
    when: 'Automatyczny audyt konta pod kątem kosztów, wydajności, bezpieczeństwa, fault tolerance i limitów serwisów. "Co robię źle na AWS?" — Trusted Advisor odpowie.',
    code: `# Trusted Advisor sprawdza 5 kategorii:

# 💰 Cost Optimization:
#   - EC2 Reserved Instance recommendations (ile możesz zaoszczędzić)
#   - Idle EC2 instances (CPU < 10% przez 14 dni → może niepotrzebne)
#   - Underutilized EBS volumes (0 IOPS przez 7 dni)
#   - Unused Elastic IPs (płacisz $0.005/h gdy niezałączone)
#   - Low utilization DB instances (DatabaseConnections = 0)

# 🔒 Security:
#   - Security Groups: porty otwarte na 0.0.0.0/0 (SSH 22, RDP 3389!)
#   - S3 Bucket Permissions: publiczne buckety
#   - IAM Users: brak MFA dla root, starsze access keys (>90 dni)
#   - Exposed Access Keys: klucze w publicznych repozytoriach GitHub!
#   - CloudTrail nie włączony

# ⚡ Performance:
#   - High Utilization EC2 Instances (CPU > 90%)
#   - CloudFront Header Forwarding i Cache Hit Rate
#   - RDS ile max_connections osiąga

# 🛡️ Fault Tolerance:
#   - EBS Snapshots starsze niż 7 dni
#   - EC2 bez Multi-AZ w Auto Scaling Group
#   - RDS bez Multi-AZ i backup

# 📊 Service Limits:
#   - Ostrzeżenie gdy zbliżasz się do limitów AWS (80% usage)
#   - EC2 instances, VPC, Security Groups per region

# Sprawdź checks przez API (wymaga Business/Enterprise Support)
aws support describe-trusted-advisor-checks --language en
aws support describe-trusted-advisor-check-result --check-id Pfx0RwqBli  # Security Groups`
  },
  {
    name: 'Amazon Managed Grafana + Managed Prometheus',
    icon: '📈',
    color: '#F46800',
    bundle: '$9/active editor/mies (Grafana) + $0.10/2GB (Prometheus)',
    complexity: 'Średnia',
    when: 'Observability stack jak Grafana + Prometheus ale zarządzane przez AWS. Integruje się natywnie z CloudWatch, X-Ray, OpenSearch. Dla team\'ów które znają Grafana ale nie chcą zarządzać serwerami.',
    code: `# Amazon Managed Service for Prometheus (AMP):
# - Kompatybilny z Prometheus API i PromQL
# - Zbiera metryki z EKS (Kubernetes), EC2, ECS przez AWS Distro for OpenTelemetry
# - Długoterminowe przechowywanie (nie ma 15-dniowego limitu jak standalone Prometheus)
# - Multi-region replication możliwa

# Konfiguracja scrape w EKS (prometheus.yaml)
global:
  scrape_interval: 15s

remote_write:
  - url: https://aps-workspaces.eu-west-1.amazonaws.com/workspaces/ws-xxx/api/v1/remote_write
    sigv4:
      region: eu-west-1
    queue_config:
      max_samples_per_send: 1000

scrape_configs:
  - job_name: kubernetes-pods
    kubernetes_sd_configs:
    - role: pod

# Amazon Managed Grafana (AMG):
# - Grafana 9.x jako managed service
# - Datasources out-of-the-box: CloudWatch, X-Ray, AMP, OpenSearch, Timestream
# - IAM Identity Center (SSO) dla użytkowników
# - SAML/LDAP integracja
# - Auto-scaling workspace

# Utwórz AMG workspace
aws grafana create-workspace \
  --account-access-type CURRENT_ACCOUNT \
  --authentication-providers AWS_SSO \
  --permission-type SERVICE_MANAGED \
  --workspace-name prod-monitoring \
  --workspace-data-sources CLOUDWATCH PROMETHEUS XRAY`
  },
  {
    name: 'AWS IAM Identity Center (SSO)',
    icon: '🔑',
    color: '#E7157B',
    bundle: 'Free',
    complexity: 'Średnia',
    when: 'Single Sign-On dla wszystkich kont AWS. Jeden login → dostęp do wielu kont z różnymi rolami. Integruje się z AD, Okta, Azure AD. Zastępuje długoterminowe access keys dla developerów.',
    code: `# IAM Identity Center = AWS SSO v2
# Użytkownik: jedno konto (email) → dostęp do:
#   - Account A jako "AdministratorAccess"
#   - Account B jako "ReadOnlyAccess"
#   - Account C jako "DeveloperAccess"
# Zero długoterminowych access keys!

# Konfiguracja CLI (aws configure sso)
aws configure sso
# SSO session name: moja-firma
# SSO start URL: https://moja-firma.awsapps.com/start
# SSO region: eu-west-1
# → otworzy przeglądarkę, zaloguj się
# → wybierz konto i rolę

# Użycie profilu SSO
aws s3 ls --profile prod-admin
aws sts get-caller-identity --profile dev-readonly

# Odśwież token (ważny 8h)
aws sso login --profile prod-admin

# Permission Sets w Identity Center:
# - Gotowe AWS Managed: AdministratorAccess, ReadOnlyAccess, PowerUserAccess
# - Custom: definiujesz inline policies lub dołączasz managed policies

# Integracja z Okta:
# Okta jako Identity Provider → Identity Center → konta AWS
# Provisioning SCIM: automatyczne tworzenie/usuwanie userów`
  },,
  {
    name: 'AWS Certificate Manager (ACM) — SSL/TLS',
    icon: '🔒',
    color: '#FF9900',
    bundle: 'Free (public certs)',
    complexity: 'Niska',
    when: 'HTTPS dla ALB/CloudFront/API Gateway, certyfikaty wildcard, automatyczne odnowienie, private CA dla wewnętrznych serwisów',
    code: `# Poproś o publiczny certyfikat (DNS validation — zalecane)
aws acm request-certificate \\
  --domain-name "twoja-domena.pl" \\
  --subject-alternative-names "*.twoja-domena.pl" "www.twoja-domena.pl" \\
  --validation-method DNS \\
  --region eu-west-1

# Po stworzeniu: pobierz CNAME dla DNS validation
aws acm describe-certificate \\
  --certificate-arn arn:aws:acm:eu-west-1:123:certificate/xxx \\
  --query "Certificate.DomainValidationOptions[0].ResourceRecord"
# → {"Name":"_abc123.domena.pl.","Type":"CNAME","Value":"_xyz456.acm-validations.aws."}
# Dodaj CNAME do DNS → status ISSUED w ciągu kilku minut

# Podpnij do ALB
aws elbv2 create-listener \\
  --load-balancer-arn arn:aws:elasticloadbalancing:... \\
  --protocol HTTPS --port 443 \\
  --certificates CertificateArn=arn:aws:acm:eu-west-1:123:certificate/xxx \\
  --ssl-policy ELBSecurityPolicy-TLS13-1-2-2021-06 \\
  --default-actions Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:...

# CloudFront: region MUSI być us-east-1!
aws acm request-certificate \\
  --domain-name "cdn.twoja-domena.pl" \\
  --validation-method DNS \\
  --region us-east-1

# ACM Private CA — dla wewnętrznych serwisów (mikroserwisy, mTLS)
aws acm-pca create-certificate-authority \\
  --certificate-authority-configuration '{
    "KeyAlgorithm":"RSA_2048",
    "SigningAlgorithm":"SHA256WITHRSA",
    "Subject":{"Country":"PL","Organization":"MojaFirma","CommonName":"MojaFirma Internal CA"}
  }' \\
  --certificate-authority-type SUBORDINATE
# Cena: $400/mies per Private CA + $0.75 per wystawiony certyfikat`
  },
  {
    name: 'AWS Firewall Manager — Centralne WAF i Shield',
    icon: '🛡️',
    color: '#B71C1C',
    bundle: '$100/region/mies',
    complexity: 'Zaawansowana',
    when: 'Enterprise z wieloma kontami AWS — automatyczne wdrażanie WAF rules, Shield Advanced, Security Groups w CAŁEJ organizacji jednocześnie',
    code: `# Firewall Manager działa na poziomie Organizations
# Wymagania: AWS Organizations + Security Hub włączony + delegated admin

# Utwórz Policy — WAF dla wszystkich ALB w organizacji
aws fms create-policy --policy '{
  "PolicyName": "org-waf-policy",
  "SecurityServicePolicyData": {
    "Type": "WAFV2",
    "ManagedServiceData": "{
      \\"type\\":\\"WAFV2\\",
      \\"preProcessRuleGroups\\":[{
        \\"managedRuleGroupIdentifier\\":{
          \\"vendorName\\":\\"AWS\\",
          \\"managedRuleGroupName\\":\\"AWSManagedRulesCommonRuleSet\\"
        },
        \\"overrideAction\\":{\\"type\\":\\"NONE\\"},
        \\"ruleGroupArn\\":null,
        \\"excludeRules\\":[],
        \\"ruleGroupType\\":\\"ManagedRuleGroup\\"
      }],
      \\"postProcessRuleGroups\\":[],
      \\"defaultAction\\":{\\"type\\":\\"ALLOW\\"}
    }"
  },
  "ResourceType": "AWS::ElasticLoadBalancingV2::LoadBalancer",
  "ResourceTags": [],
  "ExcludeResourceTags": false,
  "RemediationEnabled": true,
  "IncludeMap": {"ORG_UNIT": ["ou-xxx-yyy"]}
}'

# Lista compliance per konto
aws fms list-compliance-status --policy-id policy-xxx \\
  --query "PolicyComplianceStatusList[*].[MemberAccount,EvaluationResults[0].ComplianceStatus]"
# → konta niezgodne są automatycznie remediowane (FMgr dodaje WAF do ich ALB)`
  },
  {
    name: 'AWS Resource Access Manager (RAM)',
    icon: '🤝',
    color: '#1565C0',
    bundle: 'Free',
    complexity: 'Średnia',
    when: 'Sharing zasobów między kontami AWS w organizacji: Subnet VPC, Transit Gateway, Route53 Resolver Rules, License Manager configs, EC2 Image Builder recipes',
    code: `# RAM umożliwia sharing zasobów między kontami bez konieczności duplikowania

# Przykład: Shared VPC subnets (hub-and-spoke networking)
# Jedno konto "network" ma VPC, inne konta wdrażają do shared subnetów

# Utwórz Resource Share
aws ram create-resource-share \\
  --name "shared-vpc-subnets-prod" \\
  --resource-arns \\
    "arn:aws:ec2:eu-west-1:123:subnet/subnet-prod-1a" \\
    "arn:aws:ec2:eu-west-1:123:subnet/subnet-prod-1b" \\
  --principals "arn:aws:organizations::123:ou/o-xxx/ou-yyy-zzz" \\
  --allow-external-principals false  # tylko w obrębie organizacji

# Lista zasobów współdzielonych z kontem
aws ram list-resources --resource-owner SELF --region eu-west-1

# W koncie "developer" — widzi shared subnety
aws ec2 describe-subnets --filters Name=owner-id,Values=123 \\
  --query "Subnets[].[SubnetId,AvailabilityZone,CidrBlock,Tags[?Key=='Name'].Value|[0]]"

# Deploy ECS Task do shared subnet (konto developera)
aws ecs create-service \\
  --cluster app-cluster \\
  --service-name api \\
  --task-definition api:3 \\
  --network-configuration '{
    "awsvpcConfiguration": {
      "subnets": ["subnet-prod-1a"],  # <-- subnet z network account!
      "securityGroups": ["sg-xxx"],
      "assignPublicIp": "DISABLED"
    }
  }'

# Inne zasoby które można sharować przez RAM:
# - Transit Gateway: aws ram create-resource-share --resource-arns arn:aws:ec2:...:transit-gateway/tgw-xxx
# - Route 53 Resolver Rules: dla DNS forwarding w multi-account
# - License Configs: BYOL (Bring Your Own License)`
  },
  {
    name: 'Amazon Cognito — User Pools i Identity Pools',
    icon: '👤',
    color: '#7B1FA2',
    bundle: '50k MAU free',
    complexity: 'Średnia',
    when: 'Autentykacja użytkowników w aplikacjach webowych/mobilnych: email+hasło, social login (Google/Facebook/Apple), MFA, JWT tokeny, federacja z AD/SAML',
    code: `import boto3
import json

cognito_idp = boto3.client('cognito-idp', region_name='eu-west-1')

# === USER POOLS — zarządzanie użytkownikami ===

# Utwórz User Pool
pool = cognito_idp.create_user_pool(
    PoolName='prod-users',
    Policies={
        'PasswordPolicy': {
            'MinimumLength': 8,
            'RequireUppercase': True,
            'RequireLowercase': True,
            'RequireNumbers': True,
            'RequireSymbols': False
        }
    },
    AutoVerifiedAttributes=['email'],
    MfaConfiguration='OPTIONAL',
    EmailConfiguration={
        'EmailSendingAccount': 'COGNITO_DEFAULT'
    },
    Schema=[
        {'Name': 'email', 'Required': True, 'Mutable': True},
        {'Name': 'name', 'Required': False, 'Mutable': True},
        {'Name': 'custom:role', 'AttributeDataType': 'String', 'Mutable': True}
    ]
)
user_pool_id = pool['UserPool']['Id']

# App Client (dla frontendu — bez secret)
client = cognito_idp.create_user_pool_client(
    UserPoolId=user_pool_id,
    ClientName='react-app',
    GenerateSecret=False,
    ExplicitAuthFlows=['ALLOW_USER_SRP_AUTH', 'ALLOW_REFRESH_TOKEN_AUTH'],
    SupportedIdentityProviders=['COGNITO', 'Google'],
    AllowedOAuthFlows=['code'],
    AllowedOAuthScopes=['email', 'openid', 'profile'],
    CallbackURLs=['https://app.example.com/callback'],
    LogoutURLs=['https://app.example.com/logout'],
    AllowedOAuthFlowsUserPoolClient=True
)

# Dodaj Social Identity Provider (Google)
cognito_idp.create_identity_provider(
    UserPoolId=user_pool_id,
    ProviderName='Google',
    ProviderType='Google',
    ProviderDetails={
        'client_id': 'GOOGLE_CLIENT_ID',
        'client_secret': 'GOOGLE_CLIENT_SECRET',
        'authorize_scopes': 'email profile openid'
    },
    AttributeMapping={'email': 'email', 'name': 'name', 'username': 'sub'}
)

# === IDENTITY POOLS — dostęp do AWS przez federated identity ===
cognito_identity = boto3.client('cognito-identity', region_name='eu-west-1')

identity_pool = cognito_identity.create_identity_pool(
    IdentityPoolName='prod-identity-pool',
    AllowUnauthenticatedIdentities=False,
    CognitoIdentityProviders=[{
        'ClientId': client['UserPoolClient']['ClientId'],
        'ProviderName': f'cognito-idp.eu-west-1.amazonaws.com/{user_pool_id}'
    }]
)
# Identity Pool → GetCredentialsForIdentity → tymczasowe AWS credentials
# Pozwala frontendowi bezpośrednio uploadować do S3, odczytywać z DynamoDB`
  },

],

};
