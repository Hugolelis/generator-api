import pino, { Level } from 'pino';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loggers = new Map<string, pino.Logger>();

export class Logs 
{
    private static getLogger(filename: string) 
    {
        const existing = loggers.get(filename);
        if (existing) return existing;

        const logger = pino({
            timestamp: () => {
            const date = new Date().toLocaleString("pt-BR", {
                timeZone: "America/Sao_Paulo"
            });
            return `,"time":"${date}"`;
        }
        },
            pino.destination({
                dest: path.join(__dirname, '..', '..', '..', 'logs', `${filename}.log`),
                mkdir: true,
                sync: false 
            })
        );

        loggers.set(filename, logger);
        return logger;
    }

    static write(data: object, message: string, type: Level)
    {
        const keys = Object.keys(data);
        const logFilename = keys.length > 0 ? keys[0] : 'default';

        const logger = this.getLogger(logFilename);
        logger[type](data, message);
    }
}