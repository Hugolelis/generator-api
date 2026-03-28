import { FastifyInstance } from 'fastify';
import { HealthController } from '../controllers/HealthController';

import { healthSchemaSwagger, pingSchemaSwagger } from '../../documentation/health.docs';

export async function healthRoutes(app: FastifyInstance) 
{
  app.get('/health', healthSchemaSwagger, HealthController.health)
  app.get('/ping', pingSchemaSwagger, HealthController.ping)
}