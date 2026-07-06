from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.dashboard import DashboardResponse
from app.services import dashboard as dashboard_service

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/{week_id}", response_model=DashboardResponse)
def get_dashboard(week_id: int, db: Session = Depends(get_db)):
    return dashboard_service.get_dashboard(db, week_id)