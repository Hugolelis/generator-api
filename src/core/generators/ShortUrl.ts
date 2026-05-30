import { generateShortCode } from "../../helpers/utils/generate_short_code"

export async function shortUrlGenerator(repository: any): Promise<{ shortCode: string, shortUrl: string }>
{
    const shortCode = await generateShortCode(repository)
    const host = process.env.HOST || 'localhost'
    const port = process.env.PORT || '3000'

    return { "shortCode": shortCode, "shortUrl": `http://${host}:${port}/api/short-url/${shortCode}` }
}