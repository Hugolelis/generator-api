import { BaseErrors } from "./base-errors";

export class ShortUrlErrors extends BaseErrors
{
    static ensureGenerator(url: string)
    {
        if(!url) this.throwMissing("URL")

        try 
        {
            const parsed = new URL(url);
            if (!['http:', 'https:'].includes(parsed.protocol)) {
                throw new BaseErrors("Apenas URLs com protocolo HTTP ou HTTPS são permitidas.", 400);
            }
        } catch(error) {
            if (error instanceof BaseErrors) throw error
            throw new BaseErrors("URL inválida.", 400);
        }
    }
    
    static ensureRedirect(url: object | null)
    {
        if(!url) this.throwMissing("URL")
    }
}