from datetime import date, datetime
from typing import Optional
from pydantic import BaseModel
from app.schemas.task import TaskResponse


class WeekCreate(BaseModel):
    start_date: date


class WeekResponse(BaseModel):
    id: int
    start_date: date
    end_date: date
    created_at: datetime
    tasks: list[TaskResponse] = []

    model_config = {"from_attributes": True}


class WeekSummary(BaseModel):
    id: int
    start_date: date
    end_date: date
    created_at: datetime
    total_tasks: int
    completed_tasks: int

    model_config = {"from_attributes": True}