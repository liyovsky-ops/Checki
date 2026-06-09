// Command reference
FW_ASYNCIO_DATA.content.komendy = [
      {
        category: 'Instalacja bibliotek async',
        icon: '📦',
        items: [
          { cmd: 'pip install aiohttp', desc: 'Async HTTP klient i serwer',
            detail: { what: 'Najczęściej używana biblioteka HTTP dla asyncio. Zastępuje requests w kodzie async. Szybsza przy wielu równoległych requestach.', how: 'async with aiohttp.ClientSession() as session: async with session.get(url) as r: data = await r.json()', tips: ['Zawsze używaj ClientSession jako context manager (async with)', 'pip install aiohttp[speedups] — opcjonalnie szybszy z cchardet i aiodns', 'aiohttp.ClientTimeout(total=10) — timeout'] }
          },
          { cmd: 'pip install aiofiles', desc: 'Async I/O plików',
            detail: { what: 'Pozwala czytać i pisać pliki asynchronicznie — nie blokuje event loop podczas operacji dyskowych.', how: 'async with aiofiles.open("plik.txt", "r") as f: content = await f.read()', tips: ['Zwykłe open() blokuje event loop — przy dużych plikach użyj aiofiles', 'API identyczne jak wbudowane open() — tylko dodaj async/await'] }
          },
          { cmd: 'pip install asyncpg', desc: 'Async driver PostgreSQL',
            detail: { what: 'Najszybszy async driver do PostgreSQL. Używany z FastAPI i SQLAlchemy async.', how: 'conn = await asyncpg.connect(dsn). Lub pool: pool = await asyncpg.create_pool(dsn)', tips: ['pip install asyncpg — samodzielnie', 'pip install sqlalchemy[asyncio] asyncpg — z SQLAlchemy', 'pip install databases[postgresql] — wysokopoziomowe async ORM'] }
          },
          { cmd: 'pip install redis[asyncio]', desc: 'Async klient Redis',
            detail: { what: 'Async wersja redis-py. Używaj w FastAPI i asyncio do cache, pubsub, queues.', how: 'r = redis.asyncio.from_url("redis://localhost"). await r.set("key", "val"). await r.get("key")', tips: ['pip install redis[asyncio] — oficjalny klient', 'ConnectionPool zarządza połączeniami automatycznie', 'await r.aclose() — zamknij połączenie'] }
          },
        ]
      },
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
          { cmd: 'PYTHONASYNCIODEBUG=1 python script.py', desc: 'Włącz tryb debug przez zmienną środowiskową',
            detail: { what: 'Alternatywa dla asyncio.run(debug=True) — działa bez modyfikacji kodu. Loguje ostrzeżenia o blokowaniu event loop i niezaawaitowanych korutynach.', how: 'Windows: set PYTHONASYNCIODEBUG=1 && python script.py', tips: ['Zawsze włącz w development', 'Ostrzeżenie slow callback >100ms = synchroniczny kod blokuje pętlę', 'import logging; logging.basicConfig(level=logging.DEBUG) — więcej szczegółów'] }
          },
        ]
      },
      {
        category: 'Wzorce zaawansowane',
        icon: '⚡',
        items: [
          { cmd: 'queue = asyncio.Queue()', desc: 'Async kolejka — producer/consumer',
            detail: { what: 'Kolejka FIFO dla komunikacji między korutynami. Producer wkłada (await queue.put()), consumer pobiera (await queue.get()).', how: 'Wzorzec: N producerów → Queue → M consumerów. Automatyczna synchronizacja bez Lock.', tips: ['asyncio.Queue(maxsize=100) — ogranicz rozmiar (blokuje producera gdy pełna)', 'await queue.join() — czekaj aż wszystkie elementy zostaną przetworzone', 'queue.task_done() — consumerr sygnalizuje zakończenie przetwarzania'] }
          },
          { cmd: 'async with asyncio.timeout(5.0):', desc: 'Blok z limitem czasu (Python 3.11+)',
            detail: { what: 'Nowoczesny context manager dla timeoutów. Czytelniejszy niż asyncio.wait_for(). Rzuca TimeoutError.', how: 'try: async with asyncio.timeout(5): await download() except TimeoutError: print("za wolno")', tips: ['Zastępuje asyncio.wait_for() w Python 3.11+', 'asyncio.timeout_at(deadline) — absolutny timestamp zamiast delta', 'Można sprawdzić: asyncio.current_task().cancelling()'] }
          },
          { cmd: 'async with asyncio.TaskGroup() as tg:', desc: 'Grupuj Tasks — strukturalna współbieżność (Python 3.11+)',
            detail: { what: 'TaskGroup uruchamia Tasks i czeka na wszystkie. Jeśli jeden rzuci wyjątek — anuluje pozostałe i propaguje ExceptionGroup.', how: 'async with asyncio.TaskGroup() as tg: t1 = tg.create_task(f1()); t2 = tg.create_task(f2())', tips: ['Nowocześniejszy niż asyncio.gather() — automatyczna obsługa błędów', 'Zastępuje try/finally z task.cancel()', 'except* ExceptionGroup as eg: — nowa składnia dla ExceptionGroup'] }
          },
          { cmd: 'results = await asyncio.gather(*coros, return_exceptions=True)', desc: 'Zbierz wyniki lub błędy bez rzucania',
            detail: { what: 'return_exceptions=True: zamiast rzucać wyjątek gdy korutyna padnie, zwraca go jako element listy wyników. Możesz przetworzyć co się udało a co nie.', how: 'results = await asyncio.gather(*tasks, return_exceptions=True); errors = [r for r in results if isinstance(r, Exception)]', tips: ['Bez return_exceptions: jeden błąd anuluje wszystkie i rzuca wyjątek', 'Sprawdź: [r for r in results if not isinstance(r, Exception)] — sukcesy', 'Dobre dla batch operacji gdzie częściowy sukces jest akceptowalny'] }
          },
        ]
      },
    ];
