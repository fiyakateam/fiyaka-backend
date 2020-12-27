import express, { Request } from 'express';
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

interface MyObj {
  target: string;
  heading: string;
  body: string;
}

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
    } catch (e: any) {
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

/**
 * @swagger
 * tags:
 *   name: Landlord
 */
/**
 * @swagger
 * /landlords:
 *  post:
 *    description: Create a landlord account
 *    tags: [Landlord]
 *    consumes:
 *    - application/json
 *    parameters:
 *    - in: "body"
 *      name: landlord
 *      required: true
 *      schema:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *          password:
 *            type: string
 *            minlength: 8
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                  name:
 *                    type: string
 *                  email:
 *                    type: string
 *                  token:
 *                    type: string
 *        "400":
 *          description: ERror lMAO
 *
 * /landlords/login:
 *  post:
 *    description: Login
 *    tags: [Landlord]
 *    consumes:
 *    - application/json
 *    parameters:
 *    - in: "body"
 *      name: landlord
 *      required: true
 *      schema:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          email:
 *            type: string
 *          password:
 *            type: string
 *            minlength: 8
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                  name:
 *                    type: string
 *                  email:
 *                    type: string
 *                  token:
 *                    type: string
 *        "400":
 *          description: ERror lMAO
 */

/**
 * @swagger
 *  /landlord/{id}:
 *    get:
 *      summary: Get a user
 *      description: Logged in landlord can fetch only their own user information.
 *      tags: [Landlord]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: User id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                  email:
 *                    type: string
 *        "401":
 *          description: Unauthorized
 *        "403":
 *          description: Forbidden
 *        "404":
 *          descri
 *
 *    patch:
 *      summary: Update a user
 *      description: Logged in landlord can only update their own information.
 *      tags: [Landlord]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: User id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                  format: email
 *                  description: must be unique
 *                password:
 *                  type: string
 *                  format: password
 *                  minLength: 8
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                  email:
 *                    type: string
 *        "400":
 *          description: Duplicate email
 *        "404":
 *          description: User not found
 *
 *    delete:
 *      summary: Delete a user
 *      description: Logged in landlord can delete only themselves.
 *      tags: [Landlord]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: User id
 *      responses:
 *        "200":
 *          description: No content
 *        "404":
 *          description: Not found
 */
