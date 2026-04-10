# Generator API

<div align="left">

[![License](https://img.shields.io/badge/License-MIT-1a1a2e?style=for-the-badge&logoColor=white)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Complete-1a1a2e?style=for-the-badge&logoColor=white)]()
[![Version](https://img.shields.io/badge/Version-1.0.0-1a1a2e?style=for-the-badge&logoColor=white)]()

</div>

A robust and scalable API built with Node.js and TypeScript, focused on delivering high-quality data generation services.

---

## Features

- **CPF Generation**
- **URL Shortener**
- **Password Generator**
- **Date Services**
- **UUID Generation**
- **Sorted Numbers**

---

## Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-1a1a2e?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-1a1a2e?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-1a1a2e?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-1a1a2e?style=for-the-badge&logo=postgresql&logoColor=white)

---

## Project Structure

```text
├── logs/
├── prisma/
├── src/
│   ├── controllers/
│   ├── core/
│   │   ├── generators/
│   │   └── validators/
│   ├── helpers/
│   │   ├── errors/
│   │   ├── interfaces/
│   │   ├── types/
│   │   └── utils/
│   ├── middlewares/
│   ├── routes/
│   ├── conf.ts
│   └── server.ts
├── .env
├── package.json
└── tsconfig.json
```

---

## API Documentation

Swagger UI available after starting the server

---

## Running

**1. Clone the repository**
```bash
git clone https://github.com/Hugolelis/GeneratorAPI.git
cd GeneratorAPI
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure environment variables**
```bash
PORT=3000
HOST=0.0.0.0
DATABASE_URL=""
```

**4. Set up the database**
```bash
DATABASE_URL="postgresql://postgres:<password>@<host>:<port>/<db_name>"
npx prisma migrate dev --name init
```

**5. Start the server**
```bash
npm run dev
```

---

## License

Licensed under the **MIT** License. See [LICENSE](LICENSE) for details.
