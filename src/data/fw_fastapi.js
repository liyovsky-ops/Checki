import _advanced from './fw_fastapi_advanced.js';
import _ref      from './fw_fastapi_ref.js';
import _komendy  from './fw_fastapi_komendy.js';
export const FW_FASTAPI_DATA = {
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
    ]
,
    ..._advanced,
    ..._ref,
    komendy: _komendy,
  }
};
