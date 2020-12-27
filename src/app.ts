import express, { Application } from 'express';
import swaggerUI from 'swagger-ui-express';
require('./db/mongoose');
import landlordRouter from './routes/landlord';
import houseRouter from './routes/house';
import tenantRouter from './routes/tenant';
import authRouter from './routes/auth';
import * as swaggerDocs from './swagger.json';
import cors from 'cors';

const app: Application = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(cors());

app.use(express.json());

app.use(landlordRouter);
app.use(houseRouter);
app.use(tenantRouter);
app.use(authRouter);

export default app;
