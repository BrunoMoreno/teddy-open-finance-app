# Teddy Open Finance Front-End

React + Vite + TypeScript com autenticação JWT, dashboard, gerenciamento de clientes, modais acessíveis e seleção local via Zustand.

## Rodando localmente

1. Ajuste variáveis em `.env.example` se necessário.
2. Rode `docker compose up --build` dentro de [`/home/bruno/Tests/teddy-open-finance/front-end`](/home/bruno/Tests/teddy-open-finance/front-end).

## Rotas

- `/login`
- `/dashboard`
- `/clients`
- `/clients/:id`
- `/clients/selected`

## Destaques

- Grid responsivo 4/2/1 colunas.
- Valores monetários em `pt-BR`.
- Seleção de clientes em estado global não persistido no back-end.
