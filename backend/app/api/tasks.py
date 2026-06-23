from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.task import TaskCreate, TaskUpdate, TaskComplete, TaskResponse
from app.services import task as task_service

router = APIRouter(prefix="/weeks/{week_id}/tasks", tags=["tasks"])


@router.post("/", response_model=TaskResponse, status_code=201)
def create_task(week_id: int, data: TaskCreate, db: Session = Depends(get_db)):
    return task_service.create_task(db, week_id, data)


@router.patch("/{task_id}", response_model=TaskResponse)
def update_task(week_id: int, task_id: int, data: TaskUpdate, db: Session = Depends(get_db)):
    return task_service.update_task(db, task_id, data)


@router.post("/{task_id}/complete", response_model=TaskResponse)
def complete_task(week_id: int, task_id: int, data: TaskComplete, db: Session = Depends(get_db)):
    return task_service.complete_task(db, task_id, data)


@router.post("/{task_id}/uncomplete", response_model=TaskResponse)
def uncomplete_task(week_id: int, task_id: int, db: Session = Depends(get_db)):
    return task_service.uncomplete_task(db, task_id)


@router.post("/{task_id}/duplicate", response_model=TaskResponse, status_code=201)
def duplicate_task(week_id: int, task_id: int, db: Session = Depends(get_db)):
    return task_service.duplicate_task(db, task_id)


@router.delete("/{task_id}", status_code=204)
def delete_task(week_id: int, task_id: int, db: Session = Depends(get_db)):
    task_service.delete_task(db, task_id)