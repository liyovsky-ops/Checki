// Ecosystem: rywale + pluginy
export default {
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
    ]
};
