import { Request, Response, NextFunction } from 'express';
import Landlord from '../models/landlord';
import Tenant from '../models/tenant';
import { verifyAuthToken } from '../services/auth';

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '') as string;
    const decoded = verifyAuthToken(token);

    if (!decoded.role) {
      throw new Error();
    }
    const user =
      decoded.role === 'Landlord'
        ? await Landlord.findById(decoded._id)
        : await Tenant.findById(decoded._id);
    if (!user) {
      throw new Error();
    }

    req.headers.token = token;
    req.body.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

export default auth;
