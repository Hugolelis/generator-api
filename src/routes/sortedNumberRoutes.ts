import { FastifyInstance } from 'fastify';
import { SortedNumberController } from "../controllers/SortedNumberController";

import { generateSortedNumberSchemaSwagger } from '../../documentation/sortedNumber.swagger';

export async function sortedNumberRoutes(app: FastifyInstance) 
{
    app.post('/generate', generateSortedNumberSchemaSwagger, SortedNumberController.generate)
}