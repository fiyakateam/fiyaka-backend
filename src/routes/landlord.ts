import express from 'express';
import { auth } from '../middleware/auth';
import sendCreationEmail from '../services/email';
const router = express.Router();

router.post(
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
