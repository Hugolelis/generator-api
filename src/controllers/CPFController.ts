import { FastifyRequest, FastifyReply } from 'fastify';

import { cpfGenerator } from '../core/generators/CPF';

import { CpfErrors } from '../helpers/errors/cpf-errors';
import { Logs } from '../helpers/utils/write_logs';

export class CpfController 
{
    static generate(req: FastifyRequest, reply: FastifyReply)
    {
        const CPF: string = cpfGenerator()

        CpfErrors.ensureGenerator(CPF)
        Logs.write({cpf: CPF}, "CPF gerado com sucesso.", "info")
        
        reply.send({ "CPF": CPF })
    }

    static validate(req: FastifyRequest, reply: FastifyReply)
    {
        
    }
}