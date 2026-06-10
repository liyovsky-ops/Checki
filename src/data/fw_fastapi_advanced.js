// Advanced patterns: routing + state
export default {
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
    ]
};
