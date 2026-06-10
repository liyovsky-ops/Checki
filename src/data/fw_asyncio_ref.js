// Ecosystem: rywale + pluginy
export default {
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
    ]
};
