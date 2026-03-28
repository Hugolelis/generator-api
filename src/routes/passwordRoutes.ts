import { FastifyInstance } from "fastify";

import { PasswordController } from "../controllers/passwordController";

import { generatePasswordSchemaSwagger } from "../../documentation/password.docs";

export async function passwordRoutes(app: FastifyInstance) 
{
    app.post('/generate', generatePasswordSchemaSwagger, PasswordController.generate)
}