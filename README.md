# mini-pricelist-app

## Local setup (Day 1)

### 1) Start PostgreSQL

```bash
docker compose up -d
```

### 2) Create schema + seed data

```bash
psql "postgresql://postgres:postgres@localhost:5432/lettfaktura" \\
  -f BE/src/db/schema.sql \\
  -f BE/src/db/seed.sql
```

### 3) Backend

```bash
cd BE
cp .env.example .env
npm install
npm run dev
```

### 4) Frontend

```bash
cd FE
cp .env.example .env
npm install
npm run dev
```
