import fastify, { FastifyInstance }  from "fastify";
import cors from "@fastify/cors";

export const app: FastifyInstance = fastify({ 
    logger: {
        transport: {
            target: 'pino-pretty'
        }
    }
})

import { errorHandler } from "./middlewares/error_handler";
app.setErrorHandler(errorHandler)

await app.register(cors)

import { healthRoutes } from './routes/healthRoutes';
app.register(healthRoutes, { prefix: 'api/verify' })

import { UUIDRoutes } from "./routes/uuidRoutes";
app.register(UUIDRoutes, { prefix: 'api/UUID' })

import { sortedNumberRoutes } from "./routes/sortedNumberRoutes";
app.register(sortedNumberRoutes, { prefix: 'api/sortedNumber/'})

import { dateRoutes } from "./routes/dateRoutes";
app.register(dateRoutes, { prefix: 'api/date/' })

import { cpfRoutes } from "./routes/cpfRoutes";
app.register(cpfRoutes, { prefix: 'api/CPF/' })

import { passwordRoutes } from "./routes/passwordRoutes";
app.register(passwordRoutes, { prefix: 'api/password/' })