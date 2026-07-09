from datetime import date, timedelta
from sqlalchemy.orm import Session
from app.models.week import Week
from app.schemas.history import (
    HistoryResponse, WeekHistory, TaskHistory, AnalysisSummary
)

DAY_LABELS = {
    "monday": "Segunda",
    "tuesday": "Terça",
    "wednesday": "Quarta",
    "thursday": "Quinta",
    "friday": "Sexta",
}


def _build_week_history(week: Week) -> WeekHistory:
    total = len(week.tasks)
    completed = sum(1 for t in week.tasks if t.is_completed)
    rate = round(completed / total * 100, 1) if total > 0 else 0.0

    tasks = [
        TaskHistory(
            id=t.id,
            day_of_week=DAY_LABELS.get(t.day_of_week.value, t.day_of_week.value),
            title=t.title,
            description=t.description,
            is_completed=t.is_completed,
            completed_at=t.completed_at,
            learning_notes=t.learning_notes,
        )
        for t in sorted(week.tasks, key=lambda x: x.day_of_week.value)
    ]

    analysis = None
    if hasattr(week, "analysis") and week.analysis:
        analysis = AnalysisSummary(
            summary=week.analysis.summary,
            generated_at=week.analysis.generated_at,
        )

    return WeekHistory(
        id=week.id,
        start_date=week.start_date,
        end_date=week.end_date,
        created_at=week.created_at,
        total_tasks=total,
        completed_tasks=completed,
        completion_rate=rate,
        tasks=tasks,
        analysis=analysis,
    )


def get_history(
    db: Session,
    start_date: date | None = None,
    end_date: date | None = None,
    preset: str | None = None,
) -> HistoryResponse:
    today = date.today()

    if preset == "last_4":
        start_date = today - timedelta(weeks=4)
    elif preset == "last_month":
        start_date = today.replace(day=1) - timedelta(days=1)
        start_date = start_date.replace(day=1)
    elif preset == "last_3_months":
        start_date = (today.replace(day=1) - timedelta(days=1)).replace(day=1)
        start_date = (start_date.replace(day=1) - timedelta(days=1)).replace(day=1)
        start_date = (start_date.replace(day=1) - timedelta(days=1)).replace(day=1)

    query = db.query(Week).order_by(Week.start_date.desc())

    if start_date:
        query = query.filter(Week.start_date >= start_date)
    if end_date:
        query = query.filter(Week.end_date <= end_date)

    weeks = query.all()
    built = [_build_week_history(w) for w in weeks]

    return HistoryResponse(weeks=built, total=len(built))