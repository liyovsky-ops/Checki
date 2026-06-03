from fastapi import APIRouter
from pydantic import BaseModel
from .service import analyze_code, lookup_line

router = APIRouter(prefix="/line-tooltip", tags=["line-tooltip"])


class CodeRequest(BaseModel):
    code: str


class LookupRequest(BaseModel):
    blocks: list
    line_number: int


@router.post("/analyze")
def analyze(body: CodeRequest):
    return analyze_code(body.code)


@router.post("/lookup")
def lookup(body: LookupRequest):
    return lookup_line(body.blocks, body.line_number)
