import swagger from 'swagger-ui-express';

import swaggerFile from './swagger.json';

const swaggerServe = swagger.serve;
const swaggerUi = swagger.setup(swaggerFile, { customSiteTitle: 'API Documentation' });

export { swaggerServe, swaggerUi };
