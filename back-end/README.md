# Teddy Open Finance Back-End

NestJS API com autenticação JWT, CRUD de clientes, dashboard, health check, métricas Prometheus e logs estruturados em JSON.

## Rodando localmente

1. Copie `.env.example` para `.env` se quiser customizar variáveis.
2. Suba com `docker compose up --build` dentro de [`/home/bruno/Tests/teddy-open-finance/back-end`](/home/bruno/Tests/teddy-open-finance/back-end).

## Endpoints principais

- `POST /auth/register`
- `POST /auth/login`
- `GET /dashboard/summary`
- `GET /clients`
- `GET /clients/:id`
- `GET /healthz`
- `GET /metrics`
- `GET /docs`

## Decisões

- `GET /clients` usa paginação `page` + `pageSize`.
- `GET /clients/:id` incrementa `accessCount` em transação.
- Um usuário admin é semeado na inicialização via variáveis `ADMIN_*`.
