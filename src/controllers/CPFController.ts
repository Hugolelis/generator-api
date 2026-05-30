import { FastifyRequest, FastifyReply } from 'fastify';

import { cpfGenerator } from '../core/generators/CPF';
import { cpfValidator } from '../core/validators/CPF';

import { CpfErrors } from '../helpers/errors/cpf-errors';
import { Logs } from '../helpers/utils/write_logs';

export class CpfController 
{
    // ==============================================
    //  @get: /api/CPF/generate
    //  @returns: { "CPF": CPF }
    //  @status:  201 OK
    // ==============================================
    static generate(req: FastifyRequest, reply: FastifyReply)
    {
        try {
            const CPF: string = cpfGenerator()

            CpfErrors.ensureGenerator(CPF)
            Logs.write({ cpf: CPF }, "CPF gerado com sucesso.", "info")
            
            reply.code(200).send({ "CPF": CPF })
        } catch(error) {
            throw error
        }
    }

    // =======================================================
    //  @post: /api/CPF/validate
    //  @returns: { "CPF": CPF,  isValid: cpfValidator(CPF) }
    //  @status:  200 OK
    // =======================================================
    static validate(req: FastifyRequest, reply: FastifyReply)
    {
        try {
            const { CPF } = req.body as { CPF: string }
            
            CpfErrors.ensureValidator(CPF)

            reply.send({ "CPF": CPF,  isValid: cpfValidator(CPF)})
        } catch(error) {
            throw error
        }
    }
}