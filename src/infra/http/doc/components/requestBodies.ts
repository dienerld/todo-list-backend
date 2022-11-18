
const requestBodies = {
  User: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'User name'
            },
            email: {
              type: 'string',
              example: 'mail@mail.com'
            },
            password: {
              type: 'string',
              example: 'password123'
            },
            password_confirm: {
              type: 'string',
              example: 'password123'
            }
          },
          required: ['name', 'email', 'password', 'password_confirm']
        }
      }
    }
  },
  Task: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              example: 'Task name'
            },
            date: {
              type: 'string',
              example: '2021-01-01'
            },
            hour: {
              type: 'string',
              example: '12:00'
            }
          },
          required: ['title', 'date', 'hour']
        }
      }
    }
  },
  UpdateTask: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              example: 'Task name'
            },
            date: {
              type: 'string',
              example: '2021-01-01'
            },
            hour: {
              type: 'string',
              example: '12:00'
            },
            done: {
              type: 'boolean',
              example: true
            },
            hidden: {
              type: 'boolean',
              example: true
            }
          }
        }
      }
    }
  }
};

export { requestBodies };
