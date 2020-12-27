import jwt from 'jsonwebtoken';

export const generateAuthToken = (id: string, role: string): string => {
  const token = jwt.sign(
    { _id: id, role: role },
    process.env.JWT_SECRET as string,
    { expiresIn: '1y' }
  );
  return token;
};

export const verifyAuthToken = (token: string): any => {
  const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
  return decoded;
};
