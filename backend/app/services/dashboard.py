from sqlalchemy.orm import Session
from app.models.week import Week, Task, DayOfWeek
from app.schemas.dashboard import DashboardResponse, DayStats, WeekHistory

DAY_LABELS = {
    DayOfWeek.MONDAY: "Segunda",
    DayOfWeek.TUESDAY: "Terça",
    DayOfWeek.WEDNESDAY: "Quarta",
    DayOfWeek.THURSDAY: "Quinta",
    DayOfWeek.FRIDAY: "Sexta",
}

def get_dashboard(db: Session, week_id: int) -> DashboardResponse:
    week = db.query(Week).filter(Week.id == week_id).first()
    tasks = week.tasks if week else []

    total = len(tasks)
    completed = sum(1 for t in tasks if t.is_completed)
    pending = total - completed
    rate = round((completed / total * 100), 1) if total > 0 else 0.0

    by_day = [
        DayStats(
            day=DAY_LABELS[day],
            total=sum(1 for t in tasks if t.day_of_week == day),
            completed=sum(1 for t in tasks if t.day_of_week == day and t.is_completed),
        )
        for day in DayOfWeek
    ]

    # histórico das últimas 10 semanas
    weeks = db.query(Week).order_by(Week.start_date.asc()).limit(10).all()
    history = []
    for w in weeks:
        t = len(w.tasks)
        c = sum(1 for task in w.tasks if task.is_completed)
        history.append(WeekHistory(
            week_id=w.id,
            start_date=str(w.start_date),
            completion_rate=round((c / t * 100), 1) if t > 0 else 0.0,
            total=t,
            completed=c,
        ))

    return DashboardResponse(
        total_tasks=total,
        completed_tasks=completed,
        pending_tasks=pending,
        completion_rate=rate,
        by_day=by_day,
        history=history,
    )