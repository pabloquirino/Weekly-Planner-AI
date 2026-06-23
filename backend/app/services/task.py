from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.week import Task
from app.schemas.task import TaskCreate, TaskUpdate, TaskComplete
from app import repositories as repo


def _get_task_or_404(db: Session, task_id: int) -> Task:
    task = repo.task.get_by_id(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    return task


def create_task(db: Session, week_id: int, data: TaskCreate) -> Task:
    # valida se a semana existe
    week = repo.week.get_by_id(db, week_id)
    if not week:
        raise HTTPException(status_code=404, detail="Semana não encontrada")
    return repo.task.create(db, week_id, data.day_of_week, data.title, data.description)


def update_task(db: Session, task_id: int, data: TaskUpdate) -> Task:
    task = _get_task_or_404(db, task_id)
    updates = data.model_dump(exclude_unset=True)
    return repo.task.update(db, task, updates)


def complete_task(db: Session, task_id: int, data: TaskComplete) -> Task:
    task = _get_task_or_404(db, task_id)
    return repo.task.complete(db, task, data.learning_notes)


def uncomplete_task(db: Session, task_id: int) -> Task:
    task = _get_task_or_404(db, task_id)
    return repo.task.uncomplete(db, task)


def duplicate_task(db: Session, task_id: int) -> Task:
    task = _get_task_or_404(db, task_id)
    return repo.task.duplicate(db, task)


def delete_task(db: Session, task_id: int) -> None:
    task = _get_task_or_404(db, task_id)
    repo.task.delete(db, task)