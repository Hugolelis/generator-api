// src/middlewares/error-handler.ts
import { FastifyError, FastifyRequest, FastifyReply } from 'fastify';
import { BaseErrors } from "../helpers/errors/base-errors";

export function errorHandler(error: FastifyError, req: FastifyRequest, reply: FastifyReply) 
{
    if(error instanceof BaseErrors) return reply.status(error.statusCode).send({ error: error.name, message: error.message });

    // Erro genérico 
    return reply.status(500).send({ error: error.message });
};