import express from 'express';
import House from '../models/house';
import auth from '../middleware/auth';
const router = express.Router();

// TODO add auth for all of them

router.post(
  '/houses',
  auth,
  async (req: express.Request, res: express.Response) => {
    const house = new House({
      ...req.body,
      _owner: req.body.user._id,
    });
    //TODO add landlord reference with using auth middleware
    try {
      await house.save();
      res.status(201).send(house);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

// GET /houses?limit=n&skip=y //for n pages at each request
//skip=y to skip y number of requests
//GET /houses?sortBy=createdAt_asc/_desc //to specify the sorting criteria

router.get(
  '/houses',
  auth,
  async (req: express.Request, res: express.Response) => {
    const sort: any = {};

    const isLandlord = req.body.user.isLandlord;

    if (!isLandlord) {
      return res.status(403).send();
    }

    if (req.query.sortBy) {
      //split by : character
      const parts = (<string>req.query.sortBy).split(':');
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    try {
      await req.body.user
        .populate({
          path: 'houses',
          options: {
            limit: parseInt(req.query.limit as string),
            skip: parseInt(req.query.skip as string),
            sort,
          },
        })
        .execPopulate();
      res.send(req.body.user.houses);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.get(
  '/houses/:id',
  auth,
  async (req: express.Request, res: express.Response) => {
    const _id = req.params.id;
    //if the requester a landlord or not
    const isLandlord = req.body.user.isLandlord;

    try {
      //user will be add to the request by auth

      const house = isLandlord
        ? await House.findOne({ _id, _owner: req.body.user._id })
        : await House.findOne({ _id, _occupant: req.body.user._id });

      if (!house) {
        return res.status(404).send();
      }
      res.send(house);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.patch(
  '/houses/:id',
  auth,
  async (req: express.Request, res: express.Response) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'address'];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    const isLandlord = req.body.user.isLandlord;

    if (!isLandlord) {
      return res.status(403).send();
    }

    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
      const house = await House.findOne({
        _id: req.params.id,
        owner: req.body.user._id,
      });

      if (!house) {
        return res.status(404).send();
      }

      //updates.forEach((update) => (house[update] = req.body[update]));
      updates.forEach((update) => house.set(update, req.body[update]));
      await house.save();
      res.send(house);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.delete(
  '/houses/:id',
  auth,
  async (req: express.Request, res: express.Response) => {
    const isLandlord = req.body.user.isLandlord;
    if (!isLandlord) {
      return res.status(403).send();
    }

    try {
      let house = await House.findById(req.params.id);

      if (house?._occupant !== undefined) {
        return res.status(403).send();
      }

      house = await House.findOneAndDelete({
        _id: req.params.id,
        _owner: req.body.user._id,
      });

      if (!house) {
        return res.status(404).send();
      }

      res.send(house);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.post(
  '/houses/:id/assign',
  auth,
  async (req: express.Request, res: express.Response) => {
    try {
      const t_id = req.body.tenant;
      const h_id = req.params.id;
      const house = await House.findById(h_id);

      house?.set('_occupant', t_id);
      await house?.save();
      res.send();
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

export default router;

/**
 * @swagger
 * tags:
 *   name: House
 */
/**
 * @swagger
 * /houses:
 *    post:
 *      description: Create a house
 *      tags: [House]
 *      parameters:
 *        - name: name
 *          description: Name of the house
 *          in: formData
 *          required: true
 *          type: string
 *        - name: address
 *          description: Address of the house
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *        201:
 *          description: Created
 *        400:
 *          description: Bad Request
 *    get:
 *      description: Get all houses
 *      tags: [House]
 *      responses:
 *        200:
 *          description: Success
 *        500:
 *          description: Internal Error
 */

/**
 * @swagger
 * /houses/{id}:
 *    get:
 *      description: Get a house by id
 *      tags: [House]
 *      responses:
 *        200:
 *          description: Success
 *        404:
 *          description: House not found
 *        500:
 *          description: Internal Error
 *    patch:
 *      description: Update a house by id
 *      tags: [House]
 *      parameters:
 *        - name: name
 *          description: Updated name
 *          in: formData
 *          type: string
 *        - name: address
 *          description: Updated address
 *          in: formData
 *          type: string
 *      responses:
 *        200:
 *          description: Success
 *        400:
 *          description: Bad Request
 *        403:
 *          description: Forbidden
 *        404:
 *          description: House not found
 *        500:
 *          description: Internal Error
 *    delete:
 *      description: Delete a house by id
 *      tags: [House]
 *      responses:
 *        200:
 *          description: Success
 *        400:
 *          description: Bad Request
 *        403:
 *          description: Forbidden
 *        404:
 *          description: House not found
 *        500:
 *          description: Internal Error
 */
