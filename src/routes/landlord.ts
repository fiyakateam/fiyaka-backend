import express, { Request } from 'express';
import Landlord from '../models/landlord';
import { auth } from '../middleware/auth';
import { generateAuthToken } from '../services/auth';
const router = express.Router();

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
