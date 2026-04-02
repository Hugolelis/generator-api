import { FastifyInstance } from "fastify";
import { UUIDController } from "../controllers/UUIDController";

import { generateUUIDSchemaSwagger, validateUUIDSchemaSwagger } from "../../documentation/uuid.swagger";

export async function UUIDRoutes(app: FastifyInstance) 
{
    app.get('/generate', generateUUIDSchemaSwagger, UUIDController.generate)
    
    app.post('/validate', validateUUIDSchemaSwagger, UUIDController.validate)
}