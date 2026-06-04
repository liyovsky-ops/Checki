from fastapi import APIRouter
from pydantic import BaseModel
from .service import detect_bad_patterns

router = APIRouter(prefix="/bad-patterns", tags=["bad-patterns"])


class CodeRequest(BaseModel):
    code: str


@router.post("/detect")
async def detect(body: CodeRequest):
    result = await detect_bad_patterns(body.code)
    return {"issues": result}
