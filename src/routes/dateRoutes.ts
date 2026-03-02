import { FastifyInstance } from 'fastify';
import { DateController } from '../controllers/DateController';

export async function dateRoutes(app: FastifyInstance) 
{
    app.post('/generate', DateController.generate)
}