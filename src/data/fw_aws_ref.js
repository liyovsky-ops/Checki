export default {

rywale: [
  {
    name: 'Microsoft Azure',
    icon: '🔷',
    color: '#0078D4',
    tagline: 'Chmura dla enterprise, .NET i Microsoft stack',
    pros: [
      'Dominuje w enterprise (Active Directory, Office 365 integration)',
      'Najlepsza integracja z .NET, Windows Server, SQL Server',
      'Azure DevOps — kompletne CI/CD out of the box',
      'Hybrid cloud z Azure Arc (zarządzasz on-premises jak chmurą)',
      'Azure OpenAI Service — GPT-4, DALL-E przez Azure API',
      'Certyfikacje AZ-900 / AZ-204 wysoko cenione w Polsce',
    ],
    cons: [
      'Interfejs nieczytelny, dokumentacja chaotyczna',
      'Trudniejszy niż AWS dla nowych użytkowników',
      'Python/Linux support gorszy niż AWS',
      'Outages historycznie częstsze niż AWS',
    ],
    vsReact: 'AWS ma więcej serwisów i większy ekosystem. Azure wygrywa gdy firma już używa Microsoft stack (O365, Teams, Active Directory). W Polsce enterprise często wybiera Azure ze względu na compliance i znajomość Microsoft narzędzi.'
  },
  {
    name: 'Google Cloud Platform',
    icon: '🌈',
    color: '#4285F4',
    tagline: 'Najlepszy ML/AI i Kubernetes (twórcy K8s)',
    pros: [
      'BigQuery — najszybszy serverless data warehouse, SQL na petabajtach',
      'GKE (Kubernetes) — najdojrzalszy managed K8s, Google stworzył K8s',
      'Vertex AI / AutoML — state-of-the-art machine learning platform',
      'Gemini API — najszybszy dostęp do modeli Google (Gemini Pro, Ultra)',
      'Firebase — mobile backend (realtime DB, auth, hosting) bezpłatnie do limitu',
      'Tańszy transfer danych niż AWS w wielu przypadkach',
      'Carbon neutral od 2007, net zero cel 2030',
    ],
    cons: [
      'Mniej serwisów niż AWS (ale najważniejsze są)',
      'Google ma tendencję do killowania produktów (Google Graveyard)',
      'Mniejsza społeczność, mniej tutoriali niż AWS',
      'Enterprise support i SLA gorsze niż AWS/Azure',
    ],
    vsReact: 'GCP wygrywa jeśli potrzebujesz ML/AI, BigQuery analytics lub tworzysz na K8s. AWS wygrywa breadth of services i ekosystem. Dla Python data science GCP bywa bardziej naturalny.'
  },
  {
    name: 'DigitalOcean',
    icon: '🌊',
    color: '#0080FF',
    tagline: 'Prosty VPS dla developerów i startupów',
    pros: [
      'Prostota — interfejs zrozumiały w 10 minut',
      'Cena — $4-6/mies za Droplet vs $8+ za EC2 t3.micro',
      'Przewidywalne ceny (flat rate, nie pay-per-request)',
      'Managed Kubernetes (DOKS) prosto i tanio',
      'App Platform — PaaS jak Heroku, deploy z GitHub w minuty',
      'Świetna dokumentacja i tutoriale',
    ],
    cons: [
      'Znacznie mniej serwisów niż AWS (brak ML, brak zaawansowanego storage)',
      'Mniejsza skalowalność dla bardzo dużych workloadów',
      'Mniej regionów (15 vs 30+ AWS)',
      'Brak certyfikacji compliance (HIPAA, PCI-DSS) na wielu serwisach',
    ],
    vsReact: 'DigitalOcean idealny dla: freelancerów, małych projektów, prostych API, stron. AWS gdy potrzebujesz zaawansowanych serwisów (ML, analytics, compliance), scale lub enterprise features.'
  },
  {
    name: 'Hetzner Cloud',
    icon: '🟠',
    color: '#D50C2D',
    tagline: 'Najtańszy europejski hosting — stosunek ceny do wydajności',
    pros: [
      'Najlepsza cena — 5-10x tańszy od AWS za surowe compute',
      'Europejskie data centers (Frankfurt, Helsinki, Ashburn)',
      'GDPR natywnie (dane w UE)',
      'Prosta, przewidywalna cennik',
      'Dobry dla self-hosted: Plausible, Matomo, Nextcloud, GitLab',
    ],
    cons: [
      'Brak managed serwisów (żadnych managed DB, queues, ML)',
      'Mała ekosystem i community w porównaniu z AWS',
      'Brak certyfikacji enterprise (HIPAA itd.)',
      'Musisz wszystko samodzielnie zarządzać',
    ],
    vsReact: 'Hetzner = VPS ze świetną ceną. AWS = platforma ze 200+ serwisami. Hetzner dla własnych projektów, blogów, dev środowisk. AWS gdy potrzebujesz SLA, compliance, managed serwisów.'
  },
  {
    name: 'Vercel / Netlify',
    icon: '▲',
    color: '#000000',
    tagline: 'Frontend-first deployment — zero config, deploy w sekundy',
    pros: [
      'Deploy z GitHub w 30 sekund — push = live',
      'Preview deployments per PR — każdy PR = własny URL',
      'Edge Functions na globalnej sieci (jak Lambda@Edge bez konfiguracji)',
      'Wbudowane: HTTPS, CDN, analytics, A/B testing',
      'Zero-config dla Next.js (Vercel stworzył Next.js), Astro, SvelteKit',
      'Bezpłatny tier wystarczający dla projektów osobistych',
    ],
    cons: [
      'Tylko frontend + serverless functions — brak baz danych, queues itp.',
      'Drogi przy skali (spikes kosztów)',
      'Vendor lock-in dla Next.js features (Server Actions, Edge Middleware)',
      'Limity na funkcje serverless',
    ],
    vsReact: 'Vercel/Netlify = najszybszy deploy frontendu. AWS gdy masz backend, bazy danych, złożoną infrastrukturę. Kombinacja: Vercel (frontend) + AWS (backend) = popularne w startupach.'
  },
],

pluginy: [
  {
    name: 'Amazon S3 + Static Hosting',
    icon: '🪣',
    color: '#569A31',
    tagline: 'Hosting statycznej strony za ~$0.05/mies',
    install: 'aws s3 mb s3://moja-strona.pl --region eu-west-1',
    use: 'S3 Static Website Hosting + CloudFront CDN + Route 53. Idealne dla: React/Vue SPA, Gatsby, Next.js statyczne. Zero serwera, zero downtime, globalny CDN.',
    example: `# Włącz static hosting na buckecie
aws s3 website s3://moja-strona.pl \
  --index-document index.html \
  --error-document error.html

# Deploy buildu
npm run build
aws s3 sync ./dist s3://moja-strona.pl --delete \
  --cache-control "max-age=31536000" \
  --exclude "index.html"
aws s3 cp dist/index.html s3://moja-strona.pl/ \
  --cache-control "no-cache"

# Invaliduj CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id EXXX --paths "/*"`
  },
  {
    name: 'Amazon SQS — Message Queue',
    icon: '📨',
    color: '#FF4F8B',
    tagline: 'Asynchroniczne przetwarzanie — oddziel producenta od konsumenta',
    install: 'aws sqs create-queue --queue-name zamowienia --attributes VisibilityTimeout=30',
    use: 'Asynchroniczny messaging. API wysyła do kolejki → Worker przetwarza. Retry, DLQ, scale workers niezależnie. Fan-out: SQS + SNS = jeden event do wielu kolejek.',
    example: `# Wyślij wiadomość
aws sqs send-message \
  --queue-url https://sqs.eu-west-1.amazonaws.com/123/zamowienia \
  --message-body '{"order_id": 42, "items": ["pizza"]}'

# Lambda trigger (serverless consumer)
# SQS → Lambda: automatyczny polling, batch size 1-10000
import json
def handler(event, context):
    for record in event['Records']:
        order = json.loads(record['body'])
        process_order(order['order_id'])
    # Nie rzucaj wyjątku = SQS usuwa wiadomości
    # Rzuć wyjątek = SQS retry (VisibilityTimeout), po N razach → DLQ`
  },
  {
    name: 'Amazon EventBridge — Event Bus',
    icon: '⚡',
    color: '#FF9900',
    tagline: 'Serverless event bus — decoupled microservices',
    install: 'aws events create-event-bus --name moje-eventy',
    use: 'Routing eventów między serwisami bez bezpośrednich połączeń. Reguły filtrują eventy i routują do Lambda, SQS, SNS, Step Functions, inne konta AWS. Harmonogram zadań (Scheduler).',
    example: `# Wyślij event do EventBridge
aws events put-events --entries '[{
  "Source": "com.moja-app.zamowienia",
  "DetailType": "Zamowienie.Zlozono",
  "Detail": "{\"orderId\": 42, \"total\": 99.99}",
  "EventBusName": "moje-eventy"
}]'

# Reguła: order.created → Lambda notification service
# EventPattern:
{
  "source": ["com.moja-app.zamowienia"],
  "detail-type": ["Zamowienie.Zlozono"],
  "detail": {
    "total": [{"numeric": [">=", 100]}]  # tylko zamówienia >= 100 zł
  }
}

# Harmonogram: cron job co godzinę
aws scheduler create-schedule --name hourly-report \
  --schedule-expression "rate(1 hour)" \
  --target '{"Arn": "arn:aws:lambda:...", "RoleArn": "..."}'`
  },
  {
    name: 'AWS Step Functions — Workflow Orchestration',
    icon: '🔀',
    color: '#FF4F8B',
    tagline: 'Wizualny orkiestrator złożonych procesów biznesowych',
    install: 'aws stepfunctions create-state-machine --name zamowienie-flow --definition file://flow.json --role-arn arn:...',
    use: 'Koordynacja wielu Lambdas, retry logic, parallel processing, human approval, error handling. Idealne: checkout flow, data pipeline, ML training pipeline, saga pattern.',
    example: `# State Machine Definition (ASL — Amazon States Language)
{
  "Comment": "Przetwarzanie zamówienia",
  "StartAt": "ValidateOrder",
  "States": {
    "ValidateOrder": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:...:validate",
      "Next": "ProcessPayment",
      "Retry": [{"ErrorEquals": ["Lambda.ServiceException"], "MaxAttempts": 3}],
      "Catch": [{"ErrorEquals": ["ValidationError"], "Next": "OrderFailed"}]
    },
    "ProcessPayment": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:...:payment",
      "Next": "ParallelFulfillment"
    },
    "ParallelFulfillment": {
      "Type": "Parallel",
      "Branches": [
        {"StartAt": "SendEmail", "States": {"SendEmail": {"Type": "Task", "Resource": "arn:...email", "End": true}}},
        {"StartAt": "UpdateInventory", "States": {"UpdateInventory": {"Type": "Task", "Resource": "arn:...inventory", "End": true}}}
      ],
      "End": true
    }
  }
}`
  },
  {
    name: 'Amazon Bedrock — Foundation Models API',
    icon: '🤖',
    color: '#8C4FFF',
    tagline: 'Claude, Llama, Titan, Mistral przez jeden AWS API',
    install: 'pip install boto3  # Bedrock jest w boto3',
    use: 'Dostęp do wielu Foundation Models przez jeden API bez zarządzania infrastrukturą. Claude (Anthropic), Llama 3 (Meta), Mistral, Titan (Amazon), Stable Diffusion. RAG z Knowledge Bases, Agents for Bedrock.',
    example: `import boto3, json

client = boto3.client('bedrock-runtime', region_name='us-east-1')

# Wywołaj Claude 3.5 Sonnet
response = client.invoke_model(
    modelId='anthropic.claude-3-5-sonnet-20241022-v2:0',
    body=json.dumps({
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 1024,
        "messages": [{
            "role": "user",
            "content": "Przetłumacz na angielski: Dzień dobry"
        }]
    })
)
result = json.loads(response['body'].read())
print(result['content'][0]['text'])

# Bedrock Agents: autonomiczny agent z dostępem do narzędzi (API, bazy)
# Knowledge Bases: RAG na własnych dokumentach (S3 → Embeddings → OpenSearch)`
  },
  {
    name: 'Amazon SageMaker — ML Platform',
    icon: '🧠',
    color: '#C925D1',
    tagline: 'Build, train, deploy modeli ML w pełnym cyklu życia',
    install: 'pip install sagemaker',
    use: 'Managed Jupyter notebooks, distributed training (GPU clusters), AutoML (Autopilot), model registry, real-time endpoints, batch transform, MLOps pipelines, Feature Store. Cały ML lifecycle na AWS.',
    example: `import sagemaker
from sagemaker.sklearn import SKLearn

session = sagemaker.Session()
role = sagemaker.get_execution_role()

# Training job na managed EC2 (nie płacisz gdy nie trenujesz!)
estimator = SKLearn(
    entry_point='train.py',
    role=role,
    instance_type='ml.m5.xlarge',
    instance_count=1,
    framework_version='1.2-1',
    hyperparameters={'n-estimators': 100, 'max-depth': 5}
)

estimator.fit({'train': 's3://bucket/train/', 'test': 's3://bucket/test/'})

# Deploy jako real-time endpoint
predictor = estimator.deploy(
    initial_instance_count=1,
    instance_type='ml.t2.medium'
)
result = predictor.predict([[5.1, 3.5, 1.4, 0.2]])`
  },
  {
    name: 'Amazon Rekognition — Vision AI',
    icon: '👁️',
    color: '#14AAF5',
    tagline: 'Analiza obrazów i wideo — twarze, obiekty, tekst, moderacja',
    install: 'pip install boto3',
    use: 'Detekcja obiektów i scen, rozpoznawanie twarzy (porównanie, wyszukiwanie, emocje, wiek), OCR (tekst w obrazach), moderacja treści (NSFW), analiza PPE (kaski, kamizelki). Gotowe modele — zero ML knowledge.',
    example: `import boto3

rekognition = boto3.client('rekognition', region_name='eu-west-1')

# Wykryj obiekty i sceny na zdjęciu
response = rekognition.detect_labels(
    Image={'S3Object': {'Bucket': 'moje-zdjecia', 'Name': 'foto.jpg'}},
    MaxLabels=10,
    MinConfidence=70
)
for label in response['Labels']:
    print(f"{label['Name']}: {label['Confidence']:.1f}%")
# → Person: 99.2%, Outdoor: 95.4%, Car: 87.1%

# Moderacja treści (NSFW filter)
response = rekognition.detect_moderation_labels(
    Image={'Bytes': open('image.jpg', 'rb').read()}
)
for label in response['ModerationLabels']:
    print(f"[FLAGA] {label['Name']}: {label['Confidence']:.1f}%")`
  },
  {
    name: 'Amazon Kinesis — Streaming Data',
    icon: '🌊',
    color: '#8C4FFF',
    tagline: 'Real-time streaming — logi, eventy, IoT data w czasie rzeczywistym',
    install: 'pip install boto3',
    use: 'Trzy komponenty:\n• Kinesis Data Streams — ingest i przetwarzanie real-time (clickstream, logi, transakcje)\n• Kinesis Data Firehose — streaming do S3/Redshift/OpenSearch bez kodu (ETL on-the-fly)\n• Kinesis Data Analytics — SQL lub Apache Flink na streamach\n\nIdealne: clickstream analytics, anomaly detection, real-time dashboards, IoT telemetry.',
    example: `import boto3, json, time

kinesis = boto3.client('kinesis', region_name='eu-west-1')

# Wyślij event do streamu (producer)
kinesis.put_record(
    StreamName='klikniecia-uzytkownikow',
    Data=json.dumps({
        'userId': 'u123',
        'action': 'add_to_cart',
        'productId': 'p456',
        'timestamp': int(time.time())
    }),
    PartitionKey='u123'  # Shard routing key
)

# Consumer (Lambda trigger lub własny)
# Kinesis → Lambda: automatyczny polling co 1s
def handler(event, context):
    for record in event['Records']:
        import base64
        data = json.loads(base64.b64decode(record['kinesis']['data']))
        print(f"User {data['userId']}: {data['action']}")`
  },
  {
    name: 'Amazon Athena — Serverless SQL na S3',
    icon: '🔎',
    color: '#569A31',
    tagline: 'Zapytania SQL na plikach w S3 — bez serwera, $5/TB',
    install: 'aws athena create-work-group --name moja-analiza',
    use: 'Analizuj logi, CloudTrail events, CSV/JSON/Parquet/ORC bezpośrednio w S3. Nie potrzebujesz ładować danych do bazy. Płacisz $5/TB danych skanowanych (Parquet ~10x tańszy niż JSON).',
    example: `-- Utwórz tabelę na logi ALB w S3
CREATE EXTERNAL TABLE alb_logs (
    type string, time string, elb string,
    client_ip string, target_ip string,
    request_processing_time double,
    target_processing_time double,
    elb_status_code int,
    request_verb string, request_url string
)
ROW FORMAT SERDE 'org.apache.hadoop.hive.serde2.RegexSerDe'
LOCATION 's3://moje-logi/alb/AWSLogs/123/elasticloadbalancing/eu-west-1/2024/'

-- Znajdź TOP 10 najwolniejszych endpointów
SELECT request_url,
       COUNT(*) as requests,
       AVG(target_processing_time) as avg_ms,
       PERCENTILE_APPROX(target_processing_time, 0.99) as p99_ms
FROM alb_logs
WHERE time LIKE '2024-01-15%'
  AND elb_status_code = 200
GROUP BY request_url
ORDER BY avg_ms DESC
LIMIT 10`
  },
  {
    name: 'AWS Amplify — Full-Stack Web & Mobile',
    icon: '📱',
    color: '#FF9900',
    tagline: 'Deploy frontendu i backendu w minuty z GitHub',
    install: 'npm install -g @aws-amplify/cli && amplify configure',
    use: 'Hosting (jak Vercel ale na AWS), CI/CD, Authentication (Cognito), API (REST/GraphQL przez AppSync), Storage (S3), Functions (Lambda), DataStore (DynamoDB offline-first). Idealne dla React/Vue/Angular/Next.js aplikacji.',
    example: `# Inicjalizuj Amplify w projekcie React
amplify init
# Wybierz: framework=React, src directory=src, build=build

# Dodaj autentykację (Cognito w tle)
amplify add auth
amplify push

# Kod React — login w 3 linijki
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Witaj {user.username}!</h1>
          <button onClick={signOut}>Wyloguj</button>
        </main>
      )}
    </Authenticator>
  );
}

# Deploy hosting
amplify add hosting  # lub amplify console
amplify publish      # build + deploy`
  },
  {
    name: 'AWS Glue — Serverless ETL',
    icon: '🔗',
    color: '#8C4FFF',
    tagline: 'Serverless ETL — transformuj dane między serwisami',
    install: '# Glue — zarządzany przez AWS Console / CDK',
    use: 'Serverless ETL (Extract, Transform, Load) za pomocą Apache Spark. Data Catalog (metadane o tabelach w S3, RDS, Redshift). Crawlers automatycznie odkrywają schema danych. Glue Studio = visual ETL bez kodu.',
    example: `# Glue Job (PySpark) — transformacja CSV → Parquet
import sys
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from awsglue.context import GlueContext
from awsglue.job import Job

sc = SparkContext()
glueContext = GlueContext(sc)
spark = glueContext.spark_session

# Wczytaj dane z S3 przez Data Catalog
datasource = glueContext.create_dynamic_frame.from_catalog(
    database="moja-baza",
    table_name="raw_orders"
)

# Transformacja
transformed = datasource.filter(
    lambda x: x["status"] == "completed"
).map_fields({"order_id": "id", "customer_id": "cust_id"})

# Zapisz jako Parquet (10x mniej danych do Athena)
glueContext.write_dynamic_frame.from_options(
    frame=transformed,
    connection_type="s3",
    connection_options={"path": "s3://datalake/processed/orders/"},
    format="parquet",
    format_options={"compression": "snappy"}
)`
  },
  {
    name: 'Amazon RDS + Aurora — Managed Relational DBs',
    icon: '🗄️',
    color: '#2496ED',
    tagline: 'PostgreSQL, MySQL, Aurora — zarządzane, HA, automatyczne backup',
    install: 'aws rds create-db-instance --db-instance-identifier prod-db --db-instance-class db.t3.medium --engine postgres ...',
    use: 'RDS zarządza: OS patching, backupy (do 35 dni PITR), Multi-AZ failover (<2min), read replicas (do 15), monitoring. Aurora = AWS-własny engine 5x szybszy niż MySQL, serverless option, Global Database (multi-region).',
    example: `# RDS PostgreSQL — tworzenie przez CDK
const db = new rds.DatabaseInstance(this, 'ProdDB', {
  engine: rds.DatabaseInstanceEngine.postgres({
    version: rds.PostgresEngineVersion.VER_16_2
  }),
  instanceType: ec2.InstanceType.of(
    ec2.InstanceClass.T3, ec2.InstanceSize.MEDIUM
  ),
  multiAz: true,           // automatyczny failover
  storageEncrypted: true,   // KMS encryption
  backupRetention: cdk.Duration.days(7),
  deletionProtection: true,
  vpc,
  vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS }
});

# Aurora Serverless v2 — skaluje się automatycznie 0.5-128 ACU
# Płacisz tylko za aktualnie używane ACU (bez idle costs)
# Idealne: dev/staging, nieregularne workloady`
  },
  {
    name: 'Amazon DynamoDB — NoSQL na dużą skalę',
    icon: '⚡',
    color: '#4AB29A',
    tagline: 'Serverless NoSQL — single-digit millisecond latency, unlimited scale',
    install: 'aws dynamodb create-table --table-name Orders --attribute-definitions ...',
    use: 'Key-value i document store. Serverless (On-Demand: płacisz per request) lub Provisioned (zarezerwujesz RCU/WCU). Global Tables = multi-region, multi-active replikacja. DynamoDB Streams = CDC events. TTL = automatyczne usuwanie starych danych.',
    example: `import boto3
from boto3.dynamodb.conditions import Key, Attr

table = boto3.resource('dynamodb').Table('Orders')

# Zapisz
table.put_item(Item={
    'userId': 'u123',          # Partition Key
    'orderId': 'o456',         # Sort Key
    'status': 'pending',
    'total': 99.99,
    'ttl': int(time.time()) + 86400 * 30  # usuń po 30 dniach
})

# Zapytaj (tylko PK + SK → szybkie i tanie)
response = table.query(
    KeyConditionExpression=Key('userId').eq('u123') & Key('orderId').begins_with('o')
)

# NIGDY nie używaj scan() na dużej tabeli — skanuje WSZYSTKO
# Projektuj pod access patterns: PK=userId, SK=orderId
# GSI (Global Secondary Index) dla innych access patterns`
  },
],

};
