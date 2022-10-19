import express from 'express';

import { cors } from './middleware';
import { getDatabase } from '@database/index';
import { usersRouter, tasksRouter } from './routes';

const app = express();
app.use(express.json());
app.use(cors);

app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);

app.get('/', (_, response) => response.redirect('/api-docs'));

app.get('/root/users', (_, res) => res.json(getDatabase()));

export { app };
