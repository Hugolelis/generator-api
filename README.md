# Generator API

<div align="left">

[![Status](https://img.shields.io/badge/Status-Active-407a50?style=for-the-badge&labelColor=1a1a1a&logoColor=white)]()
[![Version](https://img.shields.io/badge/Version-1.0.0-0f766e?style=for-the-badge&labelColor=1a1a1a&logoColor=white)]()
[![License](https://img.shields.io/badge/License-MIT-0f766e?style=for-the-badge&labelColor=1a1a1a&logoColor=white)](LICENSE)

</div>

> **Generator API** is a high-performance REST API for generating and validating common data types used in development, testing, and automation workflows. Built with Fastify and TypeScript, it delivers low-latency responses with built-in rate limiting, CORS, and interactive Swagger documentation.

---

<details>
<summary><strong>Table of Contents</strong></summary>

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture & Design Decisions](#architecture--design-decisions)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Rate Limiting](#rate-limiting)
- [Author](#author)
- [License](#license)

</details>

---

## About

Development and QA workflows constantly need throwaway data: a valid CPF, a UUID, a random password that actually meets a policy, a set of dates for a fixture. Generator API centralizes that into a single, fast HTTP service instead of scattering ad-hoc scripts or pulling in multiple one-off npm packages across projects.

It's built on Fastify + TypeScript for low overhead and end-to-end type safety, with Prisma/PostgreSQL backing the one stateful feature (URL shortening) so the rest of the API can stay fully stateless.

---

## Features

| Capability | Description |
|---|---|
| **CPF** | Generate valid Brazilian CPF numbers and validate existing ones |
| **UUID v4** | Generate UUID v4 identifiers and validate existing ones |
| **Password** | Generate secure random passwords (6 to 20 characters) with configurable character sets; one character of each selected set is guaranteed |
| **Sorted Numbers** | Draw unique random numbers within a range, returned in ascending order (up to 20 per request) |
| **Date Services** | Generate unique random dates (`YYYY-MM-DD`) within a range, with optional day-of-week filtering |
| **URL Shortener** | Create, resolve (redirect) and list shortened URLs persisted via PostgreSQL; the same URL always maps to the same short code |
| **Health Check** | `health` and `ping` endpoints to monitor service availability |
| **Rate Limiting** | 40 requests per minute per IP |
| **File Logs** | Every generation is logged with Pino under `logs/`, one file per resource |
| **Interactive Docs** | Built-in Swagger UI at `/docs` |

---

## Tech Stack

- **Runtime:** Node.js 20+
- **Language:** TypeScript 5.9 (executed with `tsx`)
- **Framework:** Fastify 5
- **ORM:** Prisma 6
- **Database:** PostgreSQL
- **Docs:** Swagger UI (`@fastify/swagger`)
- **Logging:** Pino

---

## Architecture & Design Decisions

```
src/
├── conf.ts                 # Application bootstrap (Fastify, CORS, rate limit, Swagger, routes)
├── server.ts               # Entry point with graceful shutdown
├── controllers/            # Request/response handling
│   ├── CPFController.ts
│   ├── DateController.ts
│   ├── HealthController.ts
│   ├── ShortUrlController.ts
│   ├── SortedNumberController.ts
│   ├── UUIDController.ts
│   └── passwordController.ts
├── generators/             # Data generation engines
│   ├── CPF.ts
│   ├── Date.ts
│   ├── ShortUrl.ts
│   ├── SortedNumber.ts
│   ├── UUID.ts
│   └── password.ts
├── validators/             # CPF and UUID validation
│   ├── CPF.ts
│   └── UUID.ts
├── helpers/
│   ├── errors/             # Custom error classes and input checks per resource
│   ├── interfaces/         # TypeScript interfaces
│   ├── types/              # Type definitions
│   └── utils/              # Logs, Prisma connection, short code, date range helpers
├── middlewares/
│   └── error_handler.ts    # Global error handler
├── routes/                 # Route definitions by resource
└── generated/
    └── prisma/             # Prisma client (generated, git-ignored)
prisma/
├── schema.prisma           # Database schema (ShortenedUrl model)
└── migrations/
documentation/              # Swagger schema per resource
swagger.config.ts           # Swagger UI setup
logs/                       # Pino log files (created at runtime, git-ignored)
```

The pipeline follows a clean separation of concerns:

1. **Routes**: register endpoints with their Swagger/validation schemas
2. **Controllers**: extract request data, run the input checks, call generators or validators, send the response
3. **Errors (input checks)**: per-resource classes that reject invalid input with a `400` before it reaches the generators
4. **Generators / Validators**: pure business logic for data generation and validation
5. **Error Handler**: centralized exception handling

**Why this shape:** generators have no knowledge of HTTP, so each one can be unit-tested and reused (e.g. a future CLI) without touching Fastify. Input checks are split from generation so invalid input never reaches business logic. Fastify was chosen over Express for its lower request overhead and native TypeScript-friendly schema validation; Prisma was chosen for type-safe queries against the single stateful resource (short URLs) without hand-writing SQL.

**Known limitations:**
- No authentication/API-key layer yet: the API assumes a trusted network, not public internet exposure as-is.
- Rate limiting is per-IP only; there's no per-client quota or API key tiering.
- The short URL returned by the API is built from the `HOST` and `PORT` variables. With the default `HOST=0.0.0.0` it comes back as `http://0.0.0.0:3000/...`, so set `HOST` to the public hostname (or put a proxy in front) before sharing links.
- Generated values, passwords included, are written in plain text to `logs/`.
- There is no automated test suite yet, and `npm start` runs the same `nodemon` + `tsx` command as `npm run dev`; there is no separate production build.
- Error messages are in Portuguese.

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- A running PostgreSQL instance

### Installation

```bash
# Clone the repository
git clone https://github.com/Hugolelis/generator-api.git
cd generator-api

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
```

### Environment Variables

Edit the `.env` file:

```env
PORT=3000
HOST=0.0.0.0
DATABASE_URL="postgresql://postgres:<password>@localhost:5432/GeneratorAPI"
```

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3000` | Server port |
| `HOST` | `0.0.0.0` | Server host (also used to build the short URLs) |
| `DATABASE_URL` | - | PostgreSQL connection string |

### Database Setup

```bash
# Apply the migrations and generate the Prisma client
npx prisma migrate dev
```

The Prisma client is generated into `src/generated/prisma`, which is git-ignored. If you skip the command above (for example on a fresh deploy), run `npx prisma migrate deploy` and `npx prisma generate` instead.

### Running locally

```bash
npm run dev        # nodemon + tsx, restarts on changes in src/
npm start          # same command as dev (there is no separate production build)
```

Once running, the API is available at `http://localhost:3000` and the interactive documentation at `http://localhost:3000/docs`.

---

## Usage

### Generate a UUID

```bash
curl http://localhost:3000/api/uuid/generate
```
```json
{ "UUID": "550e8400-e29b-41d4-a716-446655440000" }
```

### Validate a UUID

```bash
curl -X POST http://localhost:3000/api/uuid/validate \
  -H "Content-Type: application/json" \
  -d '{"UUID": "550e8400-e29b-41d4-a716-446655440000"}'
```
```json
{ "UUID": "550e8400-e29b-41d4-a716-446655440000", "isValid": true }
```

### Generate a password

```bash
curl -X POST http://localhost:3000/api/password/generate \
  -H "Content-Type: application/json" \
  -d '{"qtdCaractere": 16, "upper": true, "lower": true, "number": true, "specCaractere": true}'
```
```json
{ "password": "aB3#kL9$xR2&pQ7@" }
```

### Generate a CPF

```bash
curl http://localhost:3000/api/cpf/generate
```
```json
{ "CPF": "123.456.789-09" }
```

### Validate a CPF

```bash
curl -X POST http://localhost:3000/api/cpf/validate \
  -H "Content-Type: application/json" \
  -d '{"CPF": "123.456.789-09"}'
```
```json
{ "CPF": "123.456.789-09", "isValid": true }
```

### Draw sorted numbers

```bash
curl -X POST http://localhost:3000/api/sorted-number/generate \
  -H "Content-Type: application/json" \
  -d '{"min": 1, "max": 60, "qtd": 6}'
```
```json
{ "sorted": [4, 11, 23, 38, 47, 59], "qtd": 6 }
```

With `qtd` equal to `1` (the default), `sorted` is a single number instead of an array.

### Generate dates

```bash
curl -X POST http://localhost:3000/api/date/generate \
  -H "Content-Type: application/json" \
  -d '{"start": "2026-01-01", "end": "2026-12-31", "day": 1, "qtd": 3}'
```
```json
{ "date": ["2026-03-09", "2026-07-20", "2026-11-02"] }
```

With `qtd` equal to `1` (the default), `date` is a single string instead of an array.

### Shorten a URL

```bash
curl -X POST http://localhost:3000/api/short-url/generate \
  -H "Content-Type: application/json" \
  -d '{"URL": "https://example.com/long-url"}'
```
```json
{
  "URL": "https://example.com/long-url",
  "shortUrldata": {
    "shortCode": "abc123",
    "shortUrl": "http://localhost:3000/api/short-url/abc123"
  }
}
```

The response is `201` for a new URL and `200` (with the stored data) when the URL was already shortened. Only `http` and `https` URLs are accepted. Opening `shortUrl` redirects to the original URL.

### List all shortened URLs

```bash
curl "http://localhost:3000/api/short-url/all?page=1&limit=10"
```
```json
{
  "URLs": [ { "id": 1, "shortCode": "abc123", "originalUrl": "https://example.com/long-url", "shortUrl": "http://localhost:3000/api/short-url/abc123", "createdAt": "2026-03-11T21:36:11.000Z" } ],
  "pagination": { "total": 1, "page": 1, "limit": 10, "pages": 1 }
}
```

---

## API Reference

### Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/uuid/generate` | Generate UUID |
| `POST` | `/api/uuid/validate` | Validate UUID |
| `GET` | `/api/cpf/generate` | Generate CPF |
| `POST` | `/api/cpf/validate` | Validate CPF |
| `POST` | `/api/password/generate` | Generate password |
| `POST` | `/api/sorted-number/generate` | Generate sorted numbers |
| `POST` | `/api/date/generate` | Generate dates |
| `POST` | `/api/short-url/generate` | Create shortened URL |
| `GET` | `/api/short-url/all` | List all short URLs (paginated) |
| `GET` | `/api/short-url/:shortCode` | Redirect to original URL |
| `GET` | `/api/verify/health` | Health check (`{ message: "healthy", uptime }`) |
| `GET` | `/api/verify/ping` | Ping (`{ message: "pong", timestamp }`) |

### Query / Body Parameters

Parameters of `POST` endpoints go in the JSON body; `short-url/all` takes query parameters.

| Endpoint | Parameter | Type | Default | Description |
|---|---|---|---|---|
| `uuid` `validate` | `UUID` | string | required | UUID to validate |
| `cpf` `validate` | `CPF` | string | required | CPF to validate |
| `sorted-number` | `min` | integer (>= 0) | `1` | Minimum value |
| | `max` | integer (>= 1) | `1` | Maximum value |
| | `qtd` | integer (1-20) | `1` | Quantity of unique numbers (cannot exceed the size of the range) |
| `date` | `start` | string (ISO date) | required | Start of the range |
| | `end` | string (ISO date) | required | End of the range (must be after `start`) |
| | `day` | integer (0-6) | - | Filter by day of week |
| | `qtd` | integer (>= 1) | `1` | Number of unique dates (cannot exceed the dates available in the range) |
| `password` | `qtdCaractere` | integer (6-20) | `6` | Password length |
| | `upper` | boolean | `true` | Include uppercase |
| | `lower` | boolean | `true` | Include lowercase |
| | `number` | boolean | `true` | Include numbers |
| | `specCaractere` | boolean | `true` | Include special chars |
| `short-url` `generate` | `URL` | string | required | `http` or `https` URL to shorten |
| `short-url` `all` | `page` | integer | `1` | Page number |
| | `limit` | integer | `10` | Items per page |

---

## Rate Limiting

The API enforces a global rate limit of **40 requests per minute** per IP. When exceeded, the server responds with:

```json
{
  "statusCode": 429,
  "message": "Muitas requisições. Tente novamente em instantes."
}
```

---

## Author

[Hugolelis](https://github.com/Hugolelis)

---

## License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for more information.
