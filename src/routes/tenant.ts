import express from 'express';
import Tenant from '../models/tenant';
import auth from '../middleware/auth';
const tenantRouter: express.Router = express.Router();

tenantRouter.post(
  '/tenants',
  auth,
  async (req: express.Request, res: express.Response) => {
    res.status(501).send();
  }
);
