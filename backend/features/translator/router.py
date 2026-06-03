from fastapi import APIRouter
from pydantic import BaseModel
from .service import translate_code

router = APIRouter(prefix="/translator", tags=["translator"])


class CodeRequest(BaseModel):
    code: str


@router.post("/explain")
def explain(body: CodeRequest):
    result = translate_code(body.code)
    return {"response": result}
