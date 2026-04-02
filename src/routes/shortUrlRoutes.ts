import { FastifyInstance } from "fastify";
import { ShortUrlController } from "../controllers/ShortUrlController";
import { generateShortUrlSchemaSwagger, redirectShortUrlSchemaSwagger, allShortUrlsSchemaSwagger } from "../../documentation/shortUrl.swagger";

export async function shortUrlRoutes(app: FastifyInstance) 
{
    app.post('/generate', generateShortUrlSchemaSwagger, ShortUrlController.generate)

    app.get('/:shortCode', redirectShortUrlSchemaSwagger, ShortUrlController.redirect)
    app.get('/all', allShortUrlsSchemaSwagger, ShortUrlController.all)
}