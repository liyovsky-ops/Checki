from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from shared.claude_client import ask_gemini

app = FastAPI(title="Checki API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class CodeRequest(BaseModel):
    code: str


@app.get("/")
def root():
    return {"status": "ok", "message": "Checki API is running"}


@app.post("/analyze")
def analyze(body: CodeRequest):
    response = ask_gemini(f"Wyjaśnij krótko co robi ten kod:\n\n{body.code}")
    return {"response": response}
