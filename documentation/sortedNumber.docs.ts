export const generateSortedNumberSchemaSwagger = 
{
    schema: {
        tags: ['SortedNumber'],
        summary: 'Generate Sorted Number',
        description: 'Generates one or more unique random numbers within a given range',
        body: {
        type: 'object',
        properties: {
            min: { type: 'number', default: 1  },
            max: { type: 'number', default: 1  },
            qtd: { type: 'number', default: 1  }
        }
        },
        response: {
            201: {
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