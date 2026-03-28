export const generateDateSchemaSwagger = 
{
    schema: {
        tags: ['Date'],
        summary: 'Generate Date',
        description: 'Generates one or more random dates based on the given parameters',
        body: {
        type: 'object',
        properties: {
            start: { type: 'string' },
            end:   { type: 'string' },
            day:   { type: 'number' },
            qtd:   { type: 'number' }
        }
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    date: {
                        oneOf: [
                        { type: 'string' },
                        { type: 'array', items: { type: 'string' } }
                        ]
                    }
                }
            }
        }
    }
}