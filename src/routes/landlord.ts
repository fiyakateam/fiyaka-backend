import express, { Request } from 'express';
import Landlord from '../models/landlord';
import { auth } from '../middleware/auth';
const router = express.Router();

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

router.post(
  '/landlords/login',
  async (req: express.Request, res: express.Response) => {
    try {
      const user = await Landlord.findByCredentials(
        req.body.email,
        req.body.password
      );
      const token = await user.generateAuthToken();
      res.status(200).send({ user, token });
    } catch (e: any) {
      res.status(400).send();
    }
  }
);

router.post(
  '/landlords/logout',
  auth,
  async (req: Request, res: express.Response) => {
    try {
      console.log(req.headers.token);
      req.body.user.tokens = req.body.user.tokens.filter((token: any) => {
        return token.token !== req.headers?.token;
      });
      console.log(req.body.user);
      await req.body.user.save();

      res.send('helo');
    } catch (e) {
      res.status(500).send();
    }
  }
);

export default router;
