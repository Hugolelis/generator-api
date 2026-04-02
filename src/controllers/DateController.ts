import { FastifyRequest, FastifyReply } from 'fastify';

import { dateGenerator } from '../core/generators/Date';

import { DateErrors } from '../helpers/errors/date-errors';
import { Logs } from '../helpers/utils/write_logs';

import { _dateRequest } from '../helpers/interfaces/I-Date';

export class DateController 
{
    // ==============================================
    //  @post 
    //  @return: { date: date }
    //  @status:  201 OK
    // ==============================================
    static generate(req: FastifyRequest, reply: FastifyReply) 
    {
        const { start, end, day, qtd = 1} = req.body as _dateRequest;
        
        DateErrors.ensureGenerator(start, end, day, qtd)
        const date = dateGenerator(start, end, day, qtd)
        Logs.write({ date: date }, "Data(s) gerada(s) com sucesso.", "info")

        reply.code(201).send({ date: date })
    }
} 