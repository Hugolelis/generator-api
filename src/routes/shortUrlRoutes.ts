import { FastifyInstance } from "fastify";
import { ShortUrlController } from "../controllers/ShortUrlController";

export async function shortUrlRoutes(app: FastifyInstance) 
{
    app.post('/generate', ShortUrlController.generate)
}