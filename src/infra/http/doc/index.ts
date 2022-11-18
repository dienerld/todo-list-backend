import swagger from 'swagger-ui-express';
import { requestBodies } from './components/requestBodies';
import { responses } from './components/responses';
import { schemas } from './components/schemas';
import { securitySchemes } from './components/security';
import { swaggerHeader } from './header';
import {
  users, userLogin, userWithId,
  tasks, taskWithId, taskSearch
} from './paths';

const swaggerFile: swagger.JsonObject = {
  ...swaggerHeader,
  paths: {
    '/users': users,
    '/users/login': userLogin,
    '/users/{id}': userWithId,
    '/tasks/search': taskSearch,
    '/tasks': tasks,
    '/tasks/{id}': taskWithId
  },

  components: {
    schemas,
    securitySchemes,
    requestBodies,
    responses
  }
};

const swaggerServe = swagger.serve;
const swaggerUi = swagger.setup(swaggerFile, { customSiteTitle: 'API Documentation' });

export { swaggerServe, swaggerUi };
