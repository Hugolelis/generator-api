export const generatePasswordSchemaSwagger = {
    schema: {
        tags: ['Password'],
        summary: 'Generate Password',
        description: 'Generates a random password based on the given parameters',
        body: {
        type: 'object',
        properties: {
            qtdCaractere:  { type: 'integer', minimum: 6, maximum: 20, default: 6 },
            upper:         { type: 'boolean', default: true },
            lower:         { type: 'boolean', default: true },
            number:        { type: 'boolean', default: true },
            specCaractere: { type: 'boolean', default: true }
        }
        },
        response: {
            200: {
                type: 'object',
                    properties: {
                    password: { type: 'string' }
                }
            }
        }
    }
}