from datetime import datetime, date
from enum import Enum as PyEnum

from sqlalchemy import (
    Integer, String, Text, Boolean,
    DateTime, Date, ForeignKey, Enum, JSON
)

from sqlalchemy.orm import Mapped, mapped_column, relationship, backref

from app.core.database import Base

class DayOfWeek(str, PyEnum):
    MONDAY = "monday"
    TUESDAY = "tuesday"
    WEDNESDAY = "wednesday"
    THURSDAY = "thursday"
    FRIDAY = "friday"


class Week(Base):
    __tablename__ = "weeks"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    start_date: Mapped[date] = mapped_column(Date, nullable=False)
    end_date: Mapped[date] = mapped_column(Date, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    tasks: Mapped[list["Task"]] = relationship(
        "Task", back_populates="week", cascade="all, delete-orphan"
    )


class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    week_id: Mapped[int] = mapped_column(Integer, ForeignKey("weeks.id"), nullable=False)
    day_of_week: Mapped[DayOfWeek] = mapped_column(Enum(DayOfWeek), nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    is_completed: Mapped[bool] = mapped_column(Boolean, default=False)
    completed_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    learning_notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    week: Mapped["Week"] = relationship("Week", back_populates="tasks")


class WeeklyAnalysis(Base):
    __tablename__ = "weekly_analyses"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    week_id: Mapped[int] = mapped_column(Integer, ForeignKey("weeks.id"), unique=True, nullable=False)
    summary: Mapped[str] = mapped_column(Text, nullable=False)
    strengths: Mapped[list] = mapped_column(JSON, nullable=False, default=list)
    weaknesses: Mapped[list] = mapped_column(JSON, nullable=False, default=list)
    suggestions: Mapped[list] = mapped_column(JSON, nullable=False, default=list)
    skills_breakdown: Mapped[dict] = mapped_column(JSON, nullable=False, default=dict)
    next_steps: Mapped[list] = mapped_column(JSON, nullable=False, default=list)
    generated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    week: Mapped["Week"] = relationship("Week", backref=backref("analysis", uselist=False))