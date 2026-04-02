export const generatePasswordSchemaSwagger = {
    schema: {
        tags: ['Password'],
        summary: 'Generate Password',
        description: 'Generates a random password based on the given parameters',
        body: {
        type: 'object',
        required: ['qtdCaractere'],
        properties: {
            qtdCaractere:  { type: 'number' },
            upper:         { type: 'boolean' },
            lower:         { type: 'boolean' },
            number:        { type: 'boolean' },
            specCaractere: { type: 'boolean' }
        }
        },
        response: {
            201: {
                type: 'object',
                    properties: {
                    password: { type: 'string' }
                }
            }
        }
    }
}