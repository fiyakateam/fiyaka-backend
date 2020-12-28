import express from 'express';
import Landlord from '../models/landlord';
import { generateAuthToken } from '../services/auth';
import Tenant from '../models/tenant';
const router = express.Router();

router.post(
  '/auth/register',
  async (req: express.Request, res: express.Response) => {
    const landlord = new Landlord(req.body);
    try {
      await landlord.save();
      const token = generateAuthToken(landlord._id, landlord.role);
      res.status(201).send({ landlord, token });
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

router.post(
  '/auth/login',
  async (req: express.Request, res: express.Response) => {
    try {
      const user =
        (await Landlord.findByCredentials(req.body.email, req.body.password)) ||
        (await Tenant.findByCredentials(req.body.email, req.body.password));
      const token = generateAuthToken(user._id, user.role);
      res.status(201).send({ user, token });
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

export default router;
