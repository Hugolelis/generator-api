import { FastifyRequest, FastifyReply } from 'fastify';

import { shortUrlGenerator } from '../core/generators/ShortUrl';
import { redirectUrl } from '../helpers/utils/redirect_url';

import { ShortUrlErrors } from '../helpers/errors/shortUrl-errors';
import { DatabaseErrors } from '../helpers/errors/database-errors';
import { Logs } from '../helpers/utils/write_logs';


import { GenericQueries } from '../repository/generics';
import { prisma } from '../helpers/utils/prisma_conn';
const urlRepository = new GenericQueries(prisma.shortenedUrl);

export class ShortUrlController 
{
    static async generate(req: FastifyRequest, reply: FastifyReply)
    {
        const { URL } = req.body as { URL: string }
        ShortUrlErrors.ensureGenerator(URL)

        const shortUrldata = await shortUrlGenerator(urlRepository)
        Logs.write({ "URL": URL, "shortUrldata": shortUrldata }, `URL encurtada gerada com sucesso.`, "info")

        reply.code(201).send({ "URL": URL, "shortUrldata": shortUrldata })
    }

    static redirect(req: FastifyRequest, reply: FastifyReply)
    {

    }

    static async all(req: FastifyRequest, reply: FastifyReply)
    {
        const URLs = await urlRepository.findMany()

        reply.send({ "URLs": URLs })
    }
}