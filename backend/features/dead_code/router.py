from fastapi import APIRouter
from pydantic import BaseModel
from .service import detect_dead_code

router = APIRouter(prefix="/dead-code", tags=["dead-code"])


class CodeRequest(BaseModel):
    code: str


@router.post("/detect")
def detect(body: CodeRequest):
    result = detect_dead_code(body.code)
    return {"dead": result}
