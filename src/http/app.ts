import express from 'express';
import { usersRouter } from './routes';

const app = express();
app.use(express.json());

app.use('/users', usersRouter);

export { app };
