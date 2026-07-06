from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.analysis import AnalysisResponse
from app.services import analysis as analysis_service

router = APIRouter(prefix="/weeks", tags=["insights"])


@router.get("/{week_id}/analysis", response_model=AnalysisResponse)
def get_analysis(week_id: int, db: Session = Depends(get_db)):
    analysis = analysis_service.get_analysis(db, week_id)
    if not analysis:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Análise não gerada ainda")
    return analysis


@router.post("/{week_id}/analysis/generate", response_model=AnalysisResponse)
def generate_analysis(week_id: int, db: Session = Depends(get_db)):
    return analysis_service.generate_week_analysis(db, week_id)