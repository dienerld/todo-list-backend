/* eslint-disable import/first */
if (process.env.NODE_ENV === 'production') {
  require('module-alias/register');
}

import 'dotenv/config';
import { app } from './app';
import { swaggerServe, swaggerUi } from './doc';

app.use('/api-docs', swaggerServe, swaggerUi);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
