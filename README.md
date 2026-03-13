# mini-pricelist-app

Simple React + Express pricelist tool with PostgreSQL and JWT authentication.

- Frontend: `FE/`
- Backend: `BE/`

## Local setup

1. Start PostgreSQL

```bash
docker compose up -d postgres
```

2. Bootstrap database

```bash
cd BE
cp .env.example .env
npm install
npm run db:reset
```

Seeded login user:

| Email | Password |
| --- | --- |
| `lettfaktura@gmail.com` | `admin` |

3. Run backend

```bash
npm run dev
```

API endpoints:

- `POST http://localhost:4000/api/auth/login`
- `GET http://localhost:4000/api/auth/me`
- `GET http://localhost:4000/api/translations`
- `GET http://localhost:4000/api/products`
- `PUT http://localhost:4000/api/products/:id`

4. Run frontend

```bash
cd ../FE
cp .env.example .env
npm install
npm run dev
```

App URLs:

- Login: `http://localhost:5173/login`
- Pricelist: `http://localhost:5173/products`

## Stack details

- Node.js: tested with v20+
- Frontend: React 19 + Vite 7
- Backend: Express 5
- DB: PostgreSQL 16
- Auth: JWT (`jsonwebtoken`) + httpOnly cookie
- Styling: Vanilla CSS
- Language: JavaScript (no TypeScript)

## Deployment checklist (Linux VM)

1. Install Docker + Docker Compose on the VM.
2. Clone repository.
3. Configure `BE/.env` and `FE/.env` for VM domains.
4. Run PostgreSQL with docker compose.
5. Run DB bootstrap (`npm run db:reset` in `BE`).
6. Start backend (`npm run start` in `BE`).
7. Build and serve frontend (`npm run build` then `npm run preview` in `FE`) or run behind nginx.
8. Verify login -> pricelist flow and autosave with JWT-protected product endpoints.

## Notes

- Login translations are loaded from PostgreSQL via `/api/translations`.
- Pricelist data is loaded from PostgreSQL and autosaved with `PUT /api/products/:id` on blur.
- Links in header/footer are intentionally dummies, per requirement.

