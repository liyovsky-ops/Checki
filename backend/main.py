from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from features.translator.router import router as translator_router
from features.line_tooltip.router import router as line_tooltip_router
from features.builtins.router import router as builtins_router

app = FastAPI(title="Checki API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(translator_router)
app.include_router(line_tooltip_router)
app.include_router(builtins_router)


@app.get("/")
def root():
    return {"status": "ok", "message": "Checki API is running"}


@app.get("/test")
def test_ui():
    return FileResponse("test_ui.html")
