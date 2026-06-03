from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from features.translator.router import router as translator_router

app = FastAPI(title="Checki API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(translator_router)


@app.get("/")
def root():
    return {"status": "ok", "message": "Checki API is running"}


@app.get("/test")
def test_ui():
    return FileResponse("test_ui.html")
