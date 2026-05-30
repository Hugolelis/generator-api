<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white" alt="Fastify" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</p>

<h1 align="center">Generator API</h1>

<p align="center">
  <strong>A high-performance data generation API built with Fastify and TypeScript</strong>
</p>

<p align="center">
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="MIT License" /></a>
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="Version 1.0.0" />
  <img src="https://img.shields.io/badge/node-%3E%3D18-339933?style=flat-square" alt="Node >= 18" />
</p>

---

## 📋 About

Generator API is a production-ready RESTful service that provides endpoints for generating common data types used in development, testing, and automation workflows. Built on **Fastify** — one of the fastest Node.js web frameworks — it delivers high throughput and low latency.

The API includes rate limiting, CORS support, Swagger documentation, and a modular architecture following separation of concerns principles.

---

</div>

| Endpoint | Description |
|----------|-------------|
| **CPF** | Generate valid Brazilian CPF numbers (with or without formatting) |
| **UUID** | Generate UUID v4 identifiers |
| **Password** | Generate secure random passwords with configurable options |
| **Sorted Number** | Generate sorted number sequences within defined ranges |
| **Date** | Generate random dates and date-related utilities |
| **Short URL** | Create and resolve shortened URLs (persisted via PostgreSQL) |
| **Health** | Health check endpoint for monitoring |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [Node.js](https://nodejs.org/) | Runtime environment |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe development |
| [Fastify](https://www.fastify.io/) | HTTP framework (with CORS, rate limiting) |
| [Prisma](https://www.prisma.io/) | ORM & database migrations |
| [PostgreSQL](https://www.postgresql.org/) | Relational database |
| [Swagger](https://swagger.io/) | API documentation |
| [Pino](https://getpino.io/) | Structured logging |

---

## 📂 Project Structure

```
src/
├── controllers/       # Request/response handling
├── core/
│   ├── generators/    # Data generation engines
│   └── validators/    # Input validation logic
├── helpers/
│   ├── errors/        # Custom error classes
│   ├── interfaces/    # TypeScript interfaces
│   ├── types/         # Type definitions
│   └── utils/         # Utility functions
├── middlewares/        # Request interceptors (error handler, etc.)
├── routes/            # Route definitions
├── conf.ts            # Application configuration
└── server.ts          # Entry point

prisma/
└── schema.prisma      # Database schema

documentation/         # Swagger route documentation
swagger.config.ts      # Swagger setup
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [PostgreSQL](https://www.postgresql.org/) installed and running
- npm

### Installation

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
DATABASE_URL="postgresql://postgres:<password>@<host>:<port>/<db_name>"
```

### Database Setup

```bash
# Run Prisma migrations
npx prisma migrate dev --name init
```

### Running

```bash
# Development mode (with hot reload)
npm run dev

# Production mode
npm start
```

---

## 📖 API Documentation

Once the server is running, interactive Swagger documentation is available at:

```
http://{HOST}:{PORT}/docs
```

---

## ⚡ Rate Limiting

The API is protected by a global rate limiter: **40 requests per minute** per IP. Exceeding this limit returns a `429 Too Many Requests` response.

---

## 🧪 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/verify` | Health check |
| `GET` | `/api/UUID` | Generate UUID |
| `GET` | `/api/sortedNumber` | Generate sorted numbers |
| `GET` | `/api/date` | Generate date utilities |
| `GET` | `/api/CPF` | Generate CPF |
| `GET` | `/api/password` | Generate password |
| `POST` | `/api/shortUrl` | Create shortened URL |

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/Hugolelis">Hugolelis</a>
</p>
