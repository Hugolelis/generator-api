import { FastifyInstance } from "fastify";

import { CpfController } from "../controllers/CPFController";

import { generateCpfSchemaSwagger, validateCpfSchemaSwagger } from "../../documentation/cpf.docs";

export async function cpfRoutes(app: FastifyInstance) 
{
    app.get('/generate', generateCpfSchemaSwagger, CpfController.generate)
    
    app.post('/validate', validateCpfSchemaSwagger, CpfController.validate)
}