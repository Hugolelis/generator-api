# Generator API

<div align="left">

[![License](https://img.shields.io/badge/License-MIT-1a1a2e?style=for-the-badge&logoColor=white)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-1a1a2e?style=for-the-badge&logo=nodedotjs&logoColor=white)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-1a1a2e?style=for-the-badge&logo=typescript&logoColor=white)]()
[![Fastify](https://img.shields.io/badge/Fastify-5-1a1a2e?style=for-the-badge&logo=fastify&logoColor=white)]()
[![Version](https://img.shields.io/badge/Version-1.0.0-1a1a2e?style=for-the-badge&logoColor=white)]()

</div>

> **Generator API** is a high-performance REST API for generating common data types used in development, testing, and automation workflows. Built with Fastify and TypeScript, it delivers low-latency responses with built-in rate limiting, CORS, and interactive Swagger documentation.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
- [Configuration](#configuration)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [License](#license)

---

## Features

| Capability | Description |
|---|---|
| **CPF Generation** | Generate valid Brazilian CPF numbers (with or without formatting) |
| **UUID v4** | Generate UUID v4 identifiers |
| **Password** | Generate secure random passwords with configurable character sets and length |
| **Sorted Numbers** | Generate unique sorted random numbers within a range |
| **Date Services** | Generate random dates with optional day-of-week filtering |
| **URL Shortener** | Create, resolve, and list shortened URLs persisted via PostgreSQL |
| **Health Check** | Monitor service availability |
| **Interactive Docs** | Built-in Swagger UI at `/docs` |

---

## Installation

```bash
# Clone the repository
git clone https://github.com/Hugolelis/GeneratorAPI.git
cd GeneratorAPI

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
```

### Configuration

Edit the `.env` file:

```env
PORT=3000
HOST=0.0.0.0
DATABASE_URL="postgresql://postgres:<password>@localhost:5432/GeneratorAPI"
```

### Database Setup

```bash
# Run Prisma migrations
npx prisma migrate dev --name init
```

---

## Usage

### Start the server

```bash
npm run dev        # development with hot reload
npm start          # production
```

Once running, the API is available at `http://localhost:3000` and the interactive documentation at `http://localhost:3000/docs`.

### Generate a UUID

```bash
curl http://localhost:3000/api/uuid/generate
```

```json
{ "UUID": "550e8400-e29b-41d4-a716-446655440000" }
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

### List all shortened URLs

```bash
curl "http://localhost:3000/api/short-url/all?page=1&limit=10"
```

---

## Commands

### API Endpoints

| Method | Endpoint | Description | Aliases |
|---|---|---|---|
| `GET` | `/api/uuid/generate` | Generate UUID | — |
| `GET` | `/api/cpf/generate` | Generate CPF | — |
| `POST` | `/api/cpf/validate` | Validate CPF | — |
| `POST` | `/api/password/generate` | Generate password | — |
| `GET` | `/api/sorted-number/generate` | Generate sorted numbers | — |
| `POST` | `/api/date/generate` | Generate dates | — |
| `POST` | `/api/short-url/generate` | Create shortened URL | — |
| `GET` | `/api/short-url/all` | List all short URLs | — |
| `GET` | `/api/short-url/:shortCode` | Redirect to original URL | — |
| `GET` | `/api/verify/health` | Health check | — |
| `GET` | `/api/verify/ping` | Ping | — |

### Query / Body Parameters

| Endpoint | Parameter | Type | Default | Description |
|---|---|---|---|---|
| `sorted-number` | `min` | integer | `1` | Minimum value |
| | `max` | integer | `1` | Maximum value |
| | `qtd` | integer | `1` | Quantity of numbers |
| `date` | `start` | string | — | Start date (ISO) |
| | `end` | string | — | End date (ISO) |
| | `day` | integer (0-6) | — | Filter by day of week |
| | `qtd` | integer | `1` | Number of dates |
| `password` | `qtdCaractere` | integer (6-20) | `6` | Password length |
| | `upper` | boolean | `true` | Include uppercase |
| | `lower` | boolean | `true` | Include lowercase |
| | `number` | boolean | `true` | Include numbers |
| | `specCaractere` | boolean | `true` | Include special chars |
| `cpf` `validate` | `CPF` | string | — | CPF to validate |
| `short-url` `all` | `page` | integer | `1` | Page number |
| | `limit` | integer | `10` | Items per page |

---

## Configuration

### Rate Limiting

The API enforces a global rate limit of **40 requests per minute** per IP. When exceeded, the server responds with:

```json
{
  "statusCode": 429,
  "message": "Muitas requisições. Tente novamente em instantes."
}
```

### Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3000` | Server port |
| `HOST` | `0.0.0.0` | Server host |
| `DATABASE_URL` | — | PostgreSQL connection string |

---

## Architecture

```
src/
├── conf.ts                 # Application bootstrap (Fastify, CORS, rate limit, Swagger)
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
├── validators/             # Input validation
│   ├── CPF.ts
│   └── UUID.ts
├── helpers/
│   ├── errors/             # Custom error classes
│   ├── interfaces/         # TypeScript interfaces
│   ├── types/              # Type definitions
│   └── utils/              # Utilities (logs, Prisma connection, short code)
├── middlewares/
│   └── error_handler.ts    # Global error handler
├── routes/                 # Route definitions by resource
└── generated/
    └── prisma/             # Prisma client (auto-generated)

prisma/
└── schema.prisma           # Database schema (ShortenedUrl model)

documentation/              # Swagger per-route schemas
swagger.config.ts           # Swagger setup
```

The pipeline follows a clean separation of concerns:

1. **Routes** — register endpoints with validation schemas
2. **Controllers** — extract request data, call validators and generators, send response
3. **Generators** — pure business logic for data generation
4. **Validators** — parameter validation before generation
5. **Error Handler** — centralized exception handling

---

## Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -am 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for more information.
