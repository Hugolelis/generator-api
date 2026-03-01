import { FastifyRequest, FastifyReply } from 'fastify';

import { generateDate } from '../core/generators/Date';

import { DateErrors } from '../helpers/errors/date-erros';
import { Logs } from '../helpers/utils/write_logs';

import { _dateRequest } from '../helpers/interfaces/I-Date';

export class DateController 
{
    static generate(req: FastifyRequest, reply: FastifyReply) 
    {
        const { start, end, day, qtd = 1} = req.body as _dateRequest;
        
        DateErrors.ensureGenerator(start, end, day, qtd)
        const date = generateDate(start, end, day, qtd)

        Logs.write({date: date}, "Data(s) gerada(s) com sucesso.", "info")

        reply.send({ date: date})
    }
} 