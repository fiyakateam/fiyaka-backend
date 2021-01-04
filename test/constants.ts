import env from '../config/env';

export const root = `http://localhost:${env.port}`;
export const database = env.mongoURL;
