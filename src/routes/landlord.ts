import express from 'express';
import Landlord from '../models/landlord';
const router: express.Router = express.Router();

router.post(
  '/landlords',
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

router.get(
  '/landlords',
  async (req: express.Request, res: express.Response) => {
    res.status(200).send({ some: 'json' });
  }
);

export default router;
