from datetime import date, timedelta
from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.week import Week, Task
from app import repositories as repo


def list_weeks(db: Session):
    return repo.week.get_all(db)


def get_week(db: Session, week_id: int) -> Week:
    week = repo.week.get_by_id(db, week_id)
    if not week:
        raise HTTPException(status_code=404, detail="Semana não encontrada")
    return week


def create_week(db: Session, start_date: date) -> Week:
    return repo.week.create(db, start_date)


def delete_week(db: Session, week_id: int) -> None:
    week = get_week(db, week_id)
    repo.week.delete(db, week)


def duplicate_week(db: Session, week_id: int) -> Week:
    """Cria nova semana (próxima) copiando todas as tarefas."""
    original = get_week(db, week_id)
    new_start = original.start_date + timedelta(weeks=1)
    new_week = repo.week.create(db, new_start)

    for task in original.tasks:
        repo.task.create(db, new_week.id, task.day_of_week, task.title, task.description)

    return repo.week.get_by_id(db, new_week.id)