# Guia completo: criação, execução e deploy

## 1) Arquitetura do sistema

- **Mobile (React Native + Expo)**
  - UI em telas independentes (`Login`, `Cadastro`, `Home`, `Lição`, `Estatísticas`, `Configurações`).
  - Contexto global de autenticação para token JWT e usuário logado.
  - Cliente HTTP centralizado para chamadas REST.

- **Backend (Node.js + Express)**
  - Camadas: `routes` (HTTP), `services` (regras de negócio), `repositories` (persistência).
  - Módulos de auth, lições, progresso, repetição espaçada, ranking.

- **Banco (PostgreSQL)**
  - Tabelas: `users`, `lessons`, `questions`, `attempts`.
  - Script SQL em `backend/src/db/schema.sql`.
  - Mock SQL em `backend/src/db/mockData.sql`.

- **Autenticação (JWT)**
  - Cadastro/Login retorna token com `sub` do usuário.
  - Middleware valida `Authorization: Bearer <token>`.

- **API**
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `GET /api/lessons/:lessonId/questions`
  - `POST /api/lessons/answer`
  - `GET /api/stats/me`
  - `GET /api/stats/leaderboard`

- **Modelos de dados**
  - `User`: identidade + gamificação (xp, level, streak).
  - `Question`: prompt, opções, alternativa correta, dificuldade.
  - `Attempt`: resposta, acerto/erro, easiness, próximo review, XP ganho.

## 2) Passo a passo de criação do projeto

1. Criar monorepo com pastas `backend` e `mobile`.
2. Backend:
   - `npm init -y`
   - Instalar `express cors dotenv jsonwebtoken bcryptjs pg`
   - Instalar dev deps `jest supertest nodemon`
   - Criar arquitetura por camadas.
3. Mobile:
   - `npx create-expo-app mobile` (ou estrutura manual equivalente)
   - Instalar React Navigation.
4. Configurar variáveis no backend (`.env`).
5. Rodar SQL no PostgreSQL (opcional) para modo persistente.

## 3) Funcionalidades implementadas

- Cadastro e login com email/senha e JWT.
- Lição com perguntas de múltipla escolha.
- Repetição espaçada (SM-2 simplificado).
- Gamificação (XP, nível, streak).
- Dashboard e leaderboard.
- APIs de progresso, lições e ranking.

## 4) Telas mobile

- **Login**: autenticar usuário.
- **Cadastro**: criar conta.
- **Home**: visão resumida de progresso e atalhos.
- **Lição**: pergunta e opções com feedback.
- **Estatísticas**: métricas e ranking.
- **Configurações**: logout.

## 5) Testes

- Unitário: repetição espaçada.
- Integração: fluxo real de API com `supertest`.

## 6) Como rodar localmente

### Backend
```bash
cd backend
cp .env.example .env
npm install
npm test
npm run dev
```

### Mobile
```bash
cd mobile
npm install
npm run start
```

> Para emulador/dispositivo real, troque `localhost` no cliente mobile pelo IP local da máquina que roda o backend.

## 7) Deploy

### Backend (Render/Fly/Heroku-like)
1. Provisionar PostgreSQL gerenciado.
2. Definir `DATABASE_URL`, `JWT_SECRET`, `PORT`.
3. Rodar migração SQL (`schema.sql` + `mockData.sql` opcional).
4. Publicar serviço Node com `npm start`.

### App mobile
- **Expo EAS**:
  1. `npm i -g eas-cli`
  2. `eas login`
  3. `eas build -p android` ou `eas build -p ios`
  4. Publicar OTA com `eas update`.
