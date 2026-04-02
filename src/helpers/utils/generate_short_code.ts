import { nanoid } from 'nanoid'

export async function generateShortCode(repository: any )
{
    let shortCode = nanoid(6)

    while(await repository.findUnique({ where: { shortCode } })) 
    shortCode = nanoid(6)
        
    return shortCode
}