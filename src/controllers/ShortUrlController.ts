import { FastifyRequest, FastifyReply } from 'fastify';

import { shortUrlGenerator } from '../core/generators/ShortUrl';

import { ShortUrlErrors } from '../helpers/errors/shortUrl-errors';
import { Logs } from '../helpers/utils/write_logs';

import { prisma } from '../helpers/utils/prisma_conn';

export class ShortUrlController 
{
    // ========================================================
    //  @post 
    //  @return: { "URL": URL, "shortUrldata": shortUrldata }
    //  @status:  201 OK
    // ========================================================
    static async generate(req: FastifyRequest, reply: FastifyReply)
    {
        try 
        {
            const { URL } = req.body as { URL: string }
            ShortUrlErrors.ensureGenerator(URL)

            const existing = await prisma.shortenedUrl.findUnique({ where: { originalUrl: URL } })

            if (existing) {
                Logs.write({ "shortUrldata": existing }, `URL já existente, retornando shortUrl salva.`, "info")
                return reply.code(200).send({ "URL": URL, "shortUrldata": existing })
            }

            const shortUrldata = await shortUrlGenerator(prisma.shortenedUrl)

            await prisma.shortenedUrl.create({
                data: {
                    originalUrl: URL,
                    shortCode: shortUrldata.shortCode,
                    shortUrl: shortUrldata.shortUrl
                }
            })

            Logs.write({ "URL": URL, "shortUrldata": shortUrldata }, `URL encurtada gerada com sucesso.`, "info")

            reply.code(201).send({ "URL": URL, "shortUrldata": shortUrldata })
        } catch(error) {
            throw error
        }
    }

    // ========================================================
    //  @get
    //  @return: reply.redirect(url.originalUrl)
    //  @status:  200 OK
    // ========================================================
    static async redirect(req: FastifyRequest, reply: FastifyReply)
    {
        try
        {
            const { shortCode } = req.params as { shortCode: string }

            const url = (await prisma.shortenedUrl.findUnique({ where: { shortCode } })) as any
            ShortUrlErrors.ensureRedirect(url)

            reply.redirect(url.originalUrl)
        } catch(error) {
            throw error
        }
    }

    // ========================================================
    //  @get
    //  @return: { URLs, 
    //              pagination: {
    //                  total,
    //                  page,
    //                  limit,
    //                  pages: Math.ceil(total / limit)
    //              }
    //            }
    //  @status:  200 OK
    // ========================================================
    static async all(req: FastifyRequest, reply: FastifyReply) 
    {
        try {
            const { page = 1, limit = 10 } = req.query as { page: number, limit: number }

            const skip = (page - 1) * limit

            const [URLs, total] = await Promise.all([
                prisma.shortenedUrl.findMany({ skip, take: limit }),
                prisma.shortenedUrl.count()
            ])

            reply.send({
                URLs,
                pagination: {
                    total,
                    page,
                    limit,
                    pages: Math.ceil(total / limit)
                }
            })
        } catch(error) {
            throw error
        }
    }
}