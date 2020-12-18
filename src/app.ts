import express, { Application } from 'express';
require('./db/mongoose');
import landlordRouter from './routes/landlord';

const app: Application = express();
app.use(express.json());
app.use(landlordRouter);

export default app;
