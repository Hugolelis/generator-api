import { FastifyRequest, FastifyReply } from 'fastify';

import { passwordGenerator } from '../core/generators/password';

import { PasswordErrors } from '../helpers/errors/password-erros';
import { Logs } from '../helpers/utils/write_logs';

import { _passwordRequest } from '../helpers/interfaces/I-Password';

export class PasswordController 
{
    static generate(req: FastifyRequest, reply: FastifyReply)
    {
        
    }
}