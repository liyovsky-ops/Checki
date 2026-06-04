from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from features.translator.router import router as translator_router
from features.line_tooltip.router import router as line_tooltip_router
from features.builtins.router import router as builtins_router
from features.programming_mode.router import router as programming_mode_router
from features.vivisekcja.router import router as vivisekcja_router
from features.dead_code.router import router as dead_code_router
from features.bad_patterns.router import router as bad_patterns_router

app = FastAPI(title="Checki API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(translator_router)
app.include_router(line_tooltip_router)
app.include_router(builtins_router)
app.include_router(programming_mode_router)
app.include_router(vivisekcja_router)
app.include_router(dead_code_router)
app.include_router(bad_patterns_router)


@app.get("/")
def root():
    return {"status": "ok", "message": "Checki API is running"}


@app.get("/test")
def test_ui():
    return FileResponse("test_ui.html")
