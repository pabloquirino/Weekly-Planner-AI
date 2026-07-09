# Weekly Planner AI

> Diário de evolução pessoal assistido por IA — planeje sua semana, registre aprendizados e transforme tarefas em insights acionáveis.

![Python](https://img.shields.io/badge/Python-3.12-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?logo=fastapi)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker)

---

## Sobre o projeto

O Weekly Planner AI não é um simples gerenciador de tarefas. É uma ferramenta de evolução pessoal que transforma o que você fez e aprendeu durante a semana em análises inteligentes geradas por IA — com pontos fortes, pontos de atenção, sugestões práticas e um mapa das habilidades que você está desenvolvendo.

### Funcionalidades

- **Planejamento semanal** — organize tarefas de segunda a sexta com título, descrição e dia da semana
- **Execução e aprendizados** — marque tarefas como concluídas e registre o que aprendeu em cada uma
- **Dashboard** — métricas da semana com gráficos de pizza, barras por dia e linha histórica
- **Weekly Insights** — análise semanal gerada pela OpenAI com resumo, pontos fortes, sugestões e breakdown de habilidades
- **Histórico** — navegue por semanas anteriores com filtros de período e visualize tarefas e aprendizados
- **Tema claro e escuro** — alternância com persistência de preferência

---

## Stack

### Backend
- Python 3.12 + FastAPI
- SQLAlchemy 2.0 + Alembic
- PostgreSQL 16
- OpenAI SDK (gpt-4o-mini)
- Pydantic v2

### Frontend
- React 19 + TypeScript + Vite
- Material UI v5
- TanStack Query (React Query)
- Zustand
- React Hook Form
- Recharts

### Infraestrutura
- Docker + Docker Compose
- 3 containers: `backend`, `frontend`, `db`

---

## Pré-requisitos

- [Docker](https://www.docker.com/) e Docker Compose instalados
- Chave de API da [OpenAI](https://platform.openai.com/api-keys)

---

## Instalação e execução

### 1. Clone o repositório

```bash
git clone https://github.com/SEU_USUARIO/weekly-planner.git
cd weekly-planner
```

### 2. Configure as variáveis de ambiente

Copie o arquivo de exemplo e preencha com suas credenciais:

```bash
cp .env.example .env
```

Edite o `.env`:

```env
# Banco de dados
POSTGRES_USER=planner
POSTGRES_PASSWORD=planner123
POSTGRES_DB=weekly_planner
DATABASE_URL=postgresql://planner:planner123@db:5432/weekly_planner

# Segurança
SECRET_KEY=troque-por-uma-chave-segura

# OpenAI (obrigatório para os Insights)
OPENAI_API_KEY=sk-...sua-chave-aqui...
```

### 3. Suba os containers

```bash
docker compose up --build
```

### 4. Aplique as migrations do banco

```bash
docker compose exec backend alembic upgrade head
```

### 5. Acesse a aplicação

| Serviço | URL |
|---|---|
| Frontend | http://localhost:5173 |
| API (Swagger) | http://localhost:8000/docs |
| API (health) | http://localhost:8000/api/v1/health |

---

## Estrutura do projeto

```
weekly-planner/
├── docker-compose.yml
├── .env
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── alembic.ini
│   ├── alembic/
│   └── app/
│       ├── main.py
│       ├── core/          # config e database
│       ├── models/        # SQLAlchemy models
│       ├── schemas/       # Pydantic schemas
│       ├── repositories/  # acesso ao banco
│       ├── services/      # regras de negócio
│       ├── api/           # endpoints FastAPI
│       └── integrations/
│           └── openai/    # integração com IA
└── frontend/
    ├── Dockerfile
    └── src/
        ├── pages/         # telas da aplicação
        ├── components/    # componentes reutilizáveis
        ├── hooks/         # React Query hooks
        ├── services/      # chamadas à API
        ├── store/         # Zustand stores
        └── types/         # TypeScript types
```

---

## Endpoints principais

### Semanas
| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/v1/weeks/` | Lista todas as semanas |
| POST | `/api/v1/weeks/` | Cria nova semana |
| GET | `/api/v1/weeks/{id}` | Detalhe de uma semana |
| DELETE | `/api/v1/weeks/{id}` | Remove uma semana |
| POST | `/api/v1/weeks/{id}/duplicate` | Duplica semana para a próxima |

### Tarefas
| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/api/v1/weeks/{id}/tasks/` | Cria tarefa |
| PATCH | `/api/v1/weeks/{id}/tasks/{tid}` | Edita tarefa |
| POST | `/api/v1/weeks/{id}/tasks/{tid}/complete` | Conclui com aprendizado |
| POST | `/api/v1/weeks/{id}/tasks/{tid}/uncomplete` | Desfaz conclusão |
| POST | `/api/v1/weeks/{id}/tasks/{tid}/duplicate` | Duplica tarefa |
| DELETE | `/api/v1/weeks/{id}/tasks/{tid}` | Remove tarefa |

### Dashboard, Insights e Histórico
| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/v1/dashboard/{week_id}` | Métricas da semana |
| POST | `/api/v1/weeks/{id}/analysis/generate` | Gera análise com IA |
| GET | `/api/v1/weeks/{id}/analysis` | Busca análise gerada |
| GET | `/api/v1/history/` | Histórico com filtros |

A documentação completa e interativa está disponível em `/docs` (Swagger UI).

---

## Variáveis de ambiente

| Variável | Descrição | Obrigatória |
|---|---|---|
| `POSTGRES_USER` | Usuário do PostgreSQL | Sim |
| `POSTGRES_PASSWORD` | Senha do PostgreSQL | Sim |
| `POSTGRES_DB` | Nome do banco | Sim |
| `DATABASE_URL` | URL de conexão completa | Sim |
| `SECRET_KEY` | Chave secreta da aplicação | Sim |
| `OPENAI_API_KEY` | Chave da API da OpenAI | Para Insights |

---

## Comandos úteis

```bash
# Ver logs do backend
docker compose logs backend --tail=50

# Ver logs em tempo real
docker compose logs -f

# Acessar o banco de dados
docker compose exec db psql -U planner -d weekly_planner

# Criar nova migration após alterar models
docker compose exec backend alembic revision --autogenerate -m "descrição"

# Aplicar migrations
docker compose exec backend alembic upgrade head

# Reverter última migration
docker compose exec backend alembic downgrade -1

# Reconstruir containers do zero
docker compose down -v
docker compose up --build
```

---

## Modelo de dados

```
Week
├── id
├── start_date
├── end_date
└── tasks[]
    ├── id
    ├── day_of_week (monday–friday)
    ├── title
    ├── description
    ├── is_completed
    ├── completed_at
    └── learning_notes

WeeklyAnalysis
├── id
├── week_id
├── summary
├── strengths[]
├── weaknesses[]
├── suggestions[]
├── skills_breakdown{}
├── next_steps[]
└── generated_at
```

---

## Licença

MIT — sinta-se livre para usar, modificar e distribuir.
