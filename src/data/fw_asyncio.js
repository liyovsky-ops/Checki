import _advanced from './fw_asyncio_advanced.js';
import _ref      from './fw_asyncio_ref.js';
import _komendy  from './fw_asyncio_komendy.js';
export const FW_ASYNCIO_DATA = {
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
    ]
,
    ..._advanced,
    ..._ref,
    komendy: _komendy,
  }
};
