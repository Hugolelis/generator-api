import { FastifyRequest, FastifyReply } from 'fastify';

export class HealthController 
{
    // ============================================================
    //  @get 
    //  @return: { message: 'healthy', uptime: process.uptime() }
    //  @status:  200 OK
    // ============================================================
    static async health(req: FastifyRequest, reply: FastifyReply) 
    {
        return reply.send({ message: 'healthy', uptime: process.uptime() });
    }

    // ============================================================
    //  @get 
    //  @return: { message: 'healthy', uptime: process.uptime() }
    //  @status:  200 OK
    // ============================================================
    static async ping(req: FastifyRequest, reply: FastifyReply) 
    {
        return reply.send({ message: 'pong', timestamp: new Date() });
    }
}