import { Secret } from 'jsonwebtoken';

const sendGridApiKey: string = process.env.SENDGRID_API_KEY as string;
const emailSource: string = process.env.EMAIL_SOURCE as string;
const jwtSecret: Secret = process.env.JWT_SECRET as Secret;
const port = process.env.PORT;
const dbUrl: string = process.env.MONGODB_URL as string;

export { sendGridApiKey, emailSource, jwtSecret, port, dbUrl };
