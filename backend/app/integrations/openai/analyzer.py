import json
from openai import OpenAI
from app.core.config import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY)

SYSTEM_PROMPT = """
Você é um coach de produtividade pessoal e aprendizado contínuo.
Analise a semana de trabalho do usuário e retorne APENAS um JSON válido,
sem markdown, sem texto adicional, com exatamente esta estrutura:

{
  "summary": "resumo geral em 2-3 frases",
  "strengths": ["ponto forte 1", "ponto forte 2", "ponto forte 3"],
  "weaknesses": ["ponto de atenção 1", "ponto de atenção 2"],
  "suggestions": ["sugestão 1", "sugestão 2", "sugestão 3"],
  "skills_breakdown": {
    "Área identificada": 45.0,
    "Outra área": 30.0
  },
  "next_steps": ["próximo passo 1", "próximo passo 2", "próximo passo 3"]
}

Regras:
- skills_breakdown deve somar 100
- identifique as áreas a partir dos títulos e aprendizados das tarefas
- seja específico e prático nas sugestões
- next_steps devem ser acionáveis para a próxima semana
- responda em português brasileiro
"""


def build_context(week_data: dict) -> str:
    lines = [
        f"Semana: {week_data['start_date']} a {week_data['end_date']}",
        f"Total de tarefas: {week_data['total']}",
        f"Tarefas concluídas: {week_data['completed']} ({week_data['rate']}%)",
        f"Tarefas não concluídas: {week_data['pending']}",
        "",
        "=== TAREFAS CONCLUÍDAS ===",
    ]

    for task in week_data["completed_tasks"]:
        lines.append(f"- [{task['day']}] {task['title']}")
        if task.get("learning_notes"):
            lines.append(f"  Aprendizados: {task['learning_notes']}")

    if week_data["pending_tasks"]:
        lines.append("")
        lines.append("=== TAREFAS NÃO CONCLUÍDAS ===")
        for task in week_data["pending_tasks"]:
            lines.append(f"- [{task['day']}] {task['title']}")

    return "\n".join(lines)


def generate_analysis(week_data: dict) -> dict:
    context = build_context(week_data)

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": context},
        ],
        temperature=0.7,
        max_tokens=1500,
    )

    raw = response.choices[0].message.content.strip()

    # remove possíveis blocos markdown se o modelo ignorar a instrução
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]

    return json.loads(raw)