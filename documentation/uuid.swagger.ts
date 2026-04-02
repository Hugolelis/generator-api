export const generateUUIDSchemaSwagger = 
{
    schema: {
        tags: ['UUID'],
        summary: 'Generate UUID',
        description: 'Generates a random UUID',
        response: {
            201: {
                type: 'object',
                properties: {
                UUID: { type: 'string' }
                }
            }
        }
    }
}

export const validateUUIDSchemaSwagger = 
{
    schema: {
        tags: ['UUID'],
        summary: 'Validate UUID',
        description: 'Validates whether a given UUID is valid',
        body: {
        type: 'object',
        required: ['UUID'],
        properties: {
            UUID: { type: 'string' }
        }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    UUID:    { type: 'string' },
                    isValid: { type: 'boolean' }
                }
            }
        }
    }
}