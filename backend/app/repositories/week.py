from datetime import date, timedelta
from sqlalchemy.orm import Session
from app.models.week import Week


def get_all(db: Session) -> list[Week]:
    return db.query(Week).order_by(Week.start_date.desc()).all()


def get_by_id(db: Session, week_id: int) -> Week | None:
    return db.query(Week).filter(Week.id == week_id).first()


def create(db: Session, start_date: date) -> Week:
    end_date = start_date + timedelta(days=4)  # seg → sex
    week = Week(start_date=start_date, end_date=end_date)
    db.add(week)
    db.commit()
    db.refresh(week)
    return week


def delete(db: Session, week: Week) -> None:
    db.delete(week)
    db.commit()