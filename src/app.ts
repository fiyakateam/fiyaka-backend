import express, { Application } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
require('./db/mongoose');
import landlordRouter from './routes/landlord';
import houseRouter from './routes/house';
const app: Application = express();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Fiyaka API',
      version: '1.0.0',
    },
  },
  apis: ['./dist/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(express.json());

app.use(landlordRouter);
app.use(houseRouter);

export default app;
