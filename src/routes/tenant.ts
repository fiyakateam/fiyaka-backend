import express from 'express';
import Tenant from '../models/tenant';
import auth from '../middleware/auth';
import House from '../models/house';
const tenantRouter: express.Router = express.Router();

tenantRouter.post(
  '/tenants',
  auth,
  async (req: express.Request, res: express.Response) => {
    const isLandlord = req.body.user.isLandlord;
    if (!isLandlord) {
      return res.status(403).send();
    }

    try {
      const house = await House.findById(req.params.id);

      if (!house) {
        return res.status(404).send();
      }

      const tenant = new Tenant(req.body);
      tenant.set('isLandlord', false);

      await tenant.save();
      house.set('_occupant', tenant._id);
      const token = await tenant.generateAuthToken();
      res.status(201).send({ tenant, token });
    } catch (e: any) {
      res.status(400).send(e);
    }
  }
);

tenantRouter.post(
  '/tenants/login',
  auth,
  async (req: express.Request, res: express.Response) => {
    try {
      const tenant = await Tenant.findByCredentials(
        req.body.email,
        req.body.password
      );
      const token = await tenant.generateAuthToken();
      res.send({ tenant, token });
    } catch (e: any) {
      res.status(400).send();
    }
  }
);

tenantRouter.post(
  '/tenants/logout',
  auth,
  async (req: express.Request, res: express.Response) => {
    try {
      req.body.user.tokens = req.body.user.tokens.filter((token: any) => {
        return token.token !== req.headers?.token;
      });
      await req.body.user.save();
    } catch (e: any) {
      res.status(500).send();
    }
  }
);

tenantRouter.delete(
  '/tenants/:id',
  auth,
  async (req: express.Request, res: express.Response) => {
    const isLandlord = req.body.user.isLandlord;

    if (!isLandlord) {
      return res.status(403).send();
    }

    try {
      const tenant = await Tenant.findOneAndDelete({ _id: req.params.id });
      if (!tenant) {
        return res.status(404).send();
      }

      const house = await House.findOne({ _occupant: tenant._id });
      if (house) {
        house.set('_occupant', undefined);
      }

      res.send(tenant);
    } catch (e: any) {
      res.status(500).send();
    }
  }
);

export default tenantRouter;

/**
 * @swagger
 * path:
 *  /tenants:
 *    post:
 *      summary: Create a tenant
 *      description: Only landlords can create tenants.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - password
 *              properties:
 *                name:
 *                  type: string
 *                age:
 *                  type: number
 *                email:
 *                  type: string
 *                  format: email
 *                  description: Must be unique
 *                password:
 *                  type: string
 *                  format: password
 *                  minLength: 8
 *              example:
 *                name: fake name
 *                email: fake@example.com
 *                password: password1
 *      responses:
 *        "201":
 *          description: Created
 *        "400":
 *          description: Bad Request
 *        "403":
 *          description: Forbidden
 *        "404":
 *          description: Not Found
 */

/**
 * @swagger
 * path:
 *   /tenants/login:
 *     post:
 *       description: Login a tenant
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - email
 *                 - password
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                 password:
 *                   type: string
 *                   format: password
 *                   minLength: 8
 *       responses:
 *         "200":
 *           description:
 *         "400":
 *           description: Bad Request
 */

/**
 * @swagger
 * path:
 *  /tenants/{id}:
 *    delete:
 *      summary: Delete a tenant
 *      description: Only landlords can delete tenants.
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Tenant id
 *      responses:
 *        "200":
 *          description: Success
 *        "403":
 *          description: Forbidden
 *        "404":
 *          description: Not Found
 *        "500":
 *          description: Internal Error
 */
