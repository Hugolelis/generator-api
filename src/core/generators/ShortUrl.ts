import { generateShortCode } from "../../helpers/utils/generate_short_code"
import dotenv from 'dotenv'

dotenv.config()

const { HOST, PORT } = process.env

export async function shortUrlGenerator(repository: any): Promise<{ shortCode: string, shortUrl: string }>
{
    const shortCode = await generateShortCode(repository)

    return { "shortCode": shortCode, "shortUrl": `http://${HOST}:${PORT}/api/shortUrl/${shortCode}` }
}