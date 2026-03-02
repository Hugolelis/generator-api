import { FastifyInstance } from 'fastify';
import { SortedNumberController } from "../controllers/SortedNumberController";

export async function sortedNumberRoutes(app: FastifyInstance) 
{
    app.post('/generate', SortedNumberController.generate)
}