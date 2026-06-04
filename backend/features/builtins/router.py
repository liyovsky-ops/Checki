from fastapi import APIRouter
from pydantic import BaseModel
from .service import detect
from .dictionary import get_all_names

router = APIRouter(prefix="/builtins", tags=["builtins"])


class CodeRequest(BaseModel):
    code: str


@router.post("/detect")
def detect_builtins(body: CodeRequest):
    return {"tokens": detect(body.code)}


@router.get("/dictionary")
def get_dictionary():
    return {"names": get_all_names()}
