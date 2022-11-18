const users = {
  get: {
    tags: ['User'],

    summary: 'Get data of user authenticated',
    description: 'Get data of user authenticated',
    operationId: 'getUser',
    security: [
      {
        bearerAuth: ['read:user']
      }
    ],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UserWithTasks'
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
        description: 'Unauthorized',
        $ref: '#/components/responses/500'
      }
    }
  },
  post: {
    tags: ['User'],
    summary: 'Create  a new user',
    description: 'Create a new user',
    operationId: 'createUser',
    requestBody: {
      $ref: '#/components/requestBodies/User'
    },
    responses: {
      201: {
        description: 'Success',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/User' }
          }
        }
      },
      400: {
        description: 'Bad Request',
        $ref: '#/components/responses/400'
      },
      500: {
        description: 'Internal Server Error',
        $ref: '#/components/responses/500'
      }
    }
  }
};

const userLogin = {
  post: {
    tags: ['User', 'Auth'],
    summary: 'Login user',
    description: 'Login user',
    operationId: 'loginUser',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Login'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string'
                }
              }
            }
          }
        }
      },
      400: {
        description: 'Bad Request',
        $ref: '#/components/responses/400'
      },
      500: {
        description: 'Internal Server Error',
        $ref: '#/components/responses/500'
      }
    }
  }
};

const userWithId = {
  put: {
    tags: ['User'],
    summary: 'Update user authenticated',
    description: 'Update user authenticated',
    operationId: 'updateUser',
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'ID of user to return',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid'
        }
      }
    ],
    security: [
      {
        bearerAuth: ['update:user']
      }
    ],
    requestBody: {
      $ref: '#/components/requestBodies/User'
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User'
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
  delete: {
    tags: ['User'],
    summary: 'Delete user authenticated',
    description: 'Delete user authenticated',
    operationId: 'deleteUser',
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'ID of user to return',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid'
        }
      }
    ],
    security: [
      {
        bearerAuth: ['delete:user']
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

};

export { users, userLogin, userWithId };
