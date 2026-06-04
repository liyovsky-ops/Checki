from fastapi import APIRouter
from pydantic import BaseModel
from .service import translate_code, translate_lines

router = APIRouter(prefix="/translator", tags=["translator"])


class CodeRequest(BaseModel):
    code: str


@router.post("/explain")
def explain(body: CodeRequest):
    result = translate_code(body.code)
    return {"response": result}


@router.post("/explain-lines")
def explain_lines(body: CodeRequest):
    result = translate_lines(body.code)
    return {"lines": result}
