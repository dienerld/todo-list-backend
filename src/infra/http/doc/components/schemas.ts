const Task = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid'
    },
    title: {
      type: 'string',
      example: 'Task name'
    },
    date: {
      type: 'string',
      example: '2020-10-10'
    },
    hour: {
      type: 'string',
      example: '10:00'
    },
    done: {
      type: 'boolean'
    },
    hidden: {
      type: 'boolean',
      example: false
    }
  }
};

const User = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid'
    },
    name: {
      type: 'string',
      example: 'User name'
    },
    email: {
      type: 'string',
      example: 'email@mail.com'
    },
    password: {
      type: 'string',
      example: 'password123'
    },
    tasks: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/Task'
      }
    }
  }
};

const Login = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      example: 'mail@mail.com'
    },
    password: {
      type: 'string',
      example: 'password123'
    }
  },
  required: ['email', 'password']
};

const schemas = {
  User,
  Task,
  Login

};

export { schemas };
