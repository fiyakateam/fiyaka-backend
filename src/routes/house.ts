import express from 'express';
import House from '../models/house';
import auth from '../middleware/auth';
import { getAllJSDocTagsOfKind } from 'typescript';
const houseRouter: express.Router = express.Router();

// TODO add auth for all of them

houseRouter.post(
  '/houses',
  auth,
  async (req: express.Request, res: express.Response) => {
    const house = new House(req.body);
    //TODO add landlord reference with using auth middleware
    try {
      await house.save();
      res.status(201).send({ house });
    } catch (e: any) {
      res.status(400).send(e);
    }
  }
);

// GET /houses?limit=n&skip=y //for n pages at each request
//skip=y to skip y number of requests
//GET /houses?sortBy=createdAt_asc/_desc //to specify the sorting criteria
houseRouter.get(
  '/houses',
  auth,
  async (req: express.Request, res: express.Response) => {
    const sort: any = {};

    if (req.query.sortBy) {
      //split by : character
      const parts = (<string>req.query.sortBy).split(':');
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    //TODO populate
    try {
    } catch (e: any) {
      res.status(500).send(e);
    }
  }
);

houseRouter.get(
  '/houses/:id',
  auth,
  async (req: express.Request, res: express.Response) => {
    const _id = req.params.id;
    //if the requester a landlord or not
    const isLandlord = req.user.isLandlord;
    let house: any;

    try {
      //user will be add to the request by auth
      if (isLandlord) {
        house = await House.findOne({ _id, _owner: req.user._id });
      } else {
        house = await House.findOne({ _id, _occupant: req.user._id });
      }

      if (!house) {
        return res.status(404).send();
      }
      res.send(house);
    } catch (e: any) {
      res.status(500).send(e);
    }
  }
);

houseRouter.patch(
  '/houses/:id',
  auth,
  async (req: express.Request, res: express.Response) => {
    const updates = Objects.keys(req.body);
    const allowedUpdates = ['name', 'address'];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    const isLandlord = req.user.isLandlord;

    if (!isLandlord) {
      return res.status(403).send();
    }

    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
      const house = await House.findOne({
        _id: req.params.id,
        owner: req.user._id,
      });

      if (!house) {
        return res.status(404).send();
      }

      updates.forEach((update) => (house[update] = req.body[update]));
      await house.save();
      res.send(house);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

houseRouter.delete(
  'houses/:id',
  auth,
  async (req: express.Request, res: express.Response) => {
    try {
      let house: any;
      const isLandlord = req.user.isLandlord;

      if (isLandlord) {
        house = await House.findOneAndDelete({
          _id: req.params.id,
          _owner: req.user._id,
        });
      } else {
        house = await House.findOneAndDelete({
          _id: req.params.id,
          _occupant: req.user._id,
        });
      }

      if (!house) {
        return res.status(404).send();
      }

      res.send(house);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

export default houseRouter;
