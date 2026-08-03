import { FastifyRequest, FastifyReply } from 'fastify';

import { uuidGenerator } from '../generators/UUID';
import { uuidValidator } from '../validators/UUID';

import { UuidErrors } from '../helpers/errors/uuid-errors';
import { Logs } from '../helpers/utils/write_logs';

import { _UUID } from "../helpers/types/T-UUID";

export class UUIDController 
{
    // ==============================================
    //  @get: /api/UUID/generate
    //  @returns: { "UUID": UUID }
    //  @status:  201 OK
    // ==============================================
    static async generate(req: FastifyRequest, reply: FastifyReply) 
    {
        try {
            const UUID: _UUID = uuidGenerator();

            UuidErrors.ensureGenerator(UUID);
            Logs.write({ uuid: UUID }, `UUID gerado com sucesso.`, "info")

            return reply.code(200).send({ "UUID": UUID });
        } catch(error) {
            throw error
        }
    }

    // ============================================================
    //  @post: /api/UUID/validate
    //  @returns: { "UUID": UUID, "isValid": uuidValidator(UUID) }
    //  @status:  200 OK
    // ============================================================
    static async validate(req: FastifyRequest, reply: FastifyReply) 
    {
        try {
            const { UUID } = req.body as { UUID: _UUID };

            UuidErrors.ensureValidator(UUID)

            return reply.send({ "UUID": UUID, "isValid": uuidValidator(UUID) });
        } catch(error) {
            throw error
        }
    }
}