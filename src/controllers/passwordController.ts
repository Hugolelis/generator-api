import { FastifyRequest, FastifyReply } from 'fastify';

import { passwordGenerator } from '../generators/password';

import { PasswordErrors } from '../helpers/errors/password-errors';
import { Logs } from '../helpers/utils/write_logs';

import { _passwordRequest } from '../helpers/interfaces/I-Password';

export class PasswordController 
{
    // ==============================================
    //  @post: /api/password/generate
    //  @returns: { "password": password }
    //  @status:  201 OK
    // ==============================================
    static generate(req: FastifyRequest, reply: FastifyReply)
    {
        try {
            const { 
                qtdCaractere = 6, upper = true, lower = true, number = true, specCaractere = true
            } = req.body as _passwordRequest

            PasswordErrors.ensureGenerator(qtdCaractere, upper, lower, number, specCaractere)
            const password = passwordGenerator(qtdCaractere, upper, lower, number, specCaractere)
            Logs.write({ password: password }, "Senha gerada com sucesso.", "info")

            reply.code(200).send({ "password": password })
        } catch(error) {
            throw error
        }
    }
}