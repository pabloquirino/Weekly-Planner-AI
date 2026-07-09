from datetime import date, datetime
from typing import Optional
from pydantic import BaseModel


class TaskHistory(BaseModel):
    id: int
    day_of_week: str
    title: str
    description: Optional[str]
    is_completed: bool
    completed_at: Optional[datetime]
    learning_notes: Optional[str]

    model_config = {"from_attributes": True}


class AnalysisSummary(BaseModel):
    summary: str
    generated_at: datetime

    model_config = {"from_attributes": True}


class WeekHistory(BaseModel):
    id: int
    start_date: date
    end_date: date
    created_at: datetime
    total_tasks: int
    completed_tasks: int
    completion_rate: float
    tasks: list[TaskHistory] = []
    analysis: Optional[AnalysisSummary] = None

    model_config = {"from_attributes": True}


class HistoryResponse(BaseModel):
    weeks: list[WeekHistory]
    total: int