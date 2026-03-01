import { FastifyRequest, FastifyReply } from 'fastify';

import { sortedNumberGenerator } from '../core/generators/SortedNumber';

import { SortedNumberErrors } from '../helpers/errors/sortedNumber-errors';
import { Logs } from '../helpers/utils/write_logs';

import { _sortedNumberRequest } from '../helpers/interfaces/I-SortedNumber';

export class SortedNumberController 
{
    static generate(req: FastifyRequest, reply: FastifyReply) 
    {
        const { min=1, max=1, qtd=1} = req.body as _sortedNumberRequest;

        SortedNumberErrors.ensureGenerator(min, max, qtd)
        const sorted = sortedNumberGenerator(min, max, qtd)

        Logs.write({ sortedNumber: sorted }, `número(s) gerado(s) com sucesso.`, "info")

        reply.send({ "sorted": sorted, "qtd": qtd })
    }
}