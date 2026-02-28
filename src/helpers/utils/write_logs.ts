import pino, { Level } from 'pino';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Logs 
{
    private static createLogger(filename: string) 
    {
        return pino({
            timestamp: () => `,"time":"${new Date().toISOString()}"`
        },
            pino.destination({
                dest: path.join(__dirname, '..', '..', '..', 'logs', `${filename}.log`),
                mkdir: true,
                sync: false 
            })
        );
    }

    static write(data: object, message: string, type: Level)
    {
        const keys = Object.keys(data);
        const logFilename = keys.length > 0 ? keys[0] : 'default';

        const logger = this.createLogger(logFilename);
        logger[type](data, message);
    }
}