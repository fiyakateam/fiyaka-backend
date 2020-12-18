import express from 'express';
import Tenant from '../models/tenant';
const router: express.Router = express.Router();

router.post('/tenants', async (req: express.Request, res: express.Response) => {
  res.status(501).send();
});
