export default [
  {
    category: 'Konfiguracja & Identity',
    icon: '⚙️',
    items: [
      { cmd: 'aws configure', desc: 'Ustaw Access Key, Secret, region i format wyjścia',
        detail: { what: 'Interaktywnie zapisuje dane do ~/.aws/credentials i ~/.aws/config. Cztery pola: Access Key ID, Secret Access Key, region (np. eu-west-1), output format (json/yaml/table/text).', how: 'aws configure [--profile nazwa]', flags: [{flag: '--profile prod', desc: 'Utwórz/edytuj nazwany profil'}], tips: ['aws configure list — sprawdź aktualną konfigurację', 'export AWS_PROFILE=prod — przełącz profil dla sesji', 'aws configure sso — konfiguracja SSO / Identity Center'] } },
      { cmd: 'aws sts get-caller-identity', desc: 'Kto jestem? Account ID, ARN, User ID',
        detail: { what: 'Zwraca Account ID, ARN i UserId aktualnych credentials. Najlepszy sposób żeby sprawdzić czy CLI jest poprawnie skonfigurowane i na którym koncie operujesz.', how: 'aws sts get-caller-identity [--profile nazwa]', tips: ['aws sts get-caller-identity --query Account --output text — sam numer konta', 'Zawsze sprawdź przed wykonywaniem destrukcyjnych operacji!'] } },
      { cmd: 'aws sts assume-role --role-arn arn:aws:iam::123:role/DeployRole --role-session-name deploy-session', desc: 'Przejmij rolę IAM (cross-account lub elevated)',
        detail: { what: 'Zwraca tymczasowe credentials (AccessKeyId, SecretAccessKey, SessionToken) dla podanej roli. Używane do cross-account access i privilege escalation w bezpieczny sposób.', how: 'aws sts assume-role --role-arn [ARN] --role-session-name [nazwa]', flags: [{flag: '--duration-seconds 3600', desc: 'Czas ważności (domyślnie 1h, max 12h)'}], tips: ['Wyeksportuj zmienne: export AWS_ACCESS_KEY_ID=... AWS_SECRET_ACCESS_KEY=... AWS_SESSION_TOKEN=...', 'aws sts decode-authorization-message — zdekoduj "Access Denied" błąd do czytelnej formy'] } },
    ]
  },
  {
    category: 'S3 — Object Storage',
    icon: '🪣',
    items: [
      { cmd: 'aws s3 ls s3://nazwa-bucketa/', desc: 'Lista plików w buckecie (bez argumentu: lista wszystkich bucketów)',
        detail: { what: 'Wyświetla obiekty w buckecie. Bez argumentu zwraca listę wszystkich bucketów konta z datami i nazwami.', how: 'aws s3 ls [s3://bucket/prefix]', flags: [{flag: '--recursive', desc: 'Wszystkie podfoldery'}, {flag: '--human-readable', desc: 'Rozmiar w KB/MB/GB'}, {flag: '--summarize', desc: 'Suma obiektów i rozmiaru na końcu'}], tips: ['aws s3 ls s3://bucket/ --recursive --human-readable --summarize', 'Wynik: data, czas, rozmiar, klucz obiektu'] } },
      { cmd: 'aws s3 cp plik.txt s3://bucket/folder/', desc: 'Kopiuj plik lokalnie ↔ S3',
        detail: { what: 'Kopiuje plik do S3, z S3, lub między bucketami. Obsługuje duże pliki przez multipart upload automatycznie (>8MB).', how: 'aws s3 cp [źródło] [cel]', flags: [{flag: '--recursive', desc: 'Kopiuj folder ze wszystkim'}, {flag: '--storage-class STANDARD_IA', desc: 'Klasa przechowywania (STANDARD/IA/GLACIER)'}, {flag: '--exclude "*.log"', desc: 'Wyklucz wzorzec'}, {flag: '--include "*.py"', desc: 'Uwzględnij wzorzec'}], tips: ['aws s3 cp s3://bucket/plik . — pobierz plik', 'aws s3 cp folder/ s3://bucket/folder/ --recursive'] } },
      { cmd: 'aws s3 sync ./dist s3://moja-strona.pl/ --delete', desc: 'Synchronizuj folder z S3 — deploy statycznej strony',
        detail: { what: 'Jak rsync — kopiuje tylko zmienione/nowe pliki. --delete usuwa z S3 pliki których nie ma lokalnie. Idealne do deploy stron statycznych.', how: 'aws s3 sync [źródło] [cel]', flags: [{flag: '--delete', desc: 'Usuń z celu pliki których nie ma w źródle'}, {flag: '--acl public-read', desc: 'Ustaw publiczny dostęp'}, {flag: '--cache-control "max-age=31536000"', desc: 'Cache nagłówki dla assets'}, {flag: '--exclude "*.DS_Store"', desc: 'Wyklucz śmieci macOS'}], tips: ['aws s3 sync s3://bucket/backup . — pobierz backup lokalnie', 'aws cloudfront create-invalidation -- po sync resetuj cache CDN'] } },
      { cmd: 'aws s3 presign s3://bucket/raport.pdf --expires-in 3600', desc: 'Wygeneruj tymczasowy link do prywatnego pliku',
        detail: { what: 'Tworzy podpisany URL ważny przez expires-in sekund. Pozwala komuś pobrać prywatny plik bez credentials i bez robienia bucketu publicznym.', how: '--expires-in [sekundy] — domyślnie 3600 (1h)', tips: ['boto3: s3.generate_presigned_url("get_object", ...) — presigned POST do uploadu', 'Presigned URL zawiera w sobie tymczasowe credentials — nie udostępniaj publiczne'] } },
      { cmd: 'aws s3 mb s3://moj-bucket-prod --region eu-central-1', desc: 'Utwórz nowy bucket S3',
        detail: { what: 'Tworzy bucket. Nazwa musi być globalnie unikalna wśród wszystkich kont AWS (nie tylko Twojego). Tylko małe litery, cyfry, myślniki.', how: 'aws s3 mb s3://nazwa [--region region]', tips: ['ZAWSZE podawaj --region — bez niego ląduje w us-east-1', 'aws s3 rb s3://bucket --force — usuń bucket z całą zawartością (nieodwracalne!)', 'Włącz wersjonowanie: aws s3api put-bucket-versioning --bucket nazwa --versioning-configuration Status=Enabled'] } },
      { cmd: 'aws s3api put-bucket-lifecycle-configuration --bucket moj-bucket --lifecycle-configuration file://lifecycle.json', desc: 'Ustaw automatyczne przenoszenie/usuwanie obiektów',
        detail: { what: 'Lifecycle rules automatycznie zmieniają klasę przechowywania lub usuwają obiekty po określonym czasie. Dramatycznie redukuje koszty.', how: 'lifecycle.json definiuje reguły: prefix, dni do przejścia na IA, Glacier, Deep Archive lub usunięcia', tips: ['STANDARD → IA po 30 dniach, → Glacier po 90 dniach, usuń po 365 dniach = klasyczny backup lifecycle', 'aws s3api get-bucket-lifecycle-configuration — sprawdź aktualne reguły'] } },
    ]
  },
  {
    category: 'EC2 — Wirtualne Maszyny',
    icon: '💻',
    items: [
      { cmd: 'aws ec2 describe-instances --query "Reservations[].Instances[].[InstanceId,InstanceType,State.Name,Tags[?Key==\'Name\'].Value|[0],PublicIpAddress]" --output table', desc: 'Lista instancji z ID, typem, stanem, nazwą i IP',
        detail: { what: 'Opisuje instancje EC2. JMESPath query filtruje tylko potrzebne pola. --output table = czytelna tabela.', how: 'aws ec2 describe-instances [--instance-ids id...] [--filters ...]', flags: [{flag: '--filters "Name=instance-state-name,Values=running"', desc: 'Tylko działające'}, {flag: '--filters "Name=tag:Env,Values=prod"', desc: 'Filtruj po tagu'}], tips: ['aws ec2 describe-instances --region eu-west-1 — inny region', 'Kolumna Tags działa tylko gdy masz tag "Name" ustawiony'] } },
      { cmd: 'aws ec2 run-instances --image-id ami-0c55b159cbfafe1f0 --instance-type t3.micro --key-name moj-klucz --security-group-ids sg-xxx --subnet-id subnet-xxx --tag-specifications \'ResourceType=instance,Tags=[{Key=Name,Value=my-server}]\'', desc: 'Uruchom nową instancję EC2',
        detail: { what: 'Tworzy i startuje instancję. Wymaga: AMI ID (OS image), typ, klucz SSH, security group, subnet.', how: 'ami-0c55b159cbfafe1f0 = Amazon Linux 2. Dla Ubuntu/Debian znajdź AMI przez aws ec2 describe-images', flags: [{flag: '--user-data file://init.sh', desc: 'Skrypt startowy (cloud-init)'}, {flag: '--iam-instance-profile Name=rola', desc: 'Rola IAM dla instancji'}, {flag: '--count 3', desc: 'Uruchom 3 instancje naraz'}], tips: ['Wolisz Launch Templates: aws ec2 create-launch-template — zapisz konfigurację raz, używaj wielokrotnie', 'aws ec2 describe-images --owners amazon --filters "Name=name,Values=al2023-ami-*" — znajdź najnowsze AMI'] } },
      { cmd: 'aws ec2 stop-instances --instance-ids i-0123456789abcdef0', desc: 'Zatrzymaj instancję (dane zachowane, billing zatrzymany)',
        detail: { what: 'Zatrzymuje instancję. Dane na EBS (dysku) są zachowane. Billing za EC2 kończy się, ale EBS nadal kosztuje. Elastic IP zachowuje opłatę gdy instancja zatrzymana.', how: 'aws ec2 stop-instances --instance-ids [id...]', tips: ['aws ec2 start-instances — uruchom ponownie', 'aws ec2 terminate-instances — USUWA instancję i dane (nieodwracalne!)', 'aws ec2 reboot-instances — restart bez utraty danych'] } },
      { cmd: 'aws ec2 create-snapshot --volume-id vol-xxx --description "backup-prod-2024-01-15"', desc: 'Utwórz snapshot dysku EBS',
        detail: { what: 'Snapshot = kopia zapasowa wolumenu EBS w S3 (zarządzane przez AWS). Inkrementalny — płacisz tylko za zmiany. Można przywrócić jako nowy wolumen lub AMI.', how: 'aws ec2 describe-snapshots --owner-ids self — lista własnych snapshotów', tips: ['aws ec2 create-image --instance-id i-xxx --name "backup-ami" — snapshot całej instancji jako AMI', 'Automatyzuj przez Data Lifecycle Manager (DLM) zamiast ręcznie'] } },
    ]
  },
  {
    category: 'Lambda — Serverless',
    icon: 'λ',
    items: [
      { cmd: 'aws lambda invoke --function-name moja-funkcja --payload \'{"user_id":42}\' response.json && cat response.json', desc: 'Wywołaj funkcję Lambda synchronicznie',
        detail: { what: 'Invoce synchronous — czeka na odpowiedź, zapisuje do pliku. Sprawdź "FunctionError" w nagłówku odpowiedzi (nie tylko status 200 który zawsze jest zwracany przy poprawnym wywołaniu).', how: 'aws lambda invoke --function-name [nazwa/ARN] --payload [JSON] [plik]', flags: [{flag: '--invocation-type Event', desc: 'Asynchronicznie (fire & forget)'}, {flag: '--invocation-type DryRun', desc: 'Tylko sprawdź uprawnienia'}, {flag: '--log-type Tail', desc: 'Zwróć ostatnie logi (base64)'}], tips: ['Zdekoduj logi: aws lambda invoke ... --log-type Tail | python3 -c "import sys,base64,json; d=json.load(sys.stdin); print(base64.b64decode(d[\'LogResult\']).decode())"'] } },
      { cmd: 'zip -r function.zip . && aws lambda update-function-code --function-name moja-funkcja --zip-file fileb://function.zip', desc: 'Spakuj i wgraj zaktualizowany kod funkcji',
        detail: { what: 'fileb:// = binary file (wymagane dla ZIP). Dla plików >50MB używaj --s3-bucket/--s3-key zamiast bezpośredniego uploadu.', how: 'aws lambda update-function-code --function-name [nazwa] --zip-file fileb://[plik.zip]', flags: [{flag: '--s3-bucket bucket --s3-key plik.zip', desc: 'Deploy z S3 (>50MB lub CI/CD)'}, {flag: '--publish', desc: 'Utwórz nową wersję (immutable, do alias)'}], tips: ['aws lambda update-function-configuration --timeout 60 --memory-size 1024 — zmień timeout/RAM bez redeploy', 'Lambda layers: aws lambda publish-layer-version --layer-name deps --zip-file fileb://deps.zip'] } },
      { cmd: 'aws logs tail /aws/lambda/moja-funkcja --follow --format short', desc: 'Obserwuj logi Lambda w czasie rzeczywistym',
        detail: { what: 'Streamuje logi z CloudWatch Logs. --follow = tail -f, --format short = bez metadata.', how: 'Log group: /aws/lambda/nazwa-funkcji', flags: [{flag: '--since 30m', desc: 'Logi z ostatnich 30 minut'}, {flag: '--filter "ERROR"', desc: 'Tylko logi zawierające "ERROR"'}], tips: ['aws logs filter-log-events --log-group /aws/lambda/fn --filter-pattern "{$.level = ERROR}" — structured filtering', 'Lambda Powertools for Python: pełne structured logging, tracing, metrics out-of-the-box'] } },
    ]
  },
  {
    category: 'IAM — Uprawnienia',
    icon: '🔐',
    items: [
      { cmd: 'aws iam create-role --role-name LambdaS3Role --assume-role-policy-document \'{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"lambda.amazonaws.com"},"Action":"sts:AssumeRole"}]}\'', desc: 'Utwórz rolę IAM dla serwisu Lambda',
        detail: { what: 'Rola = tożsamość z uprawnieniami którą serwis (Lambda, EC2, ECS) może przejąć. Trust policy (--assume-role-policy-document) określa kto może jej używać.', how: 'Krok 1: utwórz rolę (trust policy). Krok 2: dołącz permissions policy.', tips: ['aws iam attach-role-policy --role-name LambdaS3Role --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess', 'aws iam put-role-policy — inline policy (nie shareable, nie widoczna w liście polityk)'] } },
      { cmd: 'aws iam create-policy --policy-name AppS3Policy --policy-document file://policy.json', desc: 'Utwórz custom politykę IAM z pliku',
        detail: { what: 'Customer managed policy — możesz ją dołączyć do wielu ról/użytkowników i wersjonować.', how: 'policy.json: {"Version":"2012-10-17","Statement":[{"Effect":"Allow","Action":["s3:GetObject","s3:PutObject"],"Resource":"arn:aws:s3:::moj-bucket/*"}]}', tips: ['Principle of Least Privilege: dawaj tylko DOKŁADNIE to co potrzebne', 'aws iam simulate-principal-policy --policy-source-arn arn:... --action-names s3:DeleteObject — przetestuj czy policy blokuje', 'aws iam get-policy-version --policy-arn arn:... --version-id v1 — sprawdź treść'] } },
      { cmd: 'aws iam list-attached-role-policies --role-name MojaRola', desc: 'Sprawdź jakie polityki są dołączone do roli',
        detail: { what: 'Wyświetla managed policies dołączone do roli. Osobno sprawdź inline policies.', how: 'aws iam list-attached-role-policies --role-name [nazwa]', tips: ['aws iam list-role-policies --role-name MojaRola — inline policies (wbudowane)', 'aws iam get-role --role-name MojaRola — pełne szczegóły z trust policy', 'aws iam list-roles --query "Roles[].[RoleName,Arn]" --output table — wszystkie role'] } },
    ]
  },
  {
    category: 'ECS & ECR — Kontenery',
    icon: '🐳',
    items: [
      { cmd: 'aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 123456789.dkr.ecr.eu-west-1.amazonaws.com', desc: 'Zaloguj Docker do AWS ECR (prywatny registry)',
        detail: { what: 'ECR = Elastic Container Registry. Przed push/pull musisz zalogować Docker do ECR używając tymczasowego tokenu (12h ważności).', how: 'Token = jednorazowy hasło do Docker login. Podmień 123456789 na swój Account ID.', tips: ['aws ecr describe-repositories — lista repozytoriów', 'aws ecr create-repository --repository-name moja-app — stwórz repo', 'docker tag moja-app:latest 123456789.dkr.ecr.eu-west-1.amazonaws.com/moja-app:latest && docker push ...'] } },
      { cmd: 'aws ecs update-service --cluster prod-cluster --service api-service --force-new-deployment', desc: 'Wymuś redeploy serwisu ECS (pull nowy Docker image)',
        detail: { what: 'force-new-deployment powoduje że ECS pulling najnowszy image i restartuje taski. Bez zmiany task definition — wystarczy gdy zaktualizowałeś image w ECR.', how: 'aws ecs update-service --cluster [klaster] --service [serwis] --force-new-deployment', flags: [{flag: '--desired-count 5', desc: 'Zmień liczbę działających tasków (skalowanie)'}, {flag: '--task-definition nazwa:7', desc: 'Zmień na konkretną wersję task definition'}], tips: ['aws ecs describe-services --cluster prod --services api-service --query "services[].deployments" — sprawdź status deploy', 'aws ecs wait services-stable --cluster prod --services api-service — czekaj na ustabilizowanie'] } },
      { cmd: 'aws ecs run-task --cluster prod-cluster --task-definition db-migrate:5 --launch-type FARGATE --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx],securityGroups=[sg-xxx],assignPublicIp=DISABLED}"', desc: 'Uruchom jednorazowy task (np. migracja bazy)',
        detail: { what: 'Uruchamia task ECS jednorazowo bez serwisu. Idealne do migracji DB, batch jobów, jednorazowych skryptów.', how: 'FARGATE = serverless (nie potrzebujesz EC2 nodes). assignPublicIp=DISABLED = private subnet, potrzebujesz NAT Gateway.', tips: ['aws ecs wait tasks-stopped --cluster prod --tasks [task-arn] — czekaj na zakończenie', 'aws ecs describe-tasks --cluster prod --tasks [arn] | jq ".tasks[].containers[].exitCode" — sprawdź exit code'] } },
    ]
  },
  {
    category: 'CloudWatch & Monitoring',
    icon: '📊',
    items: [
      { cmd: 'aws cloudwatch put-metric-alarm --alarm-name "prod-cpu-high" --namespace AWS/EC2 --metric-name CPUUtilization --dimensions Name=AutoScalingGroupName,Value=prod-asg --statistic Average --period 300 --threshold 70 --comparison-operator GreaterThanThreshold --evaluation-periods 3 --alarm-actions arn:aws:sns:eu-west-1:123:AlertTopic', desc: 'Utwórz alarm CPU > 70% przez 15 minut',
        detail: { what: 'Alarm monitoruje metrykę co period sekund. Jeśli threshold przekroczony przez evaluation-periods razy z rzędu — alarm ALARM state i wywołuje akcje (SNS, Auto Scaling, EC2 action).', how: 'period(300) × evaluation-periods(3) = 15 minut zanim alarm', flags: [{flag: '--ok-actions arn:aws:sns:...', desc: 'Akcja gdy alarm wraca do OK'}, {flag: '--treat-missing-data ignore', desc: 'Jak traktować brakujące dane (ignore/missing/breaching/notBreaching)'}], tips: ['Namespaces: AWS/EC2, AWS/Lambda, AWS/RDS, AWS/ApplicationELB, AWS/S3', 'aws cloudwatch set-alarm-state --alarm-name test --state-value ALARM --state-reason "test" — testuj alarm'] } },
      { cmd: 'aws logs insights query-results --log-group-name /app/prod --start-time $(date -d "1 hour ago" +%s) --end-time $(date +%s) --query-string \'fields @timestamp, @message | filter @message like /ERROR/ | sort @timestamp desc | limit 50\'', desc: 'Przeszukaj logi CloudWatch Insights (ostatnia godzina, tylko ERROR)',
        detail: { what: 'CloudWatch Logs Insights = SQL-like queries po logach. Dużo szybsze niż filter-log-events dla dużych woluminów.', how: 'aws logs start-query --log-group-name ... --start-time ... --end-time ... --query-string "..." → zwraca queryId. Potem: aws logs get-query-results --query-id [id]', tips: ['fields @timestamp, level, message | stats count(*) by level — zlicz po poziomie', 'Parsowanie JSON logów: fields @message | parse @message \'{"requestId":"*"}\' as reqId'] } },
    ]
  },
  {
    category: 'CloudFormation & CDK',
    icon: '🏗️',
    items: [
      { cmd: 'aws cloudformation deploy --template-file infrastructure.yaml --stack-name prod-stack --capabilities CAPABILITY_NAMED_IAM --parameter-overrides Environment=prod DBPassword=$(aws secretsmanager get-secret-value --secret-id db-pass --query SecretString --output text)', desc: 'Deploy infrastruktury przez CloudFormation',
        detail: { what: 'Tworzy lub aktualizuje stack. CAPABILITY_NAMED_IAM = wymagane gdy template tworzy zasoby IAM z nazwami. parameter-overrides nadpisuje parametry template.', how: 'aws cloudformation deploy --template-file [plik] --stack-name [nazwa]', flags: [{flag: '--no-execute-changeset', desc: 'Tylko stwórz change set — podgląd zmian bez wykonania'}, {flag: '--tags Env=prod Team=backend', desc: 'Taguj wszystkie zasoby w stacku'}], tips: ['aws cloudformation describe-stack-events --stack-name prod-stack — debug błędów deploy', 'aws cloudformation detect-stack-drift --stack-name prod — wykryj ręczne zmiany poza IaC', 'aws cloudformation delete-stack --stack-name prod — usuń wszystkie zasoby stacka'] } },
      { cmd: 'cdk diff && cdk deploy --require-approval never', desc: 'CDK: podejrzyj zmiany i deploy',
        detail: { what: 'AWS CDK (Cloud Development Kit) = IaC w TypeScript/Python/Java/Go. cdk diff = co się zmieni (jak terraform plan). cdk deploy = deploy.', how: 'npm install -g aws-cdk; cdk init app --language python/typescript', tips: ['cdk synth — wygeneruj CloudFormation template bez deploy', 'cdk bootstrap — jednorazowe przygotowanie konta AWS dla CDK (tworzy S3 bucket + rola)', 'cdk destroy — usuń wszystko co stworzył stack'] } },
    ]
  },
  {
    category: 'Różne — RDS, SQS, SSM',
    icon: '🔧',
    items: [
      { cmd: 'aws rds describe-db-instances --query "DBInstances[].[DBInstanceIdentifier,DBInstanceClass,DBInstanceStatus,Endpoint.Address,MultiAZ]" --output table', desc: 'Lista instancji RDS z endpointami',
        detail: { what: 'Wyświetla instancje RDS w regionie — identifier, typ, status, host do połączenia i czy Multi-AZ (HA).', how: 'aws rds describe-db-instances [--db-instance-identifier nazwa]', tips: ['aws rds create-db-snapshot --db-instance-identifier moja-db --db-snapshot-identifier snapshot-$(date +%Y%m%d)', 'aws rds restore-db-instance-from-db-snapshot — przywróć snapshot', 'aws rds modify-db-instance --db-instance-identifier nazwa --apply-immediately — zmień parametry'] } },
      { cmd: 'aws ssm get-parameter --name /prod/db/password --with-decryption --query Parameter.Value --output text', desc: 'Pobierz zaszyfrowany sekret z SSM Parameter Store',
        detail: { what: 'SSM Parameter Store = bezpieczne przechowywanie konfiguracji i sekretów. SecureString = szyfrowane KMS. --with-decryption = odszyfruj.', how: 'aws ssm put-parameter --name /prod/db/password --value "tajne" --type SecureString — zapisz', tips: ['aws ssm get-parameters-by-path --path /prod/ --recursive --with-decryption — pobierz cały folder', 'Hierarchia: /app/env/klucz — organizuj jak filesystem', 'Tańsze od Secrets Manager (0,05$/param vs 0,40$/sekret)'] } },
      { cmd: 'aws sqs send-message --queue-url https://sqs.eu-west-1.amazonaws.com/123456789/zamowienia.fifo --message-body \'{"order_id":42}\' --message-group-id "customer-1" --message-deduplication-id "order-42"', desc: 'Wyślij wiadomość na kolejkę SQS FIFO',
        detail: { what: 'SQS FIFO gwarantuje kolejność i dokładnie jedno dostarczenie. --message-group-id = kolejność w grupie. --message-deduplication-id = zapobiega duplikatom przez 5 minut.', how: 'SQS Standard: wysokie przepustowości, at-least-once. SQS FIFO: do 3000/s, exactly-once.', tips: ['aws sqs receive-message --queue-url [URL] --max-number-of-messages 10 --visibility-timeout 30 — odbierz i "zablokuj"', 'aws sqs delete-message --queue-url [URL] --receipt-handle [handle] — usuń po przetworzeniu', 'aws sqs get-queue-attributes --queue-url [URL] --attribute-names ApproximateNumberOfMessages — ile czeka'] } },
      { cmd: 'aws sns publish --topic-arn arn:aws:sns:eu-west-1:123:alerty --message "Deploy zakończony: v2.1.0 na prod" --subject "Deploy OK"', desc: 'Wyślij powiadomienie przez SNS (email/SMS/Lambda/SQS)',
        detail: { what: 'SNS = pub/sub messaging. Topic ma Subscriberów: email, SMS, HTTP endpoint, Lambda, SQS. Jeden publish → wszyscy subskrybenci dostają wiadomość.', how: 'aws sns subscribe --topic-arn [arn] --protocol email --notification-endpoint twoj@email.com — dodaj subskrybenta', tips: ['SNS → SQS = Fan-out pattern: jeden event → wiele kolejek → wiele konsumentów niezależnie', 'aws sns list-topics — lista tematów'] } },
    ]
  },
];
