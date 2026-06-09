// Advanced patterns: routing + state
FW_ASYNCIO_DATA.content.routing  = [
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
    ];
FW_ASYNCIO_DATA.content.state    = [
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
    ];
