from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from app.models.week import DayOfWeek


class TaskCreate(BaseModel):
    day_of_week: DayOfWeek
    title: str
    description: Optional[str] = None


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    day_of_week: Optional[DayOfWeek] = None
    learning_notes: Optional[str] = None


class TaskComplete(BaseModel):
    learning_notes: Optional[str] = None


class TaskResponse(BaseModel):
    id: int
    week_id: int
    day_of_week: DayOfWeek
    title: str
    description: Optional[str]
    is_completed: bool
    completed_at: Optional[datetime]
    learning_notes: Optional[str]
    created_at: datetime

    model_config = {"from_attributes": True}