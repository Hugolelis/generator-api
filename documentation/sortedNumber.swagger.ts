export const generateSortedNumberSchemaSwagger = 
{
    schema: {
        tags: ['SortedNumber'],
        summary: 'Generate Sorted Number',
        description: 'Generates one or more unique random numbers within a given range',
        body: {
        type: 'object',
        properties: {
            min: { type: 'integer', minimum: 0, default: 1 },
            max: { type: 'integer', minimum: 1, default: 1 },
            qtd: { type: 'integer', minimum: 1, maximum: 20, default: 1 }
        }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    sorted: {
                        oneOf: [
                        { type: 'number' },
                        { type: 'array', items: { type: 'number' } }
                        ]
                    },
                    qtd: { type: 'number' }
                }
            }
        }
    }
}