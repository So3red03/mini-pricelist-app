# mini-pricelist-app

Simple React + Express pricelist tool with a PostgreSQL backend and JWT authentication. Frontend lives under `FE/`, backend under `BE/`.

## Local setup

1. **Start PostgreSQL**

   ```bash
   docker compose up -d postgres
   ```

2. **Bootstrap database**

   ```bash
   cd BE
   cp .env.example .env
   npm install
   npm run db:reset
   ```

   The seed inserts one admin user:

   | Email | Password |
   | --- | --- |
   | `admin@lettfaktura.local` | `lettfaktura123` |

3. **Run backend**

   ```bash
   npm run dev
   ```

   Useful endpoints while wiring the login screen:

   - `POST http://localhost:4000/api/auth/login`
   - `GET http://localhost:4000/api/auth/me`
   - `GET http://localhost:4000/api/translations`

4. **Run frontend**

   ```bash
   cd ../FE
   cp .env.example .env
   npm install
   npm run dev
   ```

   The login page lives at `http://localhost:5173/login`. It fetches translations from the backend and posts credentials to `/api/auth/login`.
