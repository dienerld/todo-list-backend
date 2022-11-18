const tasks = {
  get: {
    tags: ['Task'],
    summary: 'Get all tasks',
    description: 'Get all tasks',
    operationId: 'getTasks',
    security: [
      {
        bearerAuth: ['read:task']
      }
    ],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Task'
              }
            }
          }
        }
      },
      400: {
        description: 'Bad Request',
        $ref: '#/components/responses/400'
      },
      401: {
        description: 'Unauthorized',
        $ref: '#/components/responses/401'
      },
      500: {
        description: 'Internal Server Error',
        $ref: '#/components/responses/500'
      }
    }
  },
  post: {
    tags: ['Task'],
    summary: 'Create a new task',
    description: 'Create a new task',
    operationId: 'createTask',
    security: [
      {
        bearerAuth: ['create:task']
      }
    ],
    requestBody: {
      $ref: '#/components/requestBodies/Task'
    },
    responses: {
      201: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Task'
            }
          }
        }
      },
      400: {
        description: 'Bad Request',
        $ref: '#/components/responses/400'
      },
      401: {
        description: 'Unauthorized',
        $ref: '#/components/responses/401'
      },
      500: {
        description: 'Internal Server Error',
        $ref: '#/components/responses/500'
      }
    }
  }
};

const taskWithId = {
  put: {
    summary: 'Update task',
    description: 'Update task - when body sent blank, the hidden will be updated',
    operationId: 'updateTask',
    tags: ['Task'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'ID of task to return',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid'
        }
      }
    ],
    security: [
      {
        bearerAuth: ['update:task']
      }
    ],
    requestBody: {
      $ref: '#/components/requestBodies/UpdateTask'
    },
    responses: {
      204: {
        description: 'No Content'
      },
      400: {
        description: 'Bad Request',
        $ref: '#/components/responses/400'
      },
      401: {
        description: 'Unauthorized',
        $ref: '#/components/responses/401'
      },
      500: {
        description: 'Internal Server Error',
        $ref: '#/components/responses/500'
      }
    },
    delete: {
      summary: 'Delete task',
      description: 'Delete task',
      operationId: 'deleteTask',
      tags: ['Task'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID of task to return',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      security: [
        {
          bearerAuth: ['delete:task']
        }
      ],
      responses: {
        204: {
          description: 'Success'
        },
        400: {
          description: 'Bad Request',
          $ref: '#/components/responses/400'
        },
        401: {
          description: 'Unauthorized',
          $ref: '#/components/responses/401'
        },
        500: {
          description: 'Internal Server Error',
          $ref: '#/components/responses/500'
        }
      }
    }
  }
};

const taskSearch = {
  get: {
    summary: 'Search task',
    description: 'Search task',
    operationId: 'searchTask',
    tags: ['Task'],
    parameters: [
      {
        name: 'hidden',
        in: 'query',
        description: 'Search query',
        schema: {
          type: 'string'
        }
      },
      {
        name: 'title',
        in: 'query',
        description: 'Search query',
        schema: {
          type: 'string'
        }
      }
    ],
    security: [
      {
        bearerAuth: ['read:task']
      }
    ],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Task'
              }
            }
          }
        }
      },
      400: {
        description: 'Bad Request',
        $ref: '#/components/responses/400'
      },
      401: {
        description: 'Unauthorized',
        $ref: '#/components/responses/401'
      },
      500: {
        description: 'Internal Server Error',
        $ref: '#/components/responses/500'
      }
    }
  }
};

export { tasks, taskWithId, taskSearch };
