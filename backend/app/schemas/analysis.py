from datetime import datetime
from pydantic import BaseModel


class AnalysisResponse(BaseModel):
    id: int
    week_id: int
    summary: str
    strengths: list[str]
    weaknesses: list[str]
    suggestions: list[str]
    skills_breakdown: dict[str, float]
    next_steps: list[str]
    generated_at: datetime

    model_config = {"from_attributes": True}