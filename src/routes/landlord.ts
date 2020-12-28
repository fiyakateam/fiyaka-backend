import express from 'express';
import Landlord from '../models/landlord';
import { auth } from '../middleware/auth';
import sendCreationEmail from '../services/email';
import { generateAuthToken } from '../services/auth';
const router = express.Router();

router.post(
  '/landlords',
  async (req: express.Request, res: express.Response) => {
    try {
      const landlord = new Landlord(req.body);
      await landlord.save();
      const token = generateAuthToken(landlord._id, landlord.role);
      res.status(201).send({ landlord, token });
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

router.post(
  '/landlords/login',
  async (req: express.Request, res: express.Response) => {
    try {
      const user = await Landlord.findByCredentials(
        req.body.email,
        req.body.password
      );
      const token = generateAuthToken(user._id, user.role);
      res.status(200).send({ user, token });
    } catch (e) {
      res.status(400).send();
    }
  }
);

router.get(
  '/landlords/email',
  auth,
  (req: express.Request, res: express.Response) => {
    try {
      if (!req.body.user.isLandlord) {
        return res.status(403).send();
      }

      sendCreationEmail(req.body.target, req.body.heading, req.body.body);
      res.status(200).send();
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

/*router.get(
  '/landlords/forgot/:id',
  auth,
  async (req: express.Request, res: express.Response) => {
    try {
      const landlord = await Landlord.findById();
    } catch (e: any) {
      res.status(400);
    }
  }
);*/

export default router;
