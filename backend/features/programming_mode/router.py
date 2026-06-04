from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from features.programming_mode.service import rewrite_code, MODE_PROMPTS

router = APIRouter(prefix="/programming-mode")


class RewriteRequest(BaseModel):
    code: str
    mode: str


class RewriteResponse(BaseModel):
    rewritten_code: str
    mode: str


@router.post("/rewrite", response_model=RewriteResponse)
def rewrite(req: RewriteRequest):
    if not req.code.strip():
        raise HTTPException(status_code=422, detail="Kod nie może być pusty.")
    if req.mode not in MODE_PROMPTS:
        raise HTTPException(status_code=422, detail=f"Nieznany tryb: {req.mode}")
    result = rewrite_code(req.code, req.mode)
    return RewriteResponse(rewritten_code=result, mode=req.mode)
