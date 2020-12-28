import jwt from 'jsonwebtoken';
import { jwtSecret } from '../configToShow/env';

export const generateAuthToken = (id: string, role: string): string => {
  const token = jwt.sign({ _id: id, role: role }, jwtSecret, {
    expiresIn: '1y',
  });
  return token;
};

export const verifyAuthToken = (token: string): any => {
  const decoded = jwt.verify(token, jwtSecret);
  return decoded;
};
