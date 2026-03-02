import { FastifyRequest, FastifyReply } from 'fastify';

import { passwordGenerator } from '../core/generators/password';

import { PasswordErrors } from '../helpers/errors/password-erros';
import { Logs } from '../helpers/utils/write_logs';

export class PasswordController 
{
    static generate(req: FastifyRequest, reply: FastifyReply)
    {
        
    }
}