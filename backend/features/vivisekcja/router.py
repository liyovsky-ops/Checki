from fastapi import APIRouter
from pydantic import BaseModel
from .service import vivisect_code

router = APIRouter(prefix="/vivisekcja", tags=["vivisekcja"])


class CodeRequest(BaseModel):
    code: str


@router.post("/analyze")
def analyze(body: CodeRequest):
    result = vivisect_code(body.code)
    return {"markdown": result}
