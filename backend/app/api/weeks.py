from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.week import WeekCreate, WeekResponse
from app.services import week as week_service

router = APIRouter(prefix="/weeks", tags=["weeks"])


@router.get("/", response_model=list[WeekResponse])
def list_weeks(db: Session = Depends(get_db)):
    return week_service.list_weeks(db)


@router.post("/", response_model=WeekResponse, status_code=201)
def create_week(data: WeekCreate, db: Session = Depends(get_db)):
    return week_service.create_week(db, data.start_date)


@router.get("/{week_id}", response_model=WeekResponse)
def get_week(week_id: int, db: Session = Depends(get_db)):
    return week_service.get_week(db, week_id)


@router.delete("/{week_id}", status_code=204)
def delete_week(week_id: int, db: Session = Depends(get_db)):
    week_service.delete_week(db, week_id)


@router.post("/{week_id}/duplicate", response_model=WeekResponse, status_code=201)
def duplicate_week(week_id: int, db: Session = Depends(get_db)):
    return week_service.duplicate_week(db, week_id)