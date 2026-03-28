import { FastifyInstance } from 'fastify';
import { DateController } from '../controllers/DateController';

import { generateDateSchemaSwagger } from '../../documentation/date.docs';

export async function dateRoutes(app: FastifyInstance) 
{
    app.post('/generate', generateDateSchemaSwagger, DateController.generate)
}