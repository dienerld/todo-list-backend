
const responses = {
  400: {
    description: '',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            error: {
              type: 'string'
            },
            message: {
              type: 'string'
            }
          }
        }
      }
    }
  },
  401: {
    description: '',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              example: 'UnauthorizedError'
            },
            message: {
              type: 'string',
              example: 'Unauthorized'
            }
          }
        }
      }
    }
  },
  500: {
    description: '',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              example: 'ServerError'
            },
            message: {
              type: 'string',
              example: 'Internal Server Error'
            }
          }
        }
      }
    }
  }
};

export { responses };
