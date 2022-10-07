import express from 'express';
import { cors } from './middleware/cors';
import { usersRouter, tasksRouter } from './routes';

const app = express();
app.use(express.json());
app.use(cors);

app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);

export { app };
