from datetime import date
from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.history import HistoryResponse
from app.services import history as history_service

router = APIRouter(prefix="/history", tags=["history"])


@router.get("/", response_model=HistoryResponse)
def get_history(
    preset: Optional[str] = Query(None, description="last_4 | last_month | last_3_months"),
    start_date: Optional[date] = Query(None),
    end_date: Optional[date] = Query(None),
    db: Session = Depends(get_db),
):
    return history_service.get_history(db, start_date, end_date, preset)