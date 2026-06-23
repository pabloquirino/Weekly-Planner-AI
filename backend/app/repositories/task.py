from datetime import datetime
from sqlalchemy.orm import Session
from app.models.week import Task, DayOfWeek


def get_by_week(db: Session, week_id: int) -> list[Task]:
    return db.query(Task).filter(Task.week_id == week_id).all()


def get_by_id(db: Session, task_id: int) -> Task | None:
    return db.query(Task).filter(Task.id == task_id).first()


def create(db: Session, week_id: int, day: DayOfWeek, title: str, description: str | None) -> Task:
    task = Task(week_id=week_id, day_of_week=day, title=title, description=description)
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


def update(db: Session, task: Task, data: dict) -> Task:
    for key, value in data.items():
        setattr(task, key, value)
    db.commit()
    db.refresh(task)
    return task


def complete(db: Session, task: Task, learning_notes: str | None) -> Task:
    task.is_completed = True
    task.completed_at = datetime.utcnow()
    if learning_notes is not None:
        task.learning_notes = learning_notes
    db.commit()
    db.refresh(task)
    return task


def uncomplete(db: Session, task: Task) -> Task:
    task.is_completed = False
    task.completed_at = None
    db.commit()
    db.refresh(task)
    return task


def duplicate(db: Session, task: Task) -> Task:
    new_task = Task(
        week_id=task.week_id,
        day_of_week=task.day_of_week,
        title=task.title,
        description=task.description,
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task


def delete(db: Session, task: Task) -> None:
    db.delete(task)
    db.commit()