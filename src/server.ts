import { app } from './conf';
import 'dotenv/config';

import { prisma } from './helpers/utils/prisma_conn';

const PORT: number = Number(process.env.PORT) || 3000
const HOST: string = String(process.env.HOST) || '0.0.0.0'

async function main() 
{
    try {
        await app.listen({ host: HOST, port: PORT })
        app.log.info(`🚀 Server running at http://${HOST}:${PORT}`)
        app.log.info(`📚 Swagger running at http://${HOST}:${PORT}/docs`)
    } catch(e) {
        app.log.error(e)
        process.exit(1)
    }
}

main().catch((e) => {
    console.error('Fatal error during startup:', e)
    process.exit(1)
})

async function gracefulShutdown(signal: string) {
    app.log.info(`Received ${signal}. Shutting down gracefully...`)
    await app.close()
    await prisma.$disconnect()
    process.exit(0)
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
process.on('SIGINT', () => gracefulShutdown('SIGINT'))