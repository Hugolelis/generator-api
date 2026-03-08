import { BaseErrors } from "./base-errors";

export class ShortUrlErrors extends BaseErrors
{
    static ensureGenerator(url: string)
    {
        if(!url) this.throwMissing("URL")

        try 
        {
            new URL(url); 
        } catch (err) 
        {
            throw new BaseErrors("URL inválida.", 400);
        }
    }
}