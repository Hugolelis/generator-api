import { FastifyRequest, FastifyReply } from 'fastify';

import { uuidGenerator } from '../core/generators/UUID';
import { validatorUUID } from '../core/validators/UUID';

import { uuidErrors } from '../helpers/errors/uuid-errors';
import { writeLogs } from '../helpers/utils/write_logs';

import { _UUID } from "../helpers/types/T-UUID";

export class UUIDController 
{
    static async generate(req: FastifyRequest, reply: FastifyReply) 
    {
        const UUID: _UUID = uuidGenerator();
        uuidErrors.ensureGenerator(UUID);
        writeLogs.uuid({ UUID: UUID }, `UUID gerado com sucesso`)
        return reply.send({ "UUID": UUID });
    }

    static async validate(req: FastifyRequest, reply: FastifyReply) 
    {
        const { UUID } = req.body as { UUID: _UUID };
        uuidErrors.ensureValidator(UUID)
        return reply.send({ "UUID": UUID, "isValid": validatorUUID(UUID) });
    }
}