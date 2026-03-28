import { app } from './conf';
import 'dotenv/config';

const PORT: number = Number(process.env.PORT)
const HOST: string = String(process.env.HOST)

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

main()