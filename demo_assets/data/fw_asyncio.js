const FW_ASYNCIO_DATA = {
  meta: {
    id: 'asyncio', name: 'asyncio', icon: '⚡', color: '#5865F2', color2: '#7289DA',
    tagline: 'Asynchroniczny Python — współbieżność bez wątków',
    year: 2014, author: 'Guido van Rossum (PEP 3156)', lang: 'Python 3.7+',
    github: 'python/cpython', stars: '65k+', codeLang: 'Python'
  },

  tabs: [
    { id: 'podstawy',   label: 'Podstawy' },
    { id: 'komponenty', label: 'Korutyny' },
    { id: 'hooki',      label: 'Tasks' },
    { id: 'routing',    label: 'Synchronizacja' },
    { id: 'state',      label: 'Zaawansowane' },
    { id: 'rywale',     label: 'Rywale' },
    { id: 'pluginy',    label: 'Ekosystem' },
    { id: 'komendy',    label: 'Komendy' },
  ],

  content: {
    podstawy: {
      labels: {
        concepts: 'Kluczowe koncepcje',
        whenToUse: 'Kiedy używać asyncio?',
        firstComponent: 'Pierwsze korutyny',
        firstComponentLang: 'Python'
      },
      intro: {
        title: 'Czym jest asyncio?',
        desc: 'asyncio to wbudowana biblioteka Pythona do pisania współbieżnego kodu z async/await. Zamiast wątków używa event loop — jednego wątku który przełącza się między zadaniami gdy czekają na I/O. Idealne gdy aplikacja spędza czas na sieci, plikach, bazie danych — nie na obliczeniach.',
      },
      concepts: [
        {
          title: 'Event Loop',
          desc: 'Serce asyncio. Jeden wątek który zarządza wszystkimi korutynami. Gdy korutyna czeka (np. na HTTP), event loop uruchamia inną. Zero blokowania, zero wątków systemowych.',
          icon: '🔄'
        },
        {
          title: 'Korutyna (async def)',
          desc: 'Funkcja z async def to korutyna — nie uruchamia się od razu po wywołaniu. Zwraca obiekt korutyny. Uruchamia się przez await lub asyncio.run(). Może zatrzymać się w miejscu await.',
          icon: '⚡'
        },
        {
          title: 'await',
          desc: 'await mówi: "tu mogę się zatrzymać i pozwolić innym korutynom działać". Możesz await tylko wewnątrz async def. await cze awaitable: korutynę, Task, Future.',
          icon: '⏸️'
        },
        {
          title: 'gather vs TaskGroup',
          desc: 'asyncio.gather() uruchamia wiele korutyn równolegle i czeka na wszystkie. TaskGroup (Python 3.11+) to nowszy, bezpieczniejszy sposób. Razem dają współbieżność I/O bez wątków.',
          icon: '🎯'
        }
      ],
      whenToUse: [
        'Pobieranie danych z wielu URL jednocześnie (scraping, API calls)',
        'Serwery webowe — FastAPI, aiohttp obsługują wiele requestów w jednym wątku',
        'Bazy danych async — asyncpg, motor (MongoDB), aiosqlite',
        'WebSocket i long-polling — utrzymywanie wielu połączeń',
        'Pipeline\'y I/O — pobieranie, przetwarzanie, zapis bez blokowania',
        'NIE DO: ciężkich obliczeń CPU — tu używaj multiprocessing'
      ],
      firstComponent: `import asyncio
import httpx

async def pobierz(url: str) -> str:
    async with httpx.AsyncClient() as client:
        r = await client.get(url)
        return r.text[:100]

async def main():
    urls = [
        "https://httpbin.org/get",
        "https://httpbin.org/ip",
        "https://httpbin.org/headers",
    ]
    # Wszystkie 3 requestu równolegle
    wyniki = await asyncio.gather(*[pobierz(u) for u in urls])
    for w in wyniki:
        print(w[:60])

asyncio.run(main())`
    },

    komponenty: [
      {
        title: 'async def i await — podstawowa składnia',
        desc: 'async def definiuje korutynę. await czeka na wynik awaitable. Korutyny możesz wywoływać tylko wewnątrz innych async def lub przez asyncio.run().',
        code: `import asyncio

# Korutyna — funkcja z async def
async def przywitaj(imie: str, opoznienie: float):
    await asyncio.sleep(opoznienie)  # nie blokuje event loop
    print(f"Cześć, {imie}!")
    return f"Gotowe: {imie}"

# Uruchomienie pojedynczej korutyny
async def main():
    wynik = await przywitaj("Łukasz", 1.0)
    print(wynik)

# Punkt wejścia — poza async def
asyncio.run(main())`
      },
      {
        title: 'asyncio.gather() — równoległe wykonywanie',
        desc: 'gather() uruchamia wiele korutyn równolegle i czeka aż wszystkie się skończą. Zwraca listę wyników w tej samej kolejności co argumenty.',
        code: `import asyncio
import time

async def zadanie(n: int, czas: float) -> str:
    await asyncio.sleep(czas)
    return f"Zadanie {n} gotowe"

async def main():
    start = time.perf_counter()

    # Sekwencyjnie (wolno — suma czasów):
    # r1 = await zadanie(1, 1.0)
    # r2 = await zadanie(2, 1.0)

    # Równolegle (szybko — max czasu):
    r1, r2, r3 = await asyncio.gather(
        zadanie(1, 1.0),
        zadanie(2, 0.5),
        zadanie(3, 0.8),
    )
    print(f"Czas: {time.perf_counter() - start:.2f}s")  # ~1.0s
    print(r1, r2, r3)

asyncio.run(main())`
      },
      {
        title: 'asyncio.gather() — obsługa błędów',
        desc: 'Domyślnie gather() rzuca wyjątek przy pierwszym błędzie. return_exceptions=True zbiera wszystkie wyniki/błędy do listy — sam sprawdzasz co się udało.',
        code: `import asyncio

async def moze_rzucic(n: int):
    if n == 2:
        raise ValueError(f"Błąd w zadaniu {n}")
    await asyncio.sleep(0.1)
    return f"OK: {n}"

async def main():
    # return_exceptions=True — nie rzuca, zwraca Exception jako wynik
    wyniki = await asyncio.gather(
        moze_rzucic(1),
        moze_rzucic(2),
        moze_rzucic(3),
        return_exceptions=True,
    )

    for i, w in enumerate(wyniki):
        if isinstance(w, Exception):
            print(f"Zadanie {i+1} BŁĄD: {w}")
        else:
            print(f"Zadanie {i+1}: {w}")

asyncio.run(main())`
      },
      {
        title: 'TaskGroup — Python 3.11+ (zalecany)',
        desc: 'TaskGroup to nowszy, bezpieczniejszy sposób uruchamiania zadań. Gdy jedno Task rzuci wyjątek, anuluje pozostałe. Lepsza obsługa błędów niż gather().',
        code: `import asyncio

async def worker(name: str, delay: float) -> str:
    await asyncio.sleep(delay)
    print(f"{name} gotowy po {delay}s")
    return name

async def main():
    wyniki = []

    # Python 3.11+
    async with asyncio.TaskGroup() as tg:
        t1 = tg.create_task(worker("A", 1.0))
        t2 = tg.create_task(worker("B", 0.5))
        t3 = tg.create_task(worker("C", 0.8))
    # Tu wszystkie tasks są skończone

    print([t1.result(), t2.result(), t3.result()])

asyncio.run(main())`
      },
    ],

    hooki: [
      {
        title: 'asyncio.Task — zadania w tle',
        desc: 'Task to korutyna uruchomiona w event loop niezależnie. Nie musisz na nią czekać od razu — może działać "w tle". create_task() startuje ją natychmiast.',
        code: `import asyncio

async def background_task(name: str):
    while True:
        print(f"{name}: pracuję...")
        await asyncio.sleep(2)

async def main():
    # Utwórz task — startuje od razu, nie czekamy
    task = asyncio.create_task(background_task("monitor"))

    # Rób inne rzeczy
    await asyncio.sleep(5)

    # Anuluj task gdy skończymy
    task.cancel()
    try:
        await task
    except asyncio.CancelledError:
        print("Task anulowany")

asyncio.run(main())`
      },
      {
        title: 'asyncio.wait() — czekaj na niektóre tasks',
        desc: 'wait() daje większą kontrolę niż gather() — możesz czekać na pierwszy gotowy, pierwszy błąd lub wszystkie. Zwraca (done, pending) sety.',
        code: `import asyncio

async def zadanie(n: int, czas: float):
    await asyncio.sleep(czas)
    return n * 2

async def main():
    tasks = [
        asyncio.create_task(zadanie(i, i * 0.3))
        for i in range(1, 5)
    ]

    # Czekaj na pierwszego gotowego
    done, pending = await asyncio.wait(
        tasks,
        return_when=asyncio.FIRST_COMPLETED
    )

    for task in done:
        print(f"Gotowy: {task.result()}")

    # Anuluj pozostałe
    for task in pending:
        task.cancel()

asyncio.run(main())`
      },
      {
        title: 'asyncio.timeout() — limit czasu',
        desc: 'timeout() i wait_for() ograniczają czas oczekiwania na korutynę. Rzuca asyncio.TimeoutError gdy przekroczony.',
        code: `import asyncio

async def wolna_operacja():
    await asyncio.sleep(10)  # bardzo wolna
    return "gotowe"

async def main():
    # Sposób 1: wait_for (starszy)
    try:
        wynik = await asyncio.wait_for(
            wolna_operacja(),
            timeout=2.0  # 2 sekundy
        )
    except asyncio.TimeoutError:
        print("Timeout — za wolno!")

    # Sposób 2: timeout() context manager (Python 3.11+)
    try:
        async with asyncio.timeout(2.0):
            wynik = await wolna_operacja()
    except TimeoutError:
        print("Timeout!")

asyncio.run(main())`
      },
      {
        title: 'asyncio.Queue — komunikacja między tasks',
        desc: 'Queue to async kolejka FIFO. Producer dodaje elementy, Consumer pobiera. Naturalna komunikacja między korutynami bez race conditions.',
        code: `import asyncio

async def producer(queue: asyncio.Queue, n: int):
    for i in range(n):
        await asyncio.sleep(0.1)
        await queue.put(f"item-{i}")
        print(f"Dodano: item-{i}")
    await queue.put(None)  # sygnał końca

async def consumer(queue: asyncio.Queue):
    while True:
        item = await queue.get()
        if item is None:
            break
        print(f"Przetwarzam: {item}")
        queue.task_done()

async def main():
    queue = asyncio.Queue(maxsize=5)
    await asyncio.gather(
        producer(queue, 10),
        consumer(queue),
    )

asyncio.run(main())`
      },
    ],

    routing: [
      {
        title: 'asyncio.Lock — mutual exclusion',
        desc: 'Lock zapobiega równoczesnemu dostępowi do zasobu. Gdy jedna korutyna ma Lock, inne czekają. Async odpowiednik threading.Lock.',
        code: `import asyncio

class SharedCounter:
    def __init__(self):
        self.value = 0
        self._lock = asyncio.Lock()

    async def increment(self, amount: int):
        async with self._lock:  # tylko jedna korutyna na raz
            current = self.value
            await asyncio.sleep(0)  # symulacja I/O
            self.value = current + amount

async def main():
    counter = SharedCounter()

    await asyncio.gather(*[
        counter.increment(1) for _ in range(100)
    ])

    print(f"Wynik: {counter.value}")  # zawsze 100, nie mniej

asyncio.run(main())`
      },
      {
        title: 'asyncio.Event — sygnalizacja',
        desc: 'Event to flaga którą jedna korutyna ustawia (set()), a inne czekają (wait()). Używane do synchronizacji — "poczekaj aż coś się stanie".',
        code: `import asyncio

async def waiter(event: asyncio.Event, name: str):
    print(f"{name}: czekam na sygnał...")
    await event.wait()
    print(f"{name}: dostałem sygnał!")

async def setter(event: asyncio.Event):
    await asyncio.sleep(2)
    print("Ustawiam event!")
    event.set()

async def main():
    event = asyncio.Event()

    await asyncio.gather(
        waiter(event, "Worker A"),
        waiter(event, "Worker B"),
        setter(event),
    )

asyncio.run(main())`
      },
      {
        title: 'asyncio.Semaphore — ograniczenie współbieżności',
        desc: 'Semaphore pozwala N korutynom na raz. Kluczowe przy scrapingu — nie bombarduj serwera 1000 requestami jednocześnie. Ustaw limit np. 10.',
        code: `import asyncio
import httpx

async def fetch(client: httpx.AsyncClient,
                url: str,
                sem: asyncio.Semaphore) -> str:
    async with sem:  # max 10 jednocześnie
        r = await client.get(url)
        return r.text[:50]

async def main():
    urls = [f"https://httpbin.org/delay/1?n={i}"
            for i in range(50)]

    sem = asyncio.Semaphore(10)  # max 10 równoległych

    async with httpx.AsyncClient() as client:
        wyniki = await asyncio.gather(*[
            fetch(client, url, sem) for url in urls
        ])

    print(f"Pobrano {len(wyniki)} stron")

asyncio.run(main())`
      },
      {
        title: 'asyncio.Condition — zaawansowana synchronizacja',
        desc: 'Condition łączy Lock z powiadomieniami. Korutyny czekają (wait_for) aż warunek zostanie spełniony. Przydatne do producer-consumer z warunkami.',
        code: `import asyncio

async def main():
    condition = asyncio.Condition()
    items = []

    async def producer():
        async with condition:
            items.append("gotowe")
            condition.notify_all()

    async def consumer():
        async with condition:
            await condition.wait_for(lambda: len(items) > 0)
            print(f"Odebrano: {items.pop()}")

    await asyncio.gather(consumer(), producer())

asyncio.run(main())`
      },
    ],

    state: [
      {
        title: 'Async context manager i async iterator',
        desc: 'Własne klasy mogą implementować __aenter__/__aexit__ (async with) i __aiter__/__anext__ (async for). Frameworki jak aiofiles, httpx używają tego wzorca.',
        code: `import asyncio

class AsyncTimeit:
    async def __aenter__(self):
        import time
        self._start = time.perf_counter()
        return self

    async def __aexit__(self, *args):
        import time
        elapsed = time.perf_counter() - self._start
        print(f"Czas: {elapsed:.3f}s")

# Async generator (async iterator)
async def stream_numbers(n: int):
    for i in range(n):
        await asyncio.sleep(0.1)
        yield i

async def main():
    async with AsyncTimeit():
        async for num in stream_numbers(5):
            print(num)

asyncio.run(main())`
      },
      {
        title: 'asyncio w FastAPI — jak to działa',
        desc: 'FastAPI używa asyncio pod spodem. Endpoint async def = może obsługiwać wiele requestów bez blokowania. Miksy sync/async w tym samym projekcie działają.',
        code: `from fastapi import FastAPI
import asyncio
import httpx

app = FastAPI()

# Async endpoint — nie blokuje serwera podczas await
@app.get("/dane")
async def pobierz_dane():
    async with httpx.AsyncClient() as client:
        r = await client.get("https://api.example.com/data")
    return r.json()

# Endpoint synchroniczny — FastAPI uruchamia go w threadpool
# (nie blokuje event loop ale wątki są ograniczone)
@app.get("/sync")
def synchroniczny():
    import time
    time.sleep(1)  # blokuje wątek ale nie event loop
    return {"ok": True}

# Równoległy fetch wewnątrz endpointu
@app.get("/multi")
async def multi_fetch():
    async with httpx.AsyncClient() as client:
        r1, r2 = await asyncio.gather(
            client.get("https://api.example.com/a"),
            client.get("https://api.example.com/b"),
        )
    return {"a": r1.json(), "b": r2.json()}`
      },
      {
        title: 'asyncio z bazą danych — asyncpg i SQLAlchemy async',
        desc: 'Synchroniczne sterowniki DB (psycopg2) blokują event loop. Używaj asyncpg (PostgreSQL) lub SQLAlchemy async mode z async sessionem.',
        code: `import asyncio
import asyncpg

async def main():
    # asyncpg — najszybszy async PostgreSQL driver
    conn = await asyncpg.connect(
        "postgresql://user:password@localhost/db"
    )

    # Zapytanie
    rows = await conn.fetch(
        "SELECT id, name FROM users WHERE active = $1",
        True
    )

    for row in rows:
        print(row["id"], row["name"])

    # Batch insert
    await conn.executemany(
        "INSERT INTO logs(msg) VALUES($1)",
        [("log1",), ("log2",), ("log3",)]
    )

    await conn.close()

asyncio.run(main())`
      },
      {
        title: 'Uruchamianie sync kodu w async — run_in_executor',
        desc: 'Nie zawsze możesz zmienić synchroniczny kod na async. run_in_executor() uruchamia sync funkcję w threadpool bez blokowania event loop.',
        code: `import asyncio
from concurrent.futures import ThreadPoolExecutor
import time

def sync_operacja(n: int) -> int:
    """Blokująca operacja — np. stara biblioteka, I/O"""
    time.sleep(1)
    return n * 2

async def main():
    loop = asyncio.get_event_loop()

    # Uruchom sync w threadpool — nie blokuje event loop
    wynik = await loop.run_in_executor(None, sync_operacja, 5)
    print(f"Wynik: {wynik}")

    # Wiele jednocześnie
    wyniki = await asyncio.gather(*[
        loop.run_in_executor(None, sync_operacja, i)
        for i in range(5)
    ])
    print(wyniki)  # [0, 2, 4, 6, 8]

asyncio.run(main())`
      },
    ],

    rywale: [
      {
        name: 'threading',
        icon: '🧵',
        color: '#FF9800',
        tagline: 'Wbudowane wątki Pythona',
        pros: ['Wbudowany w Python', 'Działa ze starym kodem', 'Proste dla blokujących operacji', 'Biblioteki sync działają od razu'],
        cons: ['GIL — brak prawdziwej równoległości CPU', 'Race conditions, deadlocki', 'Wysokie zużycie pamięci', 'Trudniejszy debugging'],
        vsReact: 'threading dla I/O gdy biblioteki nie mają async wersji. asyncio szybsze i lżejsze dla I/O. Wiele wątków = dużo pamięci. Wiele korutyn = mało pamięci.',
        bestFor: 'Integracja z bibliotekami bez async wsparcia, GUI applications'
      },
      {
        name: 'multiprocessing',
        icon: '💻',
        color: '#F44336',
        tagline: 'Prawdziwa równoległość — omija GIL',
        pros: ['Omija GIL — prawdziwa równoległość CPU', 'Izolowane procesy (bezpieczeństwo)', 'Naturalne dla CPU-intensive zadań'],
        cons: ['Duże zużycie pamięci', 'Wolne startowanie procesów', 'Komunikacja przez pickle (serializacja)', 'Trudniejsza synchronizacja'],
        vsReact: 'asyncio dla I/O, multiprocessing dla CPU. Liczenie, kompresja, ML, przetwarzanie obrazów = multiprocessing. HTTP, DB, pliki = asyncio.',
        bestFor: 'Obliczenia naukowe, ML preprocessing, kompresja danych, CPU-bound scraping'
      },
      {
        name: 'trio',
        icon: '🎸',
        color: '#9C27B0',
        tagline: 'Alternatywny async framework — prostsze API',
        pros: ['Prostszy model współbieżności', 'Nurseries zamiast Tasks', 'Bezpieczniejsza anulacja', 'Lepsza obsługa błędów'],
        cons: ['Nie kompatybilny z asyncio', 'Mniejszy ekosystem', 'Większość bibliotek pisze pod asyncio', 'Trudniejsza migracja'],
        vsReact: 'trio ma prostszy, bezpieczniejszy model ale asyncio jest standardem. FastAPI, SQLAlchemy, aiohttp, httpx — wszystko na asyncio. Trio dla nowych projektów od zera.',
        bestFor: 'Nowe projekty gdzie bezpieczeństwo i prostota ważniejsze niż ekosystem'
      },
      {
        name: 'concurrent.futures',
        icon: '🔧',
        color: '#607D8B',
        tagline: 'Wysoki poziom API dla wątków i procesów',
        pros: ['Wbudowany w Python', 'Prosty interfejs (submit, map)', 'ThreadPoolExecutor i ProcessPoolExecutor', 'Future API podobny do async'],
        cons: ['Nie async natywnie', 'Brak event loop', 'Gorsze dla I/O niż asyncio'],
        vsReact: 'concurrent.futures świetny do parallelizacji CPU przez ProcessPoolExecutor. asyncio.run_in_executor() integruje go z asyncio — używasz obu razem.',
        bestFor: 'Prosta parallelizacja CPU, migracja starszego kodu, kombinacja z asyncio'
      },
    ],

    pluginy: [
      {
        name: 'httpx',
        icon: '🌐',
        color: '#00BCD4',
        tagline: 'Async HTTP client — requests dla async world',
        install: 'pip install httpx',
        use: 'Async HTTP client z API jak requests. Niezbędny do async scrapingu, testowania FastAPI. Obsługuje HTTP/2, timeouts, retry. Używaj z async with i await.',
        example: `import asyncio, httpx

async def fetch_many(urls: list[str]) -> list[str]:
    async with httpx.AsyncClient(timeout=10.0) as client:
        tasks = [client.get(url) for url in urls]
        responses = await asyncio.gather(*tasks)
    return [r.text for r in responses]`
      },
      {
        name: 'aiofiles',
        icon: '📁',
        color: '#FF9800',
        tagline: 'Async operacje na plikach',
        install: 'pip install aiofiles',
        use: 'Wbudowane open() blokuje event loop. aiofiles.open() jest async — czytaj i pisz pliki bez blokowania. Ważne gdy serwer obsługuje wiele requestów jednocześnie.',
        example: `import asyncio, aiofiles

async def czytaj_i_pisz():
    async with aiofiles.open("input.txt", "r") as f:
        zawartosc = await f.read()

    przetworzone = zawartosc.upper()

    async with aiofiles.open("output.txt", "w") as f:
        await f.write(przetworzone)

asyncio.run(czytaj_i_pisz())`
      },
      {
        name: 'asyncpg',
        icon: '🐘',
        color: '#336791',
        tagline: 'Najszybszy async PostgreSQL driver',
        install: 'pip install asyncpg',
        use: 'Natywnie async driver dla PostgreSQL — 3x szybszy niż psycopg2. Bez ORM — czyste SQL z parametrami $1, $2. Standardowy wybór gdy używasz PostgreSQL z asyncio.',
        example: `import asyncio, asyncpg

async def main():
    conn = await asyncpg.connect(
        "postgresql://user:pass@localhost/db")

    users = await conn.fetch(
        "SELECT * FROM users WHERE active=$1", True)

    await conn.executemany(
        "INSERT INTO logs(user_id, msg) VALUES($1, $2)",
        [(u["id"], "login") for u in users]
    )
    await conn.close()

asyncio.run(main())`
      },
      {
        name: 'aiobotocore / aioboto3',
        icon: '☁️',
        color: '#FF9900',
        tagline: 'Async AWS SDK',
        install: 'pip install aioboto3',
        use: 'Async wrapper na boto3 (AWS SDK). S3, DynamoDB, SQS async. Gdy uploadujesz pliki do S3 lub czytasz z DynamoDB w async aplikacji.',
        example: `import asyncio, aioboto3

async def upload_to_s3(file_path: str, bucket: str):
    session = aioboto3.Session()
    async with session.client("s3") as s3:
        await s3.upload_file(
            file_path, bucket,
            f"uploads/{file_path}"
        )
        print(f"Uploaded: {file_path}")

asyncio.run(upload_to_s3("report.pdf", "my-bucket"))`
      },
      {
        name: 'aioredis',
        icon: '🔴',
        color: '#DC382D',
        tagline: 'Async Redis client',
        install: 'pip install redis[asyncio]',
        use: 'Async Redis — cachowanie, pub/sub, rate limiting w async aplikacjach. Wbudowany w oficjalny redis-py przez redis[asyncio]. Używany w FastAPI do cache i session store.',
        example: `import asyncio
from redis.asyncio import Redis

async def main():
    r = Redis(host="localhost", decode_responses=True)

    await r.set("klucz", "wartość", ex=3600)  # TTL 1h
    val = await r.get("klucz")
    print(val)  # "wartość"

    # Pub/Sub
    pubsub = r.pubsub()
    await pubsub.subscribe("channel")

    await r.aclose()

asyncio.run(main())`
      },
      {
        name: 'tenacity',
        icon: '🔄',
        color: '#4CAF50',
        tagline: 'Retry z backoff — niezawodne async operacje',
        install: 'pip install tenacity',
        use: 'Automatyczne ponawianie nieudanych operacji z exponential backoff. Gdy API zwraca 429 lub 503 — retry z odczekaniem. Działa z async/await.',
        example: `from tenacity import (retry, stop_after_attempt,
                         wait_exponential, retry_if_exception_type)
import httpx

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=1, max=10),
    retry=retry_if_exception_type(httpx.HTTPError),
)
async def fetch_with_retry(url: str) -> dict:
    async with httpx.AsyncClient() as client:
        r = await client.get(url)
        r.raise_for_status()
        return r.json()`
      },
      {
        name: 'pytest-asyncio',
        icon: '🧪',
        color: '#0A9EDC',
        tagline: 'Testowanie kodu async z pytest',
        install: 'pip install pytest-asyncio',
        use: 'Pozwala pisać async def test_* funkcje w pytest. Bez tego nie można testować korutyn. Konfiguracja asyncio_mode = "auto" w pyproject.toml eliminuje ręczne dekorowanie.',
        example: `# pyproject.toml:
# [tool.pytest.ini_options]
# asyncio_mode = "auto"

import asyncio
import pytest

async def fetch_data():
    await asyncio.sleep(0.1)
    return {"status": "ok"}

async def test_fetch():
    result = await fetch_data()
    assert result["status"] == "ok"`
      },
    ],

    komendy: [
      {
        category: 'Uruchamianie',
        icon: '▶️',
        items: [
          { cmd: 'asyncio.run(main())', desc: 'Uruchom korutynę — punkt wejścia',
            detail: { what: 'asyncio.run() tworzy event loop, uruchamia korutynę i zamyka loop. To jedyny prawidłowy sposób uruchamiania korutyn z synchronicznego kodu.', how: 'Wywołaj tylko raz, na najwyższym poziomie skryptu. Nie wywołuj z wnętrza innej korutyny.', tips: ['Nie używaj loop.run_until_complete() — asyncio.run() to nowoczesny sposób', 'Python 3.11+: asyncio.run(main(), debug=True) — tryb debug'] }
          },
          { cmd: 'await asyncio.gather(*tasks)', desc: 'Uruchom wiele korutyn równolegle',
            detail: { what: 'gather() przyjmuje dowolną liczbę awaitables i uruchamia je równolegle. Zwraca listę wyników gdy wszystkie skończą.', how: '*tasks rozpakowuje listę. Lub: await asyncio.gather(f1(), f2(), f3())', tips: ['return_exceptions=True — zbierz błędy zamiast rzucać', 'Zachowuje kolejność wyników (nie wykonania)'] }
          },
          { cmd: 'task = asyncio.create_task(coro())', desc: 'Utwórz Task — startuje natychmiast',
            detail: { what: 'create_task() planuje korutynę w event loop. Startuje przy najbliższej okazji (await). Możesz zrobić inne rzeczy przed await task.', how: 'task.result() po await zwraca wynik. task.cancel() anuluje.', tips: ['Musi być wywołane wewnątrz async def', 'Zawsze await task przed końcem funkcji — inaczej warning'] }
          },
          { cmd: 'await asyncio.sleep(1.0)', desc: 'Async sleep — oddaj kontrolę event loop',
            detail: { what: 'Jak time.sleep() ale nie blokuje event loop. Podczas await asyncio.sleep() inne korutyny mogą działać.', how: 'asyncio.sleep(0) — oddaj kontrolę bez czekania. Przydatne w długich pętlach.', tips: ['Nigdy nie używaj time.sleep() w async kodzie — blokuje cały event loop', 'asyncio.sleep(0) = yield control to event loop'] }
          },
        ]
      },
      {
        category: 'Synchronizacja',
        icon: '🔒',
        items: [
          { cmd: 'async with asyncio.Lock() as lock:', desc: 'Async mutex — wyłączny dostęp',
            detail: { what: 'Lock zapobiega race conditions przy shared state. async with automatycznie acquire/release.', how: 'Utwórz Lock raz: self._lock = asyncio.Lock(). Używaj w każdej metodzie modyfikującej stan.', tips: ['Nie używaj threading.Lock() w async — deadlock', 'Trzymaj sekcję krytyczną jak najkrótszą'] }
          },
          { cmd: 'sem = asyncio.Semaphore(10)', desc: 'Ogranicz współbieżność do N',
            detail: { what: 'Semaphore pozwala max N korutynom jednocześnie wejść w sekcję. Kluczowe przy scrapingu i limitach API.', how: 'async with sem: ... — blokuje gdy N korutyn już wewnątrz.', tips: ['Rate limiting: Semaphore(10) = max 10 requestów jednocześnie', 'Dobierz wartość do limitów serwera/API'] }
          },
          { cmd: 'await asyncio.wait_for(coro(), timeout=5.0)', desc: 'Limit czasu na korutynę',
            detail: { what: 'Rzuca asyncio.TimeoutError gdy korutyna nie skończy w timeout sekund.', how: 'Lub nowszy sposób (Python 3.11+): async with asyncio.timeout(5.0):', tips: ['Zawsze ustawiaj timeout dla zewnętrznych requestów', 'asyncio.timeout() lepszy bo można sprawdzić czy expired'] }
          },
        ]
      },
      {
        category: 'Debugowanie',
        icon: '🐛',
        items: [
          { cmd: 'asyncio.run(main(), debug=True)', desc: 'Tryb debug — wykrywaj problemy',
            detail: { what: 'Debug mode: ostrzeżenie gdy korutyna nigdy nie jest awaited, gdy blokujesz event loop, gdy task trwa za długo.', how: 'Lub: PYTHONASYNCIODEBUG=1 python script.py', tips: ['Włącz zawsze w development', 'Ostrzeżenie "coroutine was never awaited" — zapomniałeś await'] }
          },
          { cmd: 'asyncio.get_event_loop().set_debug(True)', desc: 'Włącz debug na działającym loop',
            detail: { what: 'Włącza logging ostrzeżeń gdy synchroniczna operacja blokuje event loop przez >0.1s.', how: 'Automatycznie gdy PYTHONASYNCIODEBUG=1 lub asyncio.run(debug=True)', tips: ['Loguj do pliku: logging.basicConfig(level=logging.DEBUG)', 'Blokowanie >100ms to problem w produkcji'] }
          },
          { cmd: 'asyncio.all_tasks()', desc: 'Lista wszystkich aktywnych Tasks',
            detail: { what: 'Zwraca set wszystkich Task które nie są skończone. Przydatne do debugowania wycieków tasków.', how: 'for task in asyncio.all_tasks(): print(task.get_name(), task.get_coro())', tips: ['Zbyt wiele tasks = wyciek — sprawdź czy wszystkie są cancel/await', 'task.get_stack() — stack trace aktywnego task'] }
          },
        ]
      },
    ]
  }
};
