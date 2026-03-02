import { FastifyInstance } from "fastify";

import { CpfController } from "../controllers/CPFController";

export async function cpfRoutes(app: FastifyInstance) {
    app.get('/generate', CpfController.generate)
    
    app.post('/validate', CpfController.validate)
}