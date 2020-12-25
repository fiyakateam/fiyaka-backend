import express, { Application } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
require('./db/mongoose');
import landlordRouter from './routes/landlord';
const app: Application = express();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Fiyaka API',
      version: '1.0.0',
    },
  },
  apis: ['app.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(express.json());
app.use(landlordRouter);

export default app;
