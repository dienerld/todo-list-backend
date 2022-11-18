
const responses = {
  400: {
    description: '',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Bad Request'
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
