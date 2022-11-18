import { appDataSource } from '@database/data-source';
import { User } from '@models/user/user.model';
import express from 'express';

import { cors } from './middleware';
import { tasksRouter, usersRouter } from './routes';

const app = express();
app.use(express.json());
app.use(cors);

app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);

app.get('/', (_, response) => response.redirect('/api-docs'));

app.get('/root/users', async (_, res) => {
  const user = await appDataSource.getRepository(User).find({ relations: ['tasks'] });
  res.json(user);
});

export { app };
