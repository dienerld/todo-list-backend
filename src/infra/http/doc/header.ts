
const dev = { url: 'http://localhost:8080', description: 'development' };
const prod = { url: 'https://dnr-todo-api.fly.dev', description: 'Production' };

const server = process.env.NODE_ENV !== 'production' ? dev : prod;
const swaggerHeader = {
  openapi: '3.0.0',
  info: {
    title: 'API Growdev TaskList Dnr',
    version: '1.0',
    description: 'API developed for the Growdev TaskList Dnr project',
    contact: {
      name: 'Diener',
      url: 'https://github.com/dienerld',
      email: 'diener.ld@outlook.com'
    }
  },
  servers: [server],
  tags: [
    {
      name: 'User',
      description: 'Routes for User'
    },
    {
      name: 'Auth',
      description: 'Route for Auth'
    }
  ]
};

export { swaggerHeader };
