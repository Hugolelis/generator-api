export const generateCpfSchemaSwagger = 
{
    schema: {
        tags: ['CPF'],
        summary: 'Generate CPF',
        description: 'Generates a random valid CPF',
        response: {
            201: {
                type: 'object',
                    properties: {
                    CPF: { type: 'string' }
                }
            }
        }
    }
}

export const validateCpfSchemaSwagger = 
{
    schema: {
        tags: ['CPF'],
        summary: 'Validate CPF',
        description: 'Validates whether a given CPF is valid',
        body: {
        type: 'object',
        required: ['CPF'],
        properties: {
            CPF: { type: 'string' }
        }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    CPF:     { type: 'string' },
                    isValid: { type: 'boolean' }
                }
            }
        }
    }
}