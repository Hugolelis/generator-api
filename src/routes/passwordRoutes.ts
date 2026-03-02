import { FastifyInstance } from "fastify";

import { PasswordController } from "../controllers/passwordController";

export async function passwordRoutes(app: FastifyInstance) 
{
    app.post('/generate', PasswordController.generate)
}