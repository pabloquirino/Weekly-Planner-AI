from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.health import router as health_router

app = FastAPI(
    title="Weekly Planner AI",
    description="API do Weekly Planner — diário de evolução pessoal assistido por IA",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix="/api/v1")


@app.get("/", include_in_schema=False)
def root():
    return {"message": "Weekly Planner API — acesse /docs para a documentação"}