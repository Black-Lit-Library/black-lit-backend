import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import usersController from '../lib/controllers/users';

const app = express();

app.use(express.json());

app.use('/api/v1/users', usersController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
