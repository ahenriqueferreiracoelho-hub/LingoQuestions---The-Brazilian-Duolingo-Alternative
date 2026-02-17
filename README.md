# LingoQuestions

Base completa para um app mobile focado no ensino de inglês com **perguntas estratégicas, active recall, repetição espaçada e gamificação**.

Este repositório contém dois projetos:

- `backend/`: API REST em Node.js + Express + JWT.
- `mobile/`: app React Native com Expo.

## Arquitetura (resumo)

- **Frontend mobile**: React Native (Expo) com navegação por stack e contexto de autenticação.
- **Backend**: Node.js + Express em arquitetura em camadas (routes → services → repositories).
- **Banco**: PostgreSQL (schema SQL incluído) com fallback opcional em memória para desenvolvimento rápido.
- **Autenticação**: JWT (access token) com senha usando bcrypt.
- **API**: endpoints de auth, lições, progresso, estatísticas e leaderboard.
- **Dados**: usuários, perguntas, tentativas, sessões de revisão e progresso gamificado.

> Guia detalhado de setup, execução e deploy em [`docs/SETUP_DEPLOY.md`](docs/SETUP_DEPLOY.md).
