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
  {
    name: 'Amazon OpenSearch Service',
    icon: '🔎',
    color: '#005EB8',
    tagline: 'Full-text search, log analytics i observability (Elasticsearch compatible)',
    install: 'pip install opensearch-py',
    use: 'Managed Elasticsearch/OpenSearch. Full-text search (e-commerce, katalogi), log analytics (ELK stack bez zarządzania), anomaly detection, observability. Integruje się z Kinesis Firehose, CloudWatch, S3.',
    example: `from opensearchpy import OpenSearch, RequestsHttpConnection
from requests_aws4auth import AWS4Auth
import boto3

# Połączenie z IAM auth
credentials = boto3.Session().get_credentials()
awsauth = AWS4Auth(credentials.access_key, credentials.secret_key,
                  'eu-west-1', 'es', session_token=credentials.token)

client = OpenSearch(
    hosts=[{'host': 'moj-domain.eu-west-1.es.amazonaws.com', 'port': 443}],
    http_auth=awsauth,
    use_ssl=True,
    connection_class=RequestsHttpConnection
)

# Indexuj dokument
client.index(index='products', id='p-123', body={
    'name': 'Laptop Dell XPS 15',
    'description': 'Ultracienki laptop z OLED i7 32GB RAM',
    'price': 4999.99,
    'category': 'electronics'
})

# Wyszukaj full-text z fuzzy matching
results = client.search(index='products', body={
    'query': {
        'multi_match': {
            'query': 'laptop dell',
            'fields': ['name^3', 'description'],
            'fuzziness': 'AUTO'
        }
    },
    'highlight': {'fields': {'name': {}, 'description': {}}}
})`
  },
  {
    name: 'Amazon MSK — Managed Kafka',
    icon: '📨',
    color: '#231F20',
    tagline: 'Apache Kafka jako managed service — event streaming na skalę',
    install: 'pip install confluent-kafka',
    use: 'Apache Kafka bez zarządzania infrastrukturą. Event streaming w czasie rzeczywistym, log aggregation, change data capture (CDC z Debezium), microservice decoupling. MSK Serverless = bez zarządzania capacity.',
    example: `from confluent_kafka import Producer, Consumer

# Producer
producer = Producer({
    'bootstrap.servers': 'b-1.moj-klaster.xxx.kafka.eu-west-1.amazonaws.com:9092,b-2...',
    'security.protocol': 'SASL_SSL',
    'sasl.mechanism': 'AWS_MSK_IAM',
    'sasl.jaas.config': 'software.amazon.msk.auth.iam.IAMLoginModule required;',
})

producer.produce(
    'zamowienia',
    key='order-456',
    value='{"orderId":"456","total":99.99}',
    callback=lambda err, msg: print(f'Delivered: {msg.offset()}' if not err else f'Error: {err}')
)
producer.flush()

# Consumer — group consumption
consumer = Consumer({
    'bootstrap.servers': '...',
    'group.id': 'payment-service',
    'auto.offset.reset': 'earliest',
    'enable.auto.commit': False,
})
consumer.subscribe(['zamowienia'])

while True:
    msg = consumer.poll(1.0)
    if msg and not msg.error():
        process_order(msg.value())
        consumer.commit()  # manual commit po przetworzeniu

# MSK vs SQS/SNS:
# MSK: wysoka przepustowość, replay danych (retention), ordered per partition
# SQS: proste queue, managed consumers, auto-delete po przetworzeniu`
  },
  {
    name: 'AWS AppSync — GraphQL API',
    icon: '📡',
    color: '#E535AB',
    tagline: 'Managed GraphQL z real-time subscriptions i offline sync',
    install: 'npm install @aws-amplify/api-graphql',
    use: 'GraphQL API zarządzane przez AWS. Resolvers do DynamoDB, Lambda, RDS, HTTP. Real-time subscriptions przez WebSocket. Offline sync dla aplikacji mobilnych. Integruje się z Cognito dla autoryzacji.',
    example: `# schema.graphql
type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    owner: String
}

type Query {
    getTodo(id: ID!): Todo
    listTodos: [Todo]
}

type Mutation {
    createTodo(title: String!): Todo
    updateTodo(id: ID!, completed: Boolean!): Todo
}

type Subscription {
    onCreateTodo: Todo
        @aws_subscribe(mutations: ["createTodo"])
}

# Resolver na DynamoDB (VTL mapping template)
# Request: {"version": "2018-05-29", "operation": "PutItem", ...}

// React frontend — real-time updates
import { API, graphqlOperation } from '@aws-amplify/api';
import { onCreateTodo } from './graphql/subscriptions';

const subscription = API.graphql(graphqlOperation(onCreateTodo))
    .subscribe({
        next: ({ value }) => {
            console.log('Nowe todo:', value.data.onCreateTodo);
            setTodos(prev => [...prev, value.data.onCreateTodo]);
        }
    });`
  },
  {
    name: 'Amazon QuickSight — Business Intelligence',
    icon: '📊',
    color: '#8C4FFF',
    tagline: 'Serverless BI — dashboardy i wizualizacje danych bez serwera',
    install: '# QuickSight przez konsolę AWS lub API',
    use: 'Managed BI/dashboarding. Połącz z Athena, Redshift, RDS, S3, DynamoDB, Salesforce. SPICE (Super-fast Parallel In-memory Calculation Engine) — cache danych dla szybkich zapytań. Embed dashboardy w aplikacjach (QuickSight Embedded).',
    example: `import boto3

qs = boto3.client('quicksight', region_name='eu-west-1')
ACCOUNT_ID = '123456789'

# Utwórz DataSource (połączenie z Athena)
qs.create_data_source(
    AwsAccountId=ACCOUNT_ID,
    DataSourceId='athena-prod',
    Name='Prod Athena',
    Type='ATHENA',
    DataSourceParameters={
        'AthenaParameters': {'WorkGroup': 'primary'}
    },
    Permissions=[{
        'Principal': f'arn:aws:quicksight:eu-west-1:{ACCOUNT_ID}:user/default/admin',
        'Actions': ['quicksight:DescribeDataSource', 'quicksight:PassDataSource']
    }]
)

# Embed dashboard w aplikacji (bez logowania do AWS)
response = qs.generate_embed_url_for_anonymous_user(
    AwsAccountId=ACCOUNT_ID,
    Namespace='default',
    ExperienceConfiguration={
        'Dashboard': {'InitialDashboardId': 'sprzedaz-dashboard'}
    },
    SessionLifetimeInMinutes=120,
    AllowedDomains=['https://moja-app.pl']
)
embed_url = response['EmbedUrl']
# → wstaw <iframe src="{embed_url}"> w swoim UI`
  },
  {
    name: 'Amazon EMR — Big Data (Hadoop/Spark)',
    icon: '🔥',
    color: '#E7157B',
    tagline: 'Managed Apache Spark, Hadoop, Hive, Presto na EC2 lub Serverless',
    install: 'pip install pyspark boto3',
    use: 'Przetwarzanie petabajtowych zbiorów danych przez Apache Spark, Hadoop, Hive, Presto, Flink. EMR Serverless = bez zarządzania klastrem. EMR on EKS = Spark na K8s. Integruje się natywnie z S3.',
    example: `# PySpark job na EMR
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, sum, avg, window

spark = SparkSession.builder \
    .appName("SalesAnalysis") \
    .config("spark.sql.adaptive.enabled", "true") \
    .getOrCreate()

# Wczytaj z S3 (EMR ma natywny dostęp bez konfiguracji)
df = spark.read.parquet("s3://moj-datalake/sales/year=2024/")

# Agregacja: przychód per produkt per miesiąc
monthly_revenue = df \
    .filter(col("status") == "completed") \
    .groupBy(
        window(col("order_date"), "1 month").alias("period"),
        col("product_id")
    ) \
    .agg(
        sum("revenue").alias("total_revenue"),
        avg("revenue").alias("avg_order_value")
    ) \
    .orderBy(col("total_revenue").desc())

# Zapisz wynik do S3 jako Parquet
monthly_revenue.write \
    .mode("overwrite") \
    .partitionBy("period") \
    .parquet("s3://moj-datalake/analytics/monthly-revenue/")

# Submit job na EMR Serverless
aws emr-serverless start-job-run \
  --application-id app-xxx \
  --execution-role-arn arn:aws:iam::123:role/EMRRole \
  --job-driver '{"sparkSubmit":{"entryPoint":"s3://bucket/script.py"}}' \
  --configuration-overrides '{"monitoringConfiguration":{"s3MonitoringConfiguration":{"logUri":"s3://logs/"}}}'`
  },
  {
    name: 'Amazon Comprehend — NLP (Natural Language Processing)',
    icon: '🧠',
    color: '#C925D1',
    tagline: 'Analiza tekstu — sentiment, encje, języki, kluczowe frazy',
    install: 'pip install boto3',
    use: 'Pre-trained NLP models bez żadnego ML knowledge. Sentiment analysis (pozytywny/negatywny/neutralny), Named Entity Recognition (osoby, miejsca, organizacje), key phrases, language detection, PII detection. Custom Classifier dla własnych kategorii.',
    example: `import boto3

comprehend = boto3.client('comprehend', region_name='eu-west-1')

# Analiza sentiment (opinia klienta)
response = comprehend.detect_sentiment(
    Text="Ten laptop jest absolutnie fantastyczny! Czas pracy baterii jest świetny.",
    LanguageCode='pl'
)
print(response['Sentiment'])  # → POSITIVE
print(response['SentimentScore'])  # → {'Positive': 0.97, 'Negative': 0.01, ...}

# Named Entity Recognition
response = comprehend.detect_entities(
    Text="Jeff Bezos założył Amazon w Seattle w 1994 roku.",
    LanguageCode='pl'
)
for entity in response['Entities']:
    print(f"{entity['Type']}: {entity['Text']} ({entity['Score']:.2f})")
# → PERSON: Jeff Bezos (0.99)
# → ORGANIZATION: Amazon (0.98)
# → LOCATION: Seattle (0.97)
# → DATE: 1994 roku (0.87)

# Batch analysis — tani dla dużych woluminów
# Batch 25 tekstów: $0.0001/jednostka (min 3 jednostki per dokument)

# Custom Classifier — kategoryzuj własne dokumenty
# Trenuj na labeled data: train.csv (label, text)
# Potem: comprehend.classify_document(Text=..., EndpointArn=...)`
  },
  {
    name: 'Amazon Textract — OCR i Ekstrakcja Dokumentów',
    icon: '📄',
    color: '#FF9900',
    tagline: 'OCR z rozumieniem struktury — tabele, formularze, kluczowe pola',
    install: 'pip install boto3',
    use: 'Zaawansowane OCR. Nie tylko tekst — rozpoznaje tabele, formularze (klucz-wartość), checkboxy. Analyze Document dla specyficznych typów: ID (dowód, paszport), Lending (hipoteka), Expense (faktury). Queries API: "Jakie jest imię na tym dokumencie?"',
    example: `import boto3

textract = boto3.client('textract', region_name='eu-west-1')

# Ekstrakcja tekstu z faktury w S3
response = textract.analyze_document(
    Document={'S3Object': {'Bucket': 'dokumenty', 'Name': 'faktura.pdf'}},
    FeatureTypes=['FORMS', 'TABLES', 'QUERIES'],
    QueriesConfig={
        'Queries': [
            {'Text': 'Jaka jest całkowita kwota?'},
            {'Text': 'Kiedy jest termin płatności?'},
            {'Text': 'Numer faktury?'}
        ]
    }
)

# Przetwórz odpowiedź
for block in response['Blocks']:
    if block['BlockType'] == 'QUERY_RESULT':
        print(f"Odpowiedź: {block['Text']}")
    elif block['BlockType'] == 'KEY_VALUE_SET' and 'KEY' in block.get('EntityTypes', []):
        # Pola formularza (klucz-wartość)
        key_text = get_text(block, response['Blocks'])
        value_block = get_value_block(block, response['Blocks'])
        print(f"Pole: {key_text} = {get_text(value_block, response['Blocks'])}")

# Analyze ID Document — dowód osobisty, paszport
response = textract.analyze_id(
    DocumentPages=[{'S3Object': {'Bucket': 'docs', 'Name': 'passport.jpg'}}]
)
for field in response['IdentityDocuments'][0]['IdentityDocumentFields']:
    print(f"{field['Type']['Text']}: {field['ValueDetection']['Text']}")`
  },
  {
    name: 'Amazon Transcribe & Polly — Głos',
    icon: '🎙️',
    color: '#00A8E1',
    tagline: 'Speech-to-text i text-to-speech — AI głosowe bez modeli',
    install: 'pip install boto3',
    use: 'Transcribe: automatyczne transkrypcje rozmów, call center analytics, subtitle generation, live captions. Polly: text-to-speech w 60+ głosach, 30+ językach — generuj audiobooki, IVR, asystenci głosowi.',
    example: `import boto3

# ── Amazon Transcribe — speech to text ──
transcribe = boto3.client('transcribe', region_name='eu-west-1')

# Start transcription job (nagranie w S3)
transcribe.start_transcription_job(
    TranscriptionJobName='call-center-2024-01-15',
    Media={'MediaFileUri': 's3://nagrania/call-2024-01-15.mp3'},
    MediaFormat='mp3',
    LanguageCode='pl-PL',
    Settings={
        'ShowSpeakerLabels': True,   # rozróżnij mówców (diarization)
        'MaxSpeakerLabels': 2,
        'ShowAlternatives': True
    },
    ContentRedaction={
        'RedactionType': 'PII',      # automatycznie usuń dane osobowe
        'RedactionOutput': 'redacted'
    }
)

# ── Amazon Polly — text to speech ──
polly = boto3.client('polly', region_name='eu-west-1')

response = polly.synthesize_speech(
    Text="Witamy w systemie! Twoja rezerwacja została potwierdzona.",
    OutputFormat='mp3',
    VoiceId='Ewa',         # polski żeński głos Neural
    Engine='neural',       # naturalne brzmienie (Neural > Standard)
    LanguageCode='pl-PL',
    TextType='ssml'        # opcjonalnie SSML dla kontroli tonu/pauzy
)
audio_data = response['AudioStream'].read()
with open('odpowiedz.mp3', 'wb') as f:
    f.write(audio_data)`
  },
  {
    name: 'Amazon Lex — Chatboty i Voice Assistants',
    icon: '🤖',
    color: '#4AB29A',
    tagline: 'Ta sama technologia co Alexa — buduj chatboty bez ML',
    install: '# Lex konfigurowany przez Console lub CDK',
    use: 'Conversational AI: chatboty dla customer service, IVR (Interactive Voice Response), FAQ boty, zamówienia przez głos. Integruje się z Lambda (fulfillment), Connect (call center), Kendra (enterprise search).',
    example: `# Architektura Lex Bot:
# Intent = co użytkownik chce zrobić (ZamówPizzę, SprawdźStatus, PomocTechniczna)
# Slot = parametry intentu (rozmiar: duża/mała, adres dostawy, numer zamówienia)
# Utterance = przykładowe zdania dla każdego intentu
# Fulfillment = Lambda która realizuje intent

# Przykład Intent: SprawdzStatusZamowienia
# Utterances:
#   "Gdzie jest moje zamówienie?"
#   "Sprawdź status zamówienia {NumerZamowienia}"
#   "Kiedy dotrze {NumerZamowienia}?"

# Slot: NumerZamowienia (AMAZON.AlphaNumeric)
# Prompt: "Podaj numer zamówienia?"

# Lambda fulfillment
def handler(event, context):
    slots = event['sessionState']['intent']['slots']
    order_id = slots['NumerZamowienia']['value']['interpretedValue']

    order = db.get_order(order_id)
    message = f"Zamówienie {order_id}: {order['status']}. Oczekiwana dostawa: {order['eta']}"

    return {
        'sessionState': {
            'dialogAction': {'type': 'Close'},
            'intent': {'name': 'SprawdzStatusZamowienia', 'state': 'Fulfilled'}
        },
        'messages': [{'contentType': 'PlainText', 'content': message}]
    }

# Kanały: web widget, Slack, Facebook Messenger, Twilio, Amazon Connect`
  },
  {
    name: 'Amazon Personalize — Rekomendacje ML',
    icon: '💡',
    color: '#FF9900',
    tagline: 'Silnik rekomendacji jak Amazon.com — bez ML expertise',
    install: 'pip install boto3',
    use: 'Personalized recommendations: "Użytkownicy którzy kupili X kupili też Y", "Top picks for you", "Similar items", "Next best action". Gotowe przepisy ML. Integruje się z S3 (dane), Lambda (real-time). Netflix-style recommendations w godzinę.',
    example: `import boto3

personalize = boto3.client('personalize', region_name='eu-west-1')
personalize_runtime = boto3.client('personalize-runtime', region_name='eu-west-1')

# 1. Wgraj interakcje użytkownik-produkt do S3
# interactions.csv: USER_ID, ITEM_ID, TIMESTAMP, EVENT_TYPE
# users.csv: USER_ID, ageGroup, gender, country
# items.csv: ITEM_ID, PRICE, CATEGORY, BRAND

# 2. Utwórz Dataset Group + Datasets
personalize.create_dataset_group(name='moj-sklep-recommendations')

# 3. Wybierz przepis (recipe)
# aws-user-personalization → "For You" rekomendacje
# aws-similar-items → "Klienci kupili też"
# aws-popularity-count → najpopularniejsze
# aws-hrnn-metadata → z metadanymi produktów

# 4. Wytrenuj Solution Version (30-60 minut, płacisz za training hours)
# 5. Utwórz Campaign (real-time endpoint)

# Pobierz rekomendacje dla użytkownika
response = personalize_runtime.get_recommendations(
    campaignArn='arn:aws:personalize:eu-west-1:123:campaign/for-you',
    userId='user-123',
    numResults=10,
    filterArn='arn:...filter/exclude-purchased',  # wyklucz już kupione
    context={'device_type': 'mobile', 'time_of_day': 'evening'}
)
for item in response['itemList']:
    print(f"Produkt: {item['itemId']} (score: {item.get('score', 'N/A')})")`
  },
  {
    name: 'AWS Lake Formation — Data Lake',
    icon: '🏞️',
    color: '#569A31',
    tagline: 'Zarządzanie data lake — uprawnienia na poziomie kolumn i wierszy',
    install: 'aws lakeformation register-resource --resource-arn arn:aws:s3:::moj-datalake',
    use: 'Centralne zarządzanie dostępem do danych w S3 (data lake). Granularne uprawnienia: użytkownik A widzi kolumny A,B,C; użytkownik B nie widzi kolumny "wynagrodzenie". Row-level security. Integruje się z Athena, Redshift Spectrum, Glue, EMR.',
    example: `# Lake Formation = wastwa permissions na S3/Glue Data Catalog
# Bez Lake Formation: IAM + S3 bucket policies = trudne do zarządzania
# Z Lake Formation: GRANT jak w SQL — proste, centralne

# Zarejestruj S3 location jako Data Lake
aws lakeformation register-resource \
  --resource-arn arn:aws:s3:::moj-datalake \
  --role-arn arn:aws:iam::123:role/LakeFormationRole

# GRANT uprawnienia do tabeli (Athena/Glue)
aws lakeformation grant-permissions \
  --principal DataLakePrincipalIdentifier=arn:aws:iam::123:role/AnalystRole \
  --resource '{"Table": {"DatabaseName": "sales", "Name": "orders"}}' \
  --permissions SELECT

# GRANT z wykluczeniem wrażliwych kolumn
aws lakeformation grant-permissions \
  --principal DataLakePrincipalIdentifier=arn:aws:iam::123:role/JuniorAnalyst \
  --resource '{
    "TableWithColumns": {
      "DatabaseName": "hr",
      "Name": "employees",
      "ColumnWildcard": {
        "ExcludedColumnNames": ["salary", "ssn", "bank_account"]
      }
    }
  }' \
  --permissions SELECT

# Row-level filtering (LF-Tags based):
# Analityk widzi tylko wiersze gdzie region = "EU"
# Senior widzi wszystkie regiony
# Konfiguracja przez Data Filters w konsoli Lake Formation`
  },,
  {
    name: 'AWS IoT Core — Platforma IoT',
    icon: '📡',
    color: '#2E7D32',
    tagline: 'Polacz miliardy urzadzen IoT z chmura AWS przez MQTT/HTTP/WebSocket',
    install: 'pip install awsiotsdk boto3',
    use: 'Produkcja: urządzenia IoT → MQTT → IoT Core → Lambda/DynamoDB/S3/Kinesis',
    example: `import json, time
from awsiot import mqtt5_client_builder
from awscrt import mqtt5

# Inicjalizacja klienta (certyfikaty X.509 per urządzenie)
client = mqtt5_client_builder.mtls_from_path(
    endpoint="abc123.iot.eu-west-1.amazonaws.com",
    cert_filepath="device-cert.pem",
    pri_key_filepath="device-key.pem",
    ca_filepath="root-CA.crt",
    client_id="sensor-device-001"
)
client.start()

# Publish telemetria co 5 sekund
while True:
    payload = json.dumps({
        "deviceId": "sensor-001",
        "temperature": 22.5,
        "humidity": 65.2,
        "timestamp": int(time.time() * 1000)
    })
    client.publish(mqtt5.PublishPacket(
        topic="sensors/temperature/room-a",
        payload=payload.encode(),
        qos=mqtt5.QoS.AT_LEAST_ONCE
    ))
    time.sleep(5)

# IoT Rules Engine — reaguje na wiadomosci
# (konfiguracja przez AWS Console lub CLI)
# Rule: SELECT * FROM 'sensors/temperature/+' WHERE temperature > 30
# Action: Kinesis → Lambda (alert), DynamoDB (archive), SNS (notyfikacja)

# AWS CLI — zarządzanie urządzeniami
aws iot create-thing --thing-name sensor-device-001 \\
  --thing-type-name TemperatureSensor
aws iot create-keys-and-certificate --set-as-active \\
  --certificate-pem-outfile device-cert.pem \\
  --private-key-outfile device-key.pem
aws iot attach-thing-principal \\
  --thing-name sensor-device-001 \\
  --principal arn:aws:iot:eu-west-1:123:cert/abcdef...`
  },
  {
    name: 'Amazon Pinpoint — Mobile Analytics i Messaging',
    icon: '📱',
    color: '#6A0DAD',
    tagline: 'Wielokanałowa platforma marketingowa: push notifications, SMS, email, in-app messaging',
    install: 'pip install boto3  # lub AWS SDK dla iOS/Android',
    use: 'Mobile apps: push notifications + analytics. Marketing: segmented campaigns przez email/SMS',
    example: `import boto3

pinpoint = boto3.client('pinpoint', region_name='eu-west-1')
APP_ID = 'abc123'

# Wyslij transactional SMS
pinpoint.send_messages(
    ApplicationId=APP_ID,
    MessageRequest={
        'Addresses': {
            '+48123456789': {
                'ChannelType': 'SMS'
            }
        },
        'MessageConfiguration': {
            'SMSMessage': {
                'Body': 'Twoj kod weryfikacyjny: 123456. Wazny 5 minut.',
                'MessageType': 'TRANSACTIONAL'
            }
        }
    }
)

# Zarejestruj endpoint (urzadzenie mobilne)
pinpoint.update_endpoint(
    ApplicationId=APP_ID,
    EndpointId='user-123-ios-device',
    EndpointRequest={
        'Address': 'arn:aws:sns:...:endpoint/APNS/MyApp/token123',
        'ChannelType': 'APNS',
        'Attributes': {
            'plan': ['premium'],
            'country': ['PL']
        },
        'User': {
            'UserId': 'user-123',
            'UserAttributes': {
                'age': ['28'],
                'lastPurchase': ['2024-01-15']
            }
        }
    }
)

# Segmentacja + kampania push
# Segment: premium users w PL, ostatni zakup > 30 dni temu
# Kampania: "Tęsknimy za Tobą — 20% zniżki" → APNS/FCM push
pinpoint.create_campaign(
    ApplicationId=APP_ID,
    WriteCampaignRequest={
        'Name': 'Win-back Premium PL',
        'SegmentId': 'seg-premium-inactive',
        'Schedule': {'Frequency': 'ONCE', 'StartTime': '2024-02-01T10:00:00Z'},
        'MessageConfiguration': {
            'APNSMessage': {
                'Action': 'OPEN_APP',
                'Title': 'Tęsknimy za Tobą!',
                'Body': 'Specjalna oferta tylko dla Ciebie 🎁'
            }
        }
    }
)`
  },
  {
    name: 'Amazon Forecast — ML Time-Series',
    icon: '📈',
    color: '#FF6B35',
    tagline: 'AutoML dla prognozowania szeregów czasowych — bez wiedzy ML wymagane',
    install: 'pip install boto3',
    use: 'Prognozowanie popytu (retail), forecastowanie workloadów, planowanie zasobów',
    example: `import boto3
from datetime import datetime

forecast = boto3.client('forecast', region_name='eu-west-1')
forecast_query = boto3.client('forecastquery', region_name='eu-west-1')

# 1. Utwórz Dataset Group
forecast.create_dataset_group(
    DatasetGroupName='retail-demand',
    Domain='RETAIL'
)

# 2. Utwórz Dataset (schema historycznych sprzedaży)
forecast.create_dataset(
    DatasetName='sales-history',
    Domain='RETAIL',
    DatasetType='TARGET_TIME_SERIES',
    DataFrequency='D',  # dzienne dane
    Schema={
        'Attributes': [
            {'AttributeName': 'timestamp', 'AttributeType': 'timestamp'},
            {'AttributeName': 'target_value', 'AttributeType': 'float'},
            {'AttributeName': 'item_id', 'AttributeType': 'string'}
        ]
    }
)

# 3. Import danych z S3 (CSV: timestamp,target_value,item_id)
forecast.create_dataset_import_job(
    DatasetImportJobName='sales-2023-import',
    DatasetArn='arn:aws:forecast:...:dataset/sales-history',
    DataSource={'S3Config': {'Path': 's3://my-data/sales/', 'RoleArn': 'arn:...'}}
)

# 4. Trenuj model (AutoPredictor — Amazon dobiera algo automatycznie)
forecast.create_auto_predictor(
    PredictorName='sales-predictor-v1',
    ForecastHorizon=30,  # prognoza na 30 dni do przodu
    ForecastFrequency='D',
    DataConfig={'DatasetGroupArn': 'arn:...'},
    OptimizationMetric='WAPE'  # Weighted Absolute Percentage Error
)

# 5. Wygeneruj forecast
forecast.create_forecast(
    ForecastName='sales-forecast-jan2024',
    PredictorArn='arn:aws:forecast:...:predictor/sales-predictor-v1'
)

# 6. Zapytaj o prognozę dla produktu
response = forecast_query.query_forecast(
    ForecastArn='arn:aws:forecast:...:forecast/sales-forecast-jan2024',
    Filters={'item_id': 'product-SKU-001'},
    StartDate='2024-02-01T00:00:00',
    EndDate='2024-02-28T00:00:00'
)
# response['Forecast']['Predictions']['p50'] = prognoza mediany
# response['Forecast']['Predictions']['p10/p90'] = przedzialy ufnosci`
  },
  {
    name: 'AWS Elemental MediaConvert — Video Transcoding',
    icon: '🎬',
    color: '#E91E63',
    tagline: 'Transkodowanie wideo z S3 do S3 — HLS, DASH, MP4, wszelkie formaty i resolutions',
    install: 'pip install boto3',
    use: 'VOD platform: konwertuj uploaded video do multiple bitrates (adaptive streaming HLS/DASH)',
    example: `import boto3, json

# Pobierz endpoint MediaConvert (unikalny per konto)
mc_client = boto3.client('mediaconvert', region_name='eu-west-1')
endpoints = mc_client.describe_endpoints()
endpoint_url = endpoints['Endpoints'][0]['Url']

# Uzywaj dedykowanego endpointu
mc = boto3.client(
    'mediaconvert',
    region_name='eu-west-1',
    endpoint_url=endpoint_url
)

# Utwórz Job — transkoduj do HLS (adaptive bitrate) + MP4 (download)
response = mc.create_job(
    Role='arn:aws:iam::123:role/MediaConvertRole',
    Settings={
        'Inputs': [{
            'FileInput': 's3://input-bucket/raw-video.mp4',
            'VideoSelector': {},
            'AudioSelectors': {'Audio Selector 1': {'DefaultSelection': 'DEFAULT'}}
        }],
        'OutputGroups': [
            {
                'Name': 'HLS Group',
                'OutputGroupSettings': {
                    'Type': 'HLS_GROUP_SETTINGS',
                    'HlsGroupSettings': {
                        'Destination': 's3://output-bucket/videos/hls/',
                        'SegmentLength': 6,
                        'MinSegmentLength': 0
                    }
                },
                'Outputs': [
                    {
                        'NameModifier': '_1080p',
                        'VideoDescription': {'Width': 1920, 'Height': 1080, 'CodecSettings': {'Codec': 'H_264', 'H264Settings': {'Bitrate': 5000000}}},
                        'AudioDescriptions': [{'AudioSourceName': 'Audio Selector 1', 'CodecSettings': {'Codec': 'AAC', 'AacSettings': {'Bitrate': 128000}}}]
                    },
                    {
                        'NameModifier': '_720p',
                        'VideoDescription': {'Width': 1280, 'Height': 720, 'CodecSettings': {'Codec': 'H_264', 'H264Settings': {'Bitrate': 2500000}}},
                        'AudioDescriptions': [{'AudioSourceName': 'Audio Selector 1', 'CodecSettings': {'Codec': 'AAC', 'AacSettings': {'Bitrate': 128000}}}]
                    },
                    {
                        'NameModifier': '_480p',
                        'VideoDescription': {'Width': 854, 'Height': 480, 'CodecSettings': {'Codec': 'H_264', 'H264Settings': {'Bitrate': 1000000}}},
                        'AudioDescriptions': [{'AudioSourceName': 'Audio Selector 1', 'CodecSettings': {'Codec': 'AAC', 'AacSettings': {'Bitrate': 96000}}}]
                    }
                ]
            }
        ]
    }
)
print(f"Job ID: {response['Job']['Id']}")
# Status: SUBMITTED → PROGRESSING → COMPLETE
# Output w S3: videos/hls/video_1080p*.m3u8, *_720p*.m3u8 itp.
# Serwuj przez CloudFront → natywny adaptive bitrate w <video> tagu`
  },
  {
    name: 'Amazon Fraud Detector — ML Wykrywanie Fraudów',
    icon: '🛡️',
    color: '#C62828',
    tagline: 'Managed ML fraud detection — online payment fraud, account takeover, fake reviews',
    install: 'pip install boto3',
    use: 'Ecommerce: oceniaj fraud risk dla transakcji w real-time (milliseconds). Bez ML expertise.',
    example: `import boto3

fd = boto3.client('frauddetector', region_name='eu-west-1')

# 1. Zdefiniuj Event Type (co chcesz analizować)
fd.put_event_type(
    name='online-payment',
    entityTypes=['customer'],
    eventVariables=['ip_address', 'email_address', 'billing_zip', 
                    'card_bin', 'transaction_amount', 'payment_currency',
                    'user_agent', 'account_age_days']
)

# 2. Utwórz Detector (silnik decyzyjny)
fd.create_detector(
    detectorId='payment-fraud-detector',
    eventTypeName='online-payment',
    description='Real-time payment fraud scoring'
)

# 3. Zdefiniuj Outcomes (co zwracamy)
for outcome in ['approve', 'review', 'block']:
    fd.put_outcome(name=outcome)

# 4. Utwórz Rule (logika decyzyjna)
fd.create_rule(
    ruleId='block-high-risk',
    detectorId='payment-fraud-detector',
    expression='$model_score_high_risk > 0.8',  # ML model score
    outcomes=['block'],
    language='DETECTORPL'
)

# === Real-time scoring ===
response = fd.get_event_prediction(
    detectorId='payment-fraud-detector',
    detectorVersionId='1',
    eventId='txn-ord-12345',
    eventTypeName='online-payment',
    eventTimestamp='2024-01-15T10:30:00Z',
    entities=[{'entityType': 'customer', 'entityId': 'customer-001'}],
    eventVariables={
        'ip_address': '185.220.101.34',  # znany Tor exit node
        'email_address': 'buyer@newdomain.ru',
        'billing_zip': '90210',
        'card_bin': '426684',
        'transaction_amount': '1299.99',
        'payment_currency': 'USD',
        'account_age_days': '0'
    }
)

for rule_result in response['ruleResults']:
    print(f"Rule: {rule_result['ruleId']}, Outcome: {rule_result['outcomes']}")
# → Rule: block-high-risk, Outcome: ['block']
# Latency: < 30ms — realtime decision w flow platnosci`
  },

],

};
