from pydantic import BaseModel


class DayStats(BaseModel):
    day: str
    total: int
    completed: int


class WeekHistory(BaseModel):
    week_id: int
    start_date: str
    completion_rate: float
    total: int
    completed: int


class DashboardResponse(BaseModel):
    total_tasks: int
    completed_tasks: int
    pending_tasks: int
    completion_rate: float
    by_day: list[DayStats]
    history: list[WeekHistory]