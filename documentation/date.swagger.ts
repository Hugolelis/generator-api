export const generateDateSchemaSwagger = 
{
    schema: {
        tags: ['Date'],
        summary: 'Generate Date',
        description: 'Generates one or more random dates based on the given parameters',
        body: {
        type: 'object',
        required: ['start', 'end'],
        properties: {
            start: { type: 'string' },
            end:   { type: 'string' },
            day:   { type: 'integer', minimum: 0, maximum: 6 },
            qtd:   { type: 'integer', minimum: 1 }
        }
        },
        response: {
            200: {
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