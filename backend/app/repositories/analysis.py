from sqlalchemy.orm import Session
from app.models.week import WeeklyAnalysis


def get_by_week(db: Session, week_id: int) -> WeeklyAnalysis | None:
    return db.query(WeeklyAnalysis).filter(WeeklyAnalysis.week_id == week_id).first()


def create_or_update(db: Session, week_id: int, data: dict) -> WeeklyAnalysis:
    analysis = get_by_week(db, week_id)

    if analysis:
        for key, value in data.items():
            setattr(analysis, key, value)
    else:
        analysis = WeeklyAnalysis(week_id=week_id, **data)
        db.add(analysis)

    db.commit()
    db.refresh(analysis)
    return analysis