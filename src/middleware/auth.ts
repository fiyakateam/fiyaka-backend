import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import Landlord from '../models/landlord';
import Tenant from '../models/tenant';

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const decoded: any = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    );
    const user =
      (await Landlord.findOne({
        _id: decoded._id,
        'tokens.token': token,
      })) ||
      (await Tenant.findOne({
        _id: decoded._id,
        'tokens.token': token,
      }));

    if (!user) {
      throw new Error();
    }

    req.headers.token = token as string;
    req.body.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

export default auth;
