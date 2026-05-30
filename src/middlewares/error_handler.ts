import { FastifyRequest, FastifyReply } from 'fastify';

import { BaseErrors } from "../helpers/errors/base-errors";
import { DatabaseErrors } from '../helpers/errors/database-errors';

export function errorHandler(error: Error, req: FastifyRequest, reply: FastifyReply) 
{
    if(error instanceof BaseErrors) return reply.status(error.statusCode).send({ error: error.name, message: error.message })
    if(error instanceof DatabaseErrors) return reply.status(error.statusCode).send({ error: error.name, message: error.message });


    // Erro genérico 
    const isProduction = process.env.NODE_ENV === 'production';
    return reply.status(500).send({ error: isProduction ? 'Internal Server Error' : error.message });
};