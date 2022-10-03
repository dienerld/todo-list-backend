import express from 'express';
import { usersRouter, tasksRouter } from './routes';

const app = express();
app.use(express.json());

app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);

export { app };
