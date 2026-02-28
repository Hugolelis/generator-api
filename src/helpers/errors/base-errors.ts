export class BaseErrors extends Error 
{
    public statusCode: number;

    public constructor(message: string, statusCode: number) 
    {
        super(message);
        this.name = 'Errors';
        this.statusCode = statusCode;
    }

    static throwGenerationFailed(generator: any)
    {
        throw new BaseErrors(`Falha interna ao gerar ${generator}.`, 404);
    }
    
    static throwMissing(field: string) 
    {
        throw new BaseErrors(`O campo ${field} é obrigatório e não foi fornecido.`, 400);
    }
}