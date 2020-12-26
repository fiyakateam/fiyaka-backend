import express from 'express';
import Landlord from '../models/landlord';
import auth from '../middleware/auth';
const landlordRouter: express.Router = express.Router();

landlordRouter.post(
  '/landlords',
  auth,
  async (req: express.Request, res: express.Response) => {
    const landlord = new Landlord(req.body);
    try {
      await landlord.save();
      const token = await landlord.generateAuthToken();
      res.status(201).send({ landlord, token });
    } catch (e: any) {
      res.status(400).send(e);
    }
  }
);

landlordRouter.get(
  '/landlords',
  auth,
  async (req: express.Request, res: express.Response) => {
    res.status(200).send({ some: 'json' });
  }
);

export default landlordRouter;
