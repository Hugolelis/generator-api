export const generateShortUrlSchemaSwagger = 
{
    schema: {
        tags: ['ShortUrl'],
        summary: 'Generate Short URL',
        description: 'Generates a shortened URL or returns an existing one',
        body: {
        type: 'object',
        required: ['URL'],
        properties: {
            URL: { type: 'string' }
        }
        },
        response: {
            200: {
                description: 'URL already exists, returning saved short URL',
                type: 'object',
                properties: {
                    URL:          { type: 'string' },
                    shortUrldata: { type: 'object', additionalProperties: true }
                }
            },
            201: {
                description: 'Short URL successfully generated',
                type: 'object',
                properties: {
                    URL:          { type: 'string' },
                    shortUrldata: { type: 'object', additionalProperties: true }
                }
            }
        }
    }
}

export const redirectShortUrlSchemaSwagger = 
{
    schema: {
        tags: ['ShortUrl'],
        summary: 'Redirect Short URL',
        description: 'Redirects to the original URL based on the short code',
        params: {
        type: 'object',
        required: ['shortCode'],
        properties: {
            shortCode: { type: 'string' }
        }
        },
        response: {
            302: {
                description: 'Redirecting to original URL',
                type: 'null'
            }
        }
    }
}

export const allShortUrlsSchemaSwagger = 
{
    schema: {
        tags: ['ShortUrl'],
        summary: 'Get All Short URLs',
        description: 'Returns all shortened URLs stored in the database',
        response: {
            200: {
                type: 'object',
                    properties: {
                    URLs: { type: 'array', items: { type: 'object', additionalProperties: true } },
                    pagination: { type: 'object', additionalProperties: true }
                }
            }
        }
    }
}