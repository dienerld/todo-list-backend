import { appDataSource } from '@database/data-source';
import 'dotenv/config';
import 'reflect-metadata';
import { app } from './app';
import { swaggerServe, swaggerUi } from './doc';

app.use('/api-docs', swaggerServe, swaggerUi);
const PORT = process.env.PORT || 8080;

(async () => {
  try {
    await appDataSource.initialize();
    await appDataSource.runMigrations();
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.log('Error: ', error);
  }
})();
