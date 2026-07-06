from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.week import DayOfWeek
from app.repositories import analysis as analysis_repo
from app.repositories import week as week_repo
from app.integrations.openai.analyzer import generate_analysis

DAY_LABELS = {
    DayOfWeek.MONDAY: "Segunda",
    DayOfWeek.TUESDAY: "Terça",
    DayOfWeek.WEDNESDAY: "Quarta",
    DayOfWeek.THURSDAY: "Quinta",
    DayOfWeek.FRIDAY: "Sexta",
}


def get_analysis(db: Session, week_id: int):
    return analysis_repo.get_by_week(db, week_id)


def generate_week_analysis(db: Session, week_id: int):
    week = week_repo.get_by_id(db, week_id)
    if not week:
        raise HTTPException(status_code=404, detail="Semana não encontrada")

    if not week.tasks:
        raise HTTPException(
            status_code=400,
            detail="A semana não possui tarefas para analisar"
        )

    completed = [t for t in week.tasks if t.is_completed]
    pending = [t for t in week.tasks if not t.is_completed]
    total = len(week.tasks)
    rate = round(len(completed) / total * 100, 1) if total > 0 else 0.0

    week_data = {
        "start_date": str(week.start_date),
        "end_date": str(week.end_date),
        "total": total,
        "completed": len(completed),
        "pending": len(pending),
        "rate": rate,
        "completed_tasks": [
            {
                "day": DAY_LABELS.get(t.day_of_week, t.day_of_week),
                "title": t.title,
                "learning_notes": t.learning_notes,
            }
            for t in completed
        ],
        "pending_tasks": [
            {
                "day": DAY_LABELS.get(t.day_of_week, t.day_of_week),
                "title": t.title,
            }
            for t in pending
        ],
    }

    result = generate_analysis(week_data)

    return analysis_repo.create_or_update(db, week_id, result)