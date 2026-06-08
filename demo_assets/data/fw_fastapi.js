const FW_FASTAPI_DATA = {
  meta: {
    id: 'fastapi', name: 'FastAPI', icon: '🚀', color: '#009688', color2: '#ff5722',
    tagline: 'Nowoczesne, szybkie API w Pythonie z automatyczną dokumentacją',
    year: 2018, author: 'Sebastián Ramírez (tiangolo)', lang: 'Python 3.8+',
    github: 'tiangolo/fastapi', stars: '75k+', codeLang: 'Python'
  },

  tabs: [
    { id: 'podstawy',   label: 'Podstawy' },
    { id: 'komponenty', label: 'Endpointy' },
    { id: 'hooki',      label: 'Zależności' },
    { id: 'routing',    label: 'Walidacja' },
    { id: 'state',      label: 'Async' },
    { id: 'rywale',     label: 'Rywale' },
    { id: 'pluginy',    label: 'Rozszerzenia' },
    { id: 'komendy',    label: 'Komendy' },
  ],

  content: {
    podstawy: {
      labels: {
        concepts: 'Kluczowe koncepcje',
        whenToUse: 'Kiedy używać FastAPI?',
        firstComponent: 'Pierwszy endpoint',
        firstComponentLang: 'Python'
      },
      intro: {
        title: 'Czym jest FastAPI?',
        desc: 'FastAPI to nowoczesny framework do budowania API w Pythonie. Oparty na standardach OpenAPI i JSON Schema. Automatycznie generuje interaktywną dokumentację (Swagger UI). Jeden z najszybszych frameworków Python — wydajnością dorównuje NodeJS i Go dzięki ASGI i async/await.',
      },
      concepts: [
        {
          title: 'Type Hints',
          desc: 'FastAPI używa type hints Pythona do automatycznej walidacji, serializacji i generowania dokumentacji. Piszesz typy → FastAPI robi resztę.',
          icon: '🏷️'
        },
        {
          title: 'Pydantic',
          desc: 'Walidacja danych przez modele Pydantic. Definiujesz schemat jako klasę Python — FastAPI waliduje request i zwraca czytelne błędy automatycznie.',
          icon: '🔒'
        },
        {
          title: 'Async / Await',
          desc: 'Natywna obsługa async/await. Endpoint może być synchroniczny lub asynchroniczny — FastAPI sam obsłuży oba przypadki przez ASGI (Starlette).',
          icon: '⚡'
        },
        {
          title: 'Auto Docs',
          desc: 'Swagger UI dostępny na /docs, ReDoc na /redoc. Zero konfiguracji — dokumentacja generuje się z kodu automatycznie przy każdej zmianie.',
          icon: '📄'
        }
      ],
      whenToUse: [
        'REST API do automatyzacji i scrapingu (odbieranie wyników, wyzwalanie tasków)',
        'Backend dla agentów AI (LangGraph, MCP endpoints)',
        'Mikroserwisy i pipeline\'y danych',
        'Szybkie prototypy API z automatyczną dokumentacją',
        'Zastąpienie Flask gdy potrzebujesz walidacji, async i typów'
      ],
      firstComponent: `from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello, FastAPI!"}

@app.get("/items/{item_id}")
def get_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "query": q}

# Uruchom: uvicorn main:app --reload
# Docs:    http://localhost:8000/docs`
    },

    komponenty: [
      {
        title: 'GET — pobieranie danych',
        desc: 'Podstawowy endpoint GET. Path parameters w URL, query params jako argumenty funkcji z domyślnymi wartościami.',
        code: `from fastapi import FastAPI

app = FastAPI()

@app.get("/users/{user_id}")
def get_user(user_id: int, active: bool = True):
    # user_id z URL: /users/42
    # active z query: /users/42?active=false
    return {"id": user_id, "active": active}

@app.get("/search")
def search(q: str, limit: int = 10, offset: int = 0):
    # /search?q=python&limit=5&offset=10
    return {"query": q, "limit": limit, "offset": offset}`
      },
      {
        title: 'POST — wysyłanie danych (Pydantic)',
        desc: 'Endpoint POST z walidacją body przez model Pydantic. FastAPI automatycznie parsuje JSON i waliduje pola.',
        code: `from fastapi import FastAPI
from pydantic import BaseModel, EmailStr

app = FastAPI()

class UserCreate(BaseModel):
    name: str
    email: str
    age: int | None = None  # opcjonalne

@app.post("/users", status_code=201)
def create_user(user: UserCreate):
    # user.name, user.email są już zwalidowane
    # Błędny JSON → automatyczny 422 z opisem błędu
    return {"created": user.model_dump()}`
      },
      {
        title: 'PUT / PATCH / DELETE',
        desc: 'Pełne CRUD — update i usuwanie zasobów. status_code kontroluje kod odpowiedzi HTTP.',
        code: `from fastapi import FastAPI, HTTPException

app = FastAPI()

@app.put("/users/{user_id}")
def update_user(user_id: int, user: UserCreate):
    if user_id not in db:
        raise HTTPException(status_code=404, detail="User not found")
    db[user_id] = user
    return db[user_id]

@app.delete("/users/{user_id}", status_code=204)
def delete_user(user_id: int):
    if user_id not in db:
        raise HTTPException(status_code=404, detail="Not found")
    del db[user_id]`
      },
      {
        title: 'Response Model — kontrola odpowiedzi',
        desc: 'response_model filtruje co zwraca API. Możesz mieć inny model wejściowy (z hasłem) i wyjściowy (bez hasła).',
        code: `from pydantic import BaseModel

class UserIn(BaseModel):
    name: str
    password: str  # przyjmujemy od klienta

class UserOut(BaseModel):
    name: str      # ale NIE zwracamy hasła!
    id: int

@app.post("/users", response_model=UserOut)
def create_user(user: UserIn):
    # FastAPI automatycznie odfiltruje 'password'
    return {"name": user.name, "id": 1}`
      },
      {
        title: 'Obsługa błędów — HTTPException',
        desc: 'HTTPException do zwracania błędów HTTP z czytelnym komunikatem. Custom exception handlers dla globalnej obsługi błędów.',
        code: `from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse

app = FastAPI()

@app.get("/items/{item_id}")
def get_item(item_id: int):
    if item_id < 0:
        raise HTTPException(
            status_code=400,
            detail="ID nie może być ujemne"
        )
    if item_id > 1000:
        raise HTTPException(status_code=404, detail="Not found")
    return {"id": item_id}

# Globalny handler
@app.exception_handler(ValueError)
async def value_error_handler(request: Request, exc: ValueError):
    return JSONResponse(status_code=422, content={"error": str(exc)})`
      },
      {
        title: 'Background Tasks — zadania w tle',
        desc: 'Uruchom zadanie po zwróceniu odpowiedzi. Idealne do automatyzacji: scraping, zapis do DB, wysyłka emaila — bez blokowania klienta.',
        code: `from fastapi import FastAPI, BackgroundTasks

app = FastAPI()

def scrape_url(url: str):
    # długo działający task — nie blokuje odpowiedzi
    result = requests.get(url)
    save_to_db(result)

@app.post("/scrape")
def start_scrape(url: str, background_tasks: BackgroundTasks):
    background_tasks.add_task(scrape_url, url)
    # Klient dostaje odpowiedź natychmiast
    return {"status": "started", "url": url}`
      }
    ],

    hooki: [
      {
        name: 'Depends() — Dependency Injection',
        desc: 'System zależności FastAPI. Funkcja zależności jest wywoływana przed endpointem i jej wynik wstrzykiwany jako argument.',
        when: 'Autoryzacja, połączenie z DB, wspólna logika między wieloma endpointami',
        code: `from fastapi import FastAPI, Depends, HTTPException

app = FastAPI()

# Zależność — sprawdza token
def verify_token(token: str):
    if token != "secret":
        raise HTTPException(status_code=401, detail="Unauthorized")
    return {"user": "admin"}

@app.get("/protected")
def protected_route(user = Depends(verify_token)):
    return {"message": "Witaj!", "user": user}`
      },
      {
        name: 'Depends() — połączenie z bazą',
        desc: 'Klasyczny wzorzec: zależność zarządza sesją DB, endpoint jej używa, sesja zamykana automatycznie po request.',
        when: 'Każdy endpoint potrzebujący połączenia z bazą danych',
        code: `from sqlalchemy.orm import Session
from fastapi import Depends

def get_db():
    db = SessionLocal()
    try:
        yield db          # udostępnij sesję
    finally:
        db.close()        # zamknij po request

@app.get("/users/{id}")
def get_user(id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == id).first()
    if not user:
        raise HTTPException(404, "Not found")
    return user`
      },
      {
        name: 'Lifespan — startup i shutdown',
        desc: 'Kod uruchamiany przy starcie i zamknięciu aplikacji. Inicjalizacja połączeń, ładowanie modeli ML, cache.',
        when: 'Połączenie z Redis, inicjalizacja klienta AI, ładowanie dużych modeli',
        code: `from contextlib import asynccontextmanager
from fastapi import FastAPI

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup — przy starcie serwera
    print("Łączę z Redis...")
    app.state.redis = await create_redis()
    app.state.model = load_ml_model()

    yield  # aplikacja działa

    # Shutdown — przy zamknięciu
    await app.state.redis.close()
    print("Redis rozłączony")

app = FastAPI(lifespan=lifespan)`
      },
      {
        name: 'Middleware — przetwarzanie requestów',
        desc: 'Middleware to kod który wykonuje się dla KAŻDEGO requestu — przed i po endpoint. Logowanie, CORS, timing, auth.',
        when: 'Logowanie requestów, mierzenie czasu odpowiedzi, dodawanie nagłówków',
        code: `import time
from fastapi import FastAPI, Request

app = FastAPI()

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start = time.time()

    # Przed endpointem
    print(f"→ {request.method} {request.url}")

    response = await call_next(request)

    # Po endpoincie
    duration = time.time() - start
    print(f"← {response.status_code} ({duration:.2f}s)")

    return response`
      },
      {
        name: 'OAuth2 / JWT — autoryzacja',
        desc: 'Wbudowana obsługa OAuth2 z Bearer tokenem. Łatwa integracja z JWT dla stateless autoryzacji.',
        when: 'Chronione endpointy wymagające zalogowania',
        code: `from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_current_user(token: str = Depends(oauth2_scheme)):
    user = verify_jwt_token(token)  # twoja logika
    if not user:
        raise HTTPException(401, "Invalid token")
    return user

@app.get("/me")
def read_me(user = Depends(get_current_user)):
    return user`
      },
      {
        name: 'APIRouter — podział na moduły',
        desc: 'APIRouter pozwala podzielić API na osobne pliki/moduły. Każdy router ma własny prefix i tagi w dokumentacji.',
        when: 'Gdy app.py robi się za duże — podział na users.py, items.py, scraper.py',
        code: `# routers/scraper.py
from fastapi import APIRouter

router = APIRouter(prefix="/scraper", tags=["Scraper"])

@router.post("/run")
def run_scraper(url: str):
    return {"status": "started"}

@router.get("/results")
def get_results():
    return []

# main.py
from routers import scraper
app.include_router(scraper.router)`
      }
    ],

    routing: {
      install: 'pip install fastapi uvicorn[standard]',
      version: 'FastAPI 0.110+ / Pydantic v2',
      sections: [
        {
          title: 'Pydantic BaseModel — walidacja danych',
          code: `from pydantic import BaseModel, Field, field_validator

class ScrapingJob(BaseModel):
    url: str = Field(..., description="URL do scrapowania")
    depth: int = Field(default=1, ge=1, le=5)
    timeout: float = Field(default=30.0, gt=0)
    tags: list[str] = []

    @field_validator('url')
    @classmethod
    def url_must_be_http(cls, v):
        if not v.startswith(('http://', 'https://')):
            raise ValueError('URL musi zaczynać się od http(s)://')
        return v

# FastAPI automatycznie waliduje i zwraca 422 przy błędzie`
        },
        {
          title: 'Query Parameters z walidacją',
          code: `from fastapi import FastAPI, Query
from typing import Annotated

app = FastAPI()

@app.get("/items")
def list_items(
    q: Annotated[str | None, Query(min_length=3, max_length=50)] = None,
    limit: Annotated[int, Query(ge=1, le=100)] = 10,
    tags: list[str] = Query(default=[])
):
    # FastAPI waliduje: limit musi być 1-100
    # q musi mieć 3-50 znaków (lub być None)
    return {"q": q, "limit": limit, "tags": tags}`
        },
        {
          title: 'Nested Models — zagnieżdżone modele',
          code: `from pydantic import BaseModel

class Address(BaseModel):
    street: str
    city: str
    country: str = "PL"

class Company(BaseModel):
    name: str
    address: Address         # zagnieżdżony model
    employees: list[str] = []

@app.post("/companies")
def create_company(company: Company):
    # Pydantic waliduje rekurencyjnie
    return company.model_dump()`
        },
        {
          title: 'Enum jako parametr',
          code: `from enum import Enum
from fastapi import FastAPI

class ScrapingMode(str, Enum):
    fast = "fast"
    deep = "deep"
    stealth = "stealth"

app = FastAPI()

@app.get("/scrape/{mode}")
def scrape(mode: ScrapingMode):
    # FastAPI waliduje: tylko "fast", "deep", "stealth"
    # Swagger pokazuje dropdown z opcjami
    if mode == ScrapingMode.stealth:
        return {"headers": "rotated", "delay": "random"}
    return {"mode": mode}`
        },
        {
          title: 'File Upload — wgrywanie plików',
          code: `from fastapi import FastAPI, File, UploadFile

app = FastAPI()

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    contents = await file.read()
    return {
        "filename": file.filename,
        "size": len(contents),
        "content_type": file.content_type
    }

@app.post("/upload-multiple")
async def upload_multiple(files: list[UploadFile] = File(...)):
    return [{"filename": f.filename} for f in files]`
        },
        {
          title: 'Custom Response — zwracanie różnych formatów',
          code: `from fastapi import FastAPI
from fastapi.responses import (
    JSONResponse, HTMLResponse,
    StreamingResponse, FileResponse
)

app = FastAPI()

@app.get("/html", response_class=HTMLResponse)
def get_html():
    return "<h1>Hello!</h1>"

@app.get("/download")
def download_file():
    return FileResponse("data.csv", filename="export.csv")

@app.get("/stream")
def stream_data():
    def generator():
        for i in range(100):
            yield f"data: {i}\\n\\n"
    return StreamingResponse(generator(), media_type="text/event-stream")`
        }
      ]
    },

    state: [
      {
        name: 'Synchroniczny endpoint',
        icon: '🔄',
        color: '#009688',
        complexity: 'Prosta',
        bundle: 'def (sync)',
        when: 'Szybkie operacje, bez I/O, prosta logika. FastAPI odpala w thread pool.',
        code: `@app.get("/compute")
def heavy_compute(n: int):
    # CPU-bound — OK jako sync
    result = sum(i**2 for i in range(n))
    return {"result": result}`
      },
      {
        name: 'Asynchroniczny endpoint',
        icon: '⚡',
        color: '#00bcd4',
        complexity: 'Średnia',
        bundle: 'async def',
        when: 'I/O-bound: HTTP requests, baza danych, Redis, pliki. Nie blokuje serwera podczas oczekiwania.',
        code: `import httpx

@app.get("/fetch")
async def fetch_data(url: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        return response.json()
    # Podczas await — serwer obsługuje inne requesty`
      },
      {
        name: 'asyncio.gather — równoległe requesty',
        icon: '🚀',
        color: '#4caf50',
        complexity: 'Średnia',
        bundle: 'asyncio',
        when: 'Scrapowanie wielu URLi naraz. 10 requestów równolegle zamiast sekwencyjnie.',
        code: `import asyncio, httpx

@app.post("/scrape-many")
async def scrape_many(urls: list[str]):
    async with httpx.AsyncClient() as client:
        tasks = [client.get(url) for url in urls]
        # Wszystkie requesty lecą równolegle!
        responses = await asyncio.gather(*tasks)
    return [r.status_code for r in responses]`
      },
      {
        name: 'asyncio.Queue — kolejka tasków',
        icon: '📋',
        color: '#ff9800',
        complexity: 'Wysoka',
        bundle: 'asyncio.Queue',
        when: 'Pipeline automatyzacji: producent dodaje zadania, worker je przetwarza w tle.',
        code: `queue = asyncio.Queue()

async def worker():
    while True:
        task = await queue.get()
        await process_task(task)
        queue.task_done()

@app.on_event("startup")
async def start_worker():
    asyncio.create_task(worker())

@app.post("/tasks")
async def add_task(url: str):
    await queue.put(url)
    return {"queued": url, "size": queue.qsize()}`
      },
      {
        name: 'Redis + aioredis — async cache',
        icon: '🔴',
        color: '#ef5350',
        complexity: 'Średnia',
        bundle: 'redis.asyncio',
        when: 'Cache wyników scrapowania. Nie scraper tego samego URL dwa razy w ciągu godziny.',
        code: `import redis.asyncio as aioredis

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.redis = await aioredis.from_url("redis://localhost")
    yield
    await app.state.redis.close()

@app.get("/scrape")
async def scrape_cached(url: str, request: Request):
    r = request.app.state.redis
    cached = await r.get(url)
    if cached:
        return {"source": "cache", "data": cached}

    data = await fetch(url)
    await r.set(url, data, ex=3600)  # cache 1h
    return {"source": "fresh", "data": data}`
      },
      {
        name: 'WebSockets — live updates',
        icon: '🔌',
        color: '#9c27b0',
        complexity: 'Wysoka',
        bundle: 'WebSocket',
        when: 'Live status scrapowania, streaming wyników agenta AI do frontendu.',
        code: `from fastapi import WebSocket

@app.websocket("/ws/scrape")
async def websocket_scrape(ws: WebSocket):
    await ws.accept()
    urls = await ws.receive_json()

    for url in urls:
        result = await scrape(url)
        await ws.send_json({
            "url": url,
            "status": "done",
            "data": result
        })

    await ws.close()`
      }
    ],

    rywale: [
      {
        name: 'Flask',
        icon: '🌶️',
        color: '#a0a0a0',
        tagline: 'Mikro-framework Python — stary standard',
        pros: ['Ogromna społeczność', 'Mnóstwo tutoriali', 'Minimalistyczny core', 'Prosta nauka'],
        cons: ['Brak async natywnie', 'Brak walidacji — musisz sam', 'Brak auto-dokumentacji', 'Wolniejszy od FastAPI'],
        vsReact: 'Flask jest prostszy na start ale brakuje mu tego co FastAPI daje za darmo: walidacji, typów, docs. Dla nowych projektów FastAPI jest lepszym wyborem.',
        bestFor: 'Małe aplikacje, legacy projekty, gdy team zna Flask'
      },
      {
        name: 'Django REST',
        icon: '🎸',
        color: '#44b78b',
        tagline: 'Pełny framework — bateryjny',
        pros: ['Wbudowany ORM, admin, auth', 'Świetna dla CRUD aplikacji', 'DRF Serializers', 'Duży ekosystem'],
        cons: ['Ciężki i wolny', 'Trudna integracja async', 'Dużo boilerplate', 'Słabszy dla czystego API'],
        vsReact: 'Django to cały framework (ORM, admin, auth, templates). FastAPI to czyste API. Jeśli potrzebujesz tylko REST API — FastAPI. Jeśli potrzebujesz też panelu admina — Django.',
        bestFor: 'Duże aplikacje webowe, systemy z panelem admina, CRUD-heavy projekty'
      },
      {
        name: 'Litestar',
        icon: '💫',
        color: '#edb641',
        tagline: 'Wydajny ASGI framework',
        pros: ['Bardzo wydajny', 'Pydantic + attrs', 'Wbudowane caching', 'Podobne API do FastAPI'],
        cons: ['Mniejsza społeczność', 'Mniej tutoriali', 'Mniejszy ekosystem', 'Nowszy — mniej battle-tested'],
        vsReact: 'Litestar jest szybszy od FastAPI w benchmarkach i ma więcej wbudowanych funkcji. Ale FastAPI ma 10x większą społeczność i więcej zasobów do nauki.',
        bestFor: 'Projekty wymagające maksymalnej wydajności, gdy FastAPI jest za wolny'
      },
      {
        name: 'aiohttp',
        icon: '🌊',
        color: '#2196f3',
        tagline: 'Async HTTP serwer i klient',
        pros: ['Dojrzały async framework', 'Świetny jako klient HTTP', 'Niski overhead', 'Dobra wydajność'],
        cons: ['Brak walidacji', 'Brak auto-docs', 'Starszy design API', 'Mniej ergonomiczny'],
        vsReact: 'aiohttp to bardziej niski poziom — świetny jako klient HTTP (scraping), słabszy jako framework API. FastAPI jako serwer + aiohttp/httpx jako klient = dobra kombinacja.',
        bestFor: 'Klient HTTP w automatyzacji, gdy potrzebujesz niskiego overhead'
      },
      {
        name: 'Express (Node)',
        icon: '🟨',
        color: '#f7df1e',
        tagline: 'Minimalistyczny framework Node.js',
        pros: ['Ogromny ekosystem npm', 'Szybki', 'Jeden język full-stack', 'TypeScript support'],
        cons: ['JavaScript/TypeScript zamiast Python', 'Brak walidacji natywnie', 'Callback hell (historycznie)', 'Nie dla Python developerów'],
        vsReact: 'Express jeśli już jesteś w Node.js ekosystemie. FastAPI jeśli pracujesz w Pythonie — szczególnie przy automatyzacji, ML i scrapingu gdzie Python ma przewagę.',
        bestFor: 'Full-stack JS/TS, gdy backend i frontend w tym samym języku'
      },
      {
        name: 'Tornado',
        icon: '🌪️',
        color: '#336699',
        tagline: 'Async Python — stary weteran',
        pros: ['Dojrzały async (przed asyncio)', 'WebSockets natywnie', 'Sprawdzony w produkcji', 'Niski footprint'],
        cons: ['Starszy design', 'Mniej ergonomiczny', 'Mniejsza społeczność', 'Brak nowoczesnych features'],
        vsReact: 'Tornado był async przed erą asyncio. Dziś FastAPI + asyncio robi to samo lepiej i bardziej ergonomicznie. Tornado to głównie legacy projekty.',
        bestFor: 'Legacy projekty, long-polling, specyficzne przypadki WebSocket'
      }
    ],

    pluginy: [
      {
        name: 'SQLModel',
        icon: '🗄️',
        color: '#009688',
        tagline: 'ORM łączący SQLAlchemy + Pydantic — od autora FastAPI',
        install: 'pip install sqlmodel',
        use: 'Jeden model = schemat DB + schemat API. Zero duplikacji klas. Walidacja Pydantic + SQL przez SQLAlchemy. Projektowany razem z FastAPI.',
        example: `from sqlmodel import SQLModel, Field, Session, create_engine

class Hero(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    power: str

engine = create_engine("sqlite:///heroes.db")
SQLModel.metadata.create_all(engine)`
      },
      {
        name: 'fastapi-users',
        icon: '👤',
        color: '#3F51B5',
        tagline: 'Kompletny system auth i zarządzania użytkownikami',
        install: 'pip install fastapi-users[sqlalchemy]',
        use: 'Rejestracja, logowanie, reset hasła, OAuth2 (Google, GitHub) gotowe w 5 minutach. JWT + cookie auth. Nie pisz auth od zera.',
        example: `from fastapi_users import FastAPIUsers

fastapi_users = FastAPIUsers[User, uuid.UUID](
    get_user_manager, [auth_backend])

app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth/jwt")`
      },
      {
        name: 'slowapi',
        icon: '🚦',
        color: '#F44336',
        tagline: 'Rate limiting — ogranicz requesty per IP/user',
        install: 'pip install slowapi',
        use: 'Ogranicza liczbę requestów per użytkownik/IP. Port flask-limiter dla FastAPI. Jeden dekorator na endpoint. Backend: memory lub Redis.',
        example: `from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@app.get("/api/data")
@limiter.limit("10/minute")
async def get_data(request: Request):
    return {"data": "ok"}`
      },
      {
        name: 'fastapi-pagination',
        icon: '📄',
        color: '#FF9800',
        tagline: 'Automatyczna paginacja list',
        install: 'pip install fastapi-pagination',
        use: 'Paginacja z parametrami page/size w query string. Obsługuje SQLAlchemy, SQLModel. Zero boilerplate — jeden dekorator.',
        example: `from fastapi_pagination import Page, paginate, add_pagination

@app.get("/users", response_model=Page[UserRead])
def get_users(db: Session = Depends(get_db)):
    return paginate(db.query(User).all())

add_pagination(app)`
      },
      {
        name: 'pydantic-settings',
        icon: '⚙️',
        color: '#9C27B0',
        tagline: 'Konfiguracja z env vars i pliku .env',
        install: 'pip install pydantic-settings',
        use: 'Zarządzanie konfiguracją przez zmienne środowiskowe i .env. Walidacja typów Pydantic, wartości domyślne. Standard w każdym projekcie FastAPI.',
        example: `from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    secret_key: str
    debug: bool = False
    allowed_hosts: list[str] = ["*"]

    model_config = {"env_file": ".env"}

settings = Settings()`
      },
      {
        name: 'fastapi-cache2',
        icon: '⚡',
        color: '#00BCD4',
        tagline: 'Cache odpowiedzi endpointów (Redis / in-memory)',
        install: 'pip install fastapi-cache2[redis]',
        use: 'Cachuje odpowiedzi endpointów. Jeden dekorator, konfigurujesz TTL. Backend: Redis lub in-memory. Drastycznie redukuje obciążenie DB.',
        example: `from fastapi_cache.decorator import cache
from fastapi_cache.backends.redis import RedisBackend

@app.get("/expensive-query")
@cache(expire=300)  # cache 5 minut
async def get_stats():
    return await compute_heavy_stats()`
      },
      {
        name: 'Alembic',
        icon: '🔄',
        color: '#795548',
        tagline: 'Migracje schematu bazy danych',
        install: 'pip install alembic',
        use: 'Wersjonowanie i migracje schematu DB. Generuje skrypty SQL przy zmianach w modelach. Niezbędny w każdym projekcie z SQLAlchemy — bez niego tracisz dane przy zmianach.',
        example: `alembic init alembic
alembic revision --autogenerate -m "add users table"
alembic upgrade head       # zastosuj migracje
alembic downgrade -1       # cofnij ostatnią migrację`
      },
      {
        name: 'Celery',
        icon: '🌿',
        color: '#37B24D',
        tagline: 'Kolejka zadań w tle (background tasks)',
        install: 'pip install celery redis',
        use: 'Ciężkie zadania (email, przetwarzanie obrazów, raporty PDF) poza cyklem request-response. FastAPI ma wbudowane BackgroundTasks — Celery dla cięższych i powtarzalnych operacji z retry.',
        example: `from celery import Celery

celery = Celery('tasks', broker='redis://localhost/0')

@celery.task(bind=True, max_retries=3)
def send_report(self, user_id: int):
    try:
        generate_and_send_pdf(user_id)
    except Exception as exc:
        raise self.retry(exc=exc, countdown=60)`
      }
    ],

    komendy: [
      {
        category: 'Instalacja i setup',
        icon: '🚀',
        items: [
          { cmd: 'pip install fastapi uvicorn[standard]', desc: 'FastAPI + serwer ASGI (zalecane)',
            detail: { what: 'Instaluje FastAPI i Uvicorn — serwer ASGI który uruchamia aplikację. [standard] dodaje WebSockets, HTTP/2 i szybszy parser (uvloop, httptools).', how: 'FastAPI to framework, Uvicorn to serwer. Razem jak Flask + Gunicorn. ASGI = Asynchronous Server Gateway Interface — nowoczesny standard dla async Python.', tips: ['uvicorn[standard] = +uvloop (szybszy event loop), +httptools (szybszy parser)', 'Alternatywa: hypercorn (obsługuje HTTP/2, HTTP/3)', 'Produkcja: gunicorn z workerami uvicorn'] }
          },
          { cmd: 'pip install "fastapi[all]"', desc: 'FastAPI ze wszystkimi opcjonalnymi zależnościami',
            detail: { what: 'Instaluje FastAPI z wszystkimi dodatkami: email-validator, python-multipart (upload plików), jinja2 (templates), pydantic-settings.', how: '[all] to zbiorcza zależność — instaluje paczki które mogą być potrzebne w różnych przypadkach użycia.', tips: ['Wygodne na dev, na produkcji instaluj tylko to czego używasz', 'python-multipart jest wymagane do File Upload', 'email-validator do walidacji emaili w Pydantic'] }
          },
          { cmd: 'pip install httpx pytest pytest-asyncio', desc: 'Klient HTTP + testowanie async',
            detail: { what: 'httpx = nowoczesny HTTP client (async + sync). pytest = test runner. pytest-asyncio = testy dla async funkcji FastAPI.', how: 'FastAPI TestClient oparty jest na httpx. pytest-asyncio pozwala pisać testy jako async def z @pytest.mark.asyncio.', tips: ['httpx zastępuje requests dla async kodu', 'TestClient = synchroniczny wrapper do testowania FastAPI', 'pytest-asyncio: dodaj asyncio_mode = "auto" do pytest.ini'] }
          },
          { cmd: 'pip install sqlalchemy alembic', desc: 'ORM + migracje bazy danych',
            detail: { what: 'SQLAlchemy = ORM (Object Relational Mapper) — praca z bazą przez klasy Python. Alembic = migracje schematu bazy — wersjonowanie zmian w strukturze tabel.', how: 'SQLAlchemy 2.0 wspiera async. Alembic śledzi zmiany modeli i generuje skrypty SQL migracji.', tips: ['alembic init alembic — inicjalizuj', 'alembic revision --autogenerate -m "add users" — generuj migrację', 'alembic upgrade head — zastosuj migracje'] }
          },
          { cmd: 'pip install pydantic-settings', desc: 'Konfiguracja przez zmienne środowiskowe',
            detail: { what: 'pydantic-settings to Pydantic dla konfiguracji aplikacji. Czyta z pliku .env i zmiennych środowiskowych z walidacją typów.', how: 'Klasa Settings dziedziczy po BaseSettings. Pola są automatycznie wypełniane z .env lub os.environ.', tips: ['DATABASE_URL, SECRET_KEY, API_KEY — nigdy hardcode w kodzie!', 'model_config = SettingsConfigDict(env_file=".env")', 'Użyj w Depends(): def get_settings(): return Settings()'] }
          },
        ]
      },
      {
        category: 'Uruchamianie serwera',
        icon: '⚡',
        items: [
          { cmd: 'uvicorn main:app --reload', desc: 'Dev serwer z auto-reload przy zmianach',
            detail: { what: 'Uruchamia FastAPI w trybie deweloperskim. --reload = restart serwera przy każdej zmianie pliku. main = nazwa pliku (main.py), app = zmienna FastAPI.', how: 'uvicorn nasłuchuje na zmianach w systemie plików (watchfiles). Zmienisz kod → serwer restartuje automatycznie.', flags: [{flag: '--reload', desc: 'Auto-restart przy zmianach (dev only)'}, {flag: '--port 8080', desc: 'Zmień port (domyślnie 8000)'}, {flag: '--host 0.0.0.0', desc: 'Dostępny z sieci LAN'}, {flag: '--workers 4', desc: 'Ilość procesów (tylko bez --reload)'}], tips: ['http://localhost:8000/docs — Swagger UI', 'http://localhost:8000/redoc — ReDoc', 'Ctrl+C żeby zatrzymać'] }
          },
          { cmd: 'uvicorn main:app --host 0.0.0.0 --port 8080', desc: 'Serwer dostępny w sieci na porcie 8080',
            detail: { what: 'Uruchamia serwer na wszystkich interfejsach sieciowych — dostępny z innych urządzeń i kontenerów Docker.', how: '0.0.0.0 = nasłuchuj na wszystkich interfejsach (localhost + LAN + Docker bridge). Potrzebne w kontenerach Docker (domyślnie 127.0.0.1 nie jest dostępne z zewnątrz).', tips: ['W Docker MUSISZ użyć --host 0.0.0.0', 'Nie używaj w produkcji bez firewall / reverse proxy (nginx)', 'PORT jako env var: uvicorn main:app --port ${PORT:-8000}'] }
          },
          { cmd: 'gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker', desc: 'Produkcyjny serwer z wieloma workerami',
            detail: { what: 'Gunicorn jako process manager + Uvicorn jako ASGI worker. 4 workery = 4 procesy obsługujące requesty równolegle. Standard produkcyjny.', how: 'Gunicorn zarządza procesami, Uvicorn obsługuje ASGI. -w 4 = 4 workery. Reguła: 2 × CPU + 1.', flags: [{flag: '-w 4', desc: '4 workery (2×CPU+1)'}, {flag: '-b 0.0.0.0:8000', desc: 'Bind adres'}, {flag: '--timeout 120', desc: 'Timeout requesta w sekundach'}, {flag: '--access-logfile -', desc: 'Logi do stdout'}], tips: ['Nie używaj --reload z gunicorn', 'W Docker: CMD ["gunicorn", "main:app", "-w", "4", "-k", "uvicorn.workers.UvicornWorker"]'] }
          },
          { cmd: 'python -m uvicorn main:app --reload', desc: 'Alternatywny sposób uruchamiania',
            detail: { what: 'Identyczne z uvicorn main:app --reload ale uruchamiane przez moduł Python. Przydatne gdy uvicorn nie jest w PATH.', how: '-m uvicorn = uruchom pakiet uvicorn jako skrypt. Gwarantuje użycie uvicorn z aktywnego venv.', tips: ['Używaj gdy: command not found po pip install uvicorn', 'Upewnij się że venv jest aktywowany: source venv/bin/activate'] }
          },
        ]
      },
      {
        category: 'Testowanie',
        icon: '🧪',
        items: [
          { cmd: 'pytest', desc: 'Uruchom wszystkie testy',
            detail: { what: 'Uruchamia wszystkie pliki test_*.py i *_test.py. FastAPI TestClient symuluje requesty bez uruchamiania prawdziwego serwera.', how: 'pytest automatycznie wykrywa pliki testów. Dla FastAPI używasz from fastapi.testclient import TestClient.', tips: ['pytest -v = verbose, widać każdy test', 'pytest tests/test_users.py = tylko jeden plik', 'pytest -k "test_scrape" = testy zawierające "test_scrape" w nazwie'] }
          },
          { cmd: 'pytest -v --asyncio-mode=auto', desc: 'Testy async z auto-wykryciem',
            detail: { what: 'Uruchamia testy async z pytest-asyncio w trybie auto — nie musisz dekorować każdego async testu @pytest.mark.asyncio.', how: 'asyncio-mode=auto = wszystkie async def test_ automatycznie traktowane jako async testy.', tips: ['Dodaj do pytest.ini: [pytest] asyncio_mode = auto', 'Używaj httpx.AsyncClient zamiast TestClient dla async testów', 'AsyncClient wymaga app jako argument: AsyncClient(app=app, base_url="http://test")'] }
          },
          { cmd: 'pytest --cov=app --cov-report=html', desc: 'Testy z raportem pokrycia kodu',
            detail: { what: 'Uruchamia testy i generuje raport HTML coverage — widzisz które linie kodu są objęte testami.', how: 'Wymaga: pip install pytest-cov. Raport ląduje w htmlcov/index.html.', tips: ['Otwórz htmlcov/index.html w przeglądarce', 'Czerwone linie = nieobjęte testami', 'Cel: 80%+ dla kluczowych endpointów'] }
          },
          { cmd: 'pip install pytest-asyncio httpx', desc: 'Zainstaluj narzędzia do testów async',
            detail: { what: 'pytest-asyncio = obsługa async testów w pytest. httpx = klient HTTP używany przez FastAPI TestClient.', how: 'FastAPI TestClient używa httpx pod spodem. httpx jest wymagane do testowania async endpointów.', tips: ['TestClient = sync testy (prostsze)', 'httpx.AsyncClient = async testy (pełna kontrola)', 'Oba działają bez uruchamiania serwera'] }
          },
        ]
      },
      {
        category: 'Pydantic i walidacja',
        icon: '🔒',
        items: [
          { cmd: 'pip install pydantic[email]', desc: 'Pydantic z walidacją emaili',
            detail: { what: 'Dodaje EmailStr do Pydantic — typ który waliduje czy string jest poprawnym adresem email.', how: 'EmailStr = string z walidacją RFC 5322. Bez tej paczki FastAPI wyrzuci błąd przy próbie użycia EmailStr.', tips: ['from pydantic import EmailStr', 'class User(BaseModel): email: EmailStr', 'Pydantic v2 wymaga email-validator >= 2.0'] }
          },
          { cmd: 'python -c "from pydantic import BaseModel; print(BaseModel.__version__)"', desc: 'Sprawdź wersję Pydantic',
            detail: { what: 'Sprawdza zainstalowaną wersję Pydantic. Ważne bo Pydantic v1 i v2 mają inne API.', how: 'Pydantic v2 (2023+) jest przepisany w Rust — 5-50x szybszy. Zmienione API: .dict() → .model_dump(), .schema() → .model_json_schema().', tips: ['FastAPI 0.100+ wymaga Pydantic v2', '.model_dump() zamiast .dict()', '.model_validate() zamiast parse_obj()'], note: '⚠️ Pydantic v1 i v2 mają inne API — sprawdź wersję jeśli migrowujesz stary projekt.' }
          },
          { cmd: 'pip install pydantic-settings python-dotenv', desc: 'Konfiguracja z pliku .env',
            detail: { what: 'pydantic-settings = konfiguracja przez klasy Pydantic. python-dotenv = ładowanie .env do os.environ.', how: 'BaseSettings automatycznie czyta zmienne z .env i środowiskowych. Waliduje typy — DATABASE_URL: str = "..." zamiast os.getenv().', tips: ['Nigdy nie commituj .env do git — dodaj do .gitignore!', 'Trzymaj .env.example z placeholder wartościami', 'Na produkcji: zmienne środowiskowe zamiast .env'] }
          },
        ]
      },
      {
        category: 'Baza danych',
        icon: '🗄️',
        items: [
          { cmd: 'pip install asyncpg', desc: 'Async driver PostgreSQL (najszybszy)',
            detail: { what: 'asyncpg = najszybszy async driver PostgreSQL dla Python. Bezpośredni protokół wire, zero overhead.', how: 'Napisany w Cython. Działa z SQLAlchemy async lub bezpośrednio. Wymaga PostgreSQL >= 9.4.', tips: ['SQLAlchemy async używa asyncpg pod spodem', 'Bezpośrednio: conn = await asyncpg.connect(DSN)', 'Alternatywa: psycopg3 (nowszy, też async)'] }
          },
          { cmd: 'pip install redis[asyncio]', desc: 'Redis z obsługą async',
            detail: { what: 'Oficjalny Python klient Redis z obsługą async/await. Cache, kolejki, pub/sub, rate limiting.', how: 'redis.asyncio = async interface. Połączenie przez pool — wiele requesty współdzielą połączenia.', tips: ['redis.asyncio.from_url("redis://localhost")', 'await r.set("key", "value", ex=3600) — z TTL', 'await r.get("key") — odczyt', 'Używaj connection pool w lifespan!'] }
          },
          { cmd: 'alembic init alembic', desc: 'Inicjalizuj migracje bazy danych',
            detail: { what: 'Tworzy folder alembic/ z konfiguracją i env.py. Punkt startowy systemu migracji schematu bazy.', how: 'Alembic śledzi wersje schematu w tabeli alembic_version w bazie. Każda migracja to plik Python z upgrade() i downgrade().', tips: ['Po init: ustaw DATABASE_URL w alembic.ini', 'alembic revision --autogenerate -m "add table" — generuj z modeli', 'alembic upgrade head — zastosuj wszystkie'], note: 'Uruchom tylko raz na projekt!' }
          },
          { cmd: 'alembic revision --autogenerate -m "add users table"', desc: 'Generuj migrację z modeli SQLAlchemy',
            detail: { what: 'Porównuje obecny stan modeli SQLAlchemy z bazą i generuje plik migracji z różnicami.', how: 'Alembic importuje twoje modele, łączy się z bazą i generuje ALTER TABLE / CREATE TABLE na podstawie różnic.', tips: ['Zawsze przejrzyj wygenerowaną migrację przed zastosowaniem', 'Autogenerate nie wykrywa wszystkiego (np. zmian CHECK constraint)', 'alembic upgrade head żeby zastosować'] }
          },
          { cmd: 'alembic upgrade head', desc: 'Zastosuj wszystkie migracje',
            detail: { what: 'Uruchamia wszystkie niezastosowane migracje do najnowszej wersji (head). Aktualizuje strukturę bazy danych.', how: 'Alembic sprawdza tabelę alembic_version, wykonuje migracje w kolejności, aktualizuje wersję.', flags: [{flag: 'head', desc: 'Najnowsza wersja'}, {flag: '+1', desc: 'Następna migracja'}, {flag: 'revision_id', desc: 'Konkretna wersja'}], tips: ['alembic downgrade -1 — cofnij ostatnią migrację', 'alembic history — pokaż historię migracji', 'alembic current — pokaż aktualną wersję bazy'] }
          },
        ]
      },
      {
        category: 'Deployment',
        icon: '🚢',
        items: [
          { cmd: 'pip freeze > requirements.txt', desc: 'Zapisz zależności projektu',
            detail: { what: 'Generuje plik requirements.txt ze wszystkimi zainstalowanymi paczkami i ich dokładnymi wersjami.', how: 'pip freeze listuje wszystko w aktywnym środowisku (venv). Wersje są pinned (==) — gwarantuje reprodukowalność.', tips: ['Zawsze twórz venv przed projektem: python -m venv venv', 'Aktywuj: source venv/bin/activate (Linux/Mac) lub venv\\Scripts\\activate (Windows)', 'pip install -r requirements.txt — zainstaluj u innego dewelopera'], note: '⚠️ pip freeze listuje WSZYSTKIE paczki łącznie z zależnościami zależności. Alternatywa: pip-tools dla czystszego zarządzania.' }
          },
          { cmd: 'pip install -r requirements.txt', desc: 'Zainstaluj zależności z pliku',
            detail: { what: 'Instaluje wszystkie paczki z pliku requirements.txt — odtworzy identyczne środowisko.', how: 'pip czyta każdą linię requirements.txt i instaluje paczki z podanymi wersjami.', tips: ['pip install -r requirements.txt --no-deps — bez sprawdzania zależności', 'pip install -r requirements.txt -q — cicho (mniej output)', 'Pierwszy krok po git clone projektu FastAPI'] }
          },
          { cmd: 'docker build -t my-api .', desc: 'Zbuduj Docker image',
            detail: { what: 'Buduje Docker image z aplikacją FastAPI na podstawie Dockerfile w bieżącym folderze.', how: 'Docker czyta Dockerfile, instaluje paczki, kopiuje kod, konfiguruje CMD. -t my-api = nadaj nazwę (tag).', tips: ['Dockerfile dla FastAPI: FROM python:3.11-slim, COPY requirements.txt, RUN pip install -r requirements.txt, COPY . ., CMD uvicorn main:app --host 0.0.0.0', 'docker build . --no-cache — wymuś rebuild od zera', 'docker images — lista zbudowanych obrazów'] }
          },
          { cmd: 'docker run -p 8000:8000 my-api', desc: 'Uruchom kontener FastAPI',
            detail: { what: 'Uruchamia kontener z aplikacją i mapuje port 8000 kontenera na port 8000 hosta.', how: '-p HOST:CONTAINER. Aplikacja wewnątrz kontenera nasłuchuje na 8000, dostępna na localhost:8000.', flags: [{flag: '-p 8000:8000', desc: 'Mapowanie portów'}, {flag: '-e DATABASE_URL=...', desc: 'Zmienne środowiskowe'}, {flag: '-d', desc: 'Uruchom w tle (detached)'}, {flag: '--rm', desc: 'Usuń kontener po zatrzymaniu'}], tips: ['docker run -d -p 8000:8000 --env-file .env my-api — z plikiem .env', 'docker logs -f container_id — logi na żywo', 'docker ps — lista działających kontenerów'] }
          },
        ]
      },
      {
        category: 'Narzędzia dev',
        icon: '🔧',
        items: [
          { cmd: 'pip install ruff', desc: 'Szybki linter i formatter Python (zastępuje flake8+black)',
            detail: { what: 'Ruff = ultraszybki linter i formatter Python napisany w Rust. Zastępuje flake8, black, isort w jednym narzędziu. 10-100x szybszy.', how: 'Ruff sprawdza styl, błędy, importy. Może też auto-formatować (ruff format .).', tips: ['ruff check . — sprawdź błędy', 'ruff check . --fix — auto-napraw', 'ruff format . — formatuj (jak black)', 'Dodaj do pyproject.toml: [tool.ruff] line-length = 88'] }
          },
          { cmd: 'pip install mypy', desc: 'Statyczna analiza typów Python',
            detail: { what: 'Mypy sprawdza type hints w kodzie Python — wykrywa błędy typów bez uruchamiania kodu. Jak tsc dla TypeScript.', how: 'mypy main.py — sprawdź jeden plik. mypy . — cały projekt. Czyta type annotations i sprawdza spójność.', tips: ['mypy . — sprawdź całość', 'Dla FastAPI: pip install types-redis types-requests', 'Ignoruj linię: # type: ignore', 'Konfiguracja w pyproject.toml: [tool.mypy]'] }
          },
          { cmd: 'pip install pre-commit', desc: 'Git hooks — auto-check przed commitem',
            detail: { what: 'Pre-commit uruchamia linters i formattery automatycznie przy git commit. Blokuje commit jeśli kod nie przejdzie sprawdzeń.', how: 'Konfigurujesz w .pre-commit-config.yaml. Przy git commit: ruff check, mypy, ruff format — wszystko automatycznie.', tips: ['pre-commit install — zainstaluj hooki w repo', 'pre-commit run --all-files — uruchom ręcznie na całym projekcie', 'Standardowy .pre-commit-config.yaml: ruff + ruff-format'] }
          },
          { cmd: 'curl http://localhost:8000/docs', desc: 'Sprawdź czy API działa',
            detail: { what: 'Szybki test czy serwer FastAPI odpowiada. /docs to Swagger UI — jeśli zwraca HTML to API działa.', how: 'curl to command-line HTTP klient. Domyślnie GET. Wynik wypisany w terminalu.', tips: ['curl http://localhost:8000/ — test root endpoint', 'curl -X POST http://localhost:8000/items -H "Content-Type: application/json" -d \'{"name":"test"}\'', 'curl -s http://localhost:8000/health | python3 -m json.tool — ładny JSON'] }
          },
        ]
      }
    ]
  }
};
