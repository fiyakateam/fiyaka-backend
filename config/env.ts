export default {
  port: process.env.PORT,
  mongoURL: process.env.MONGODB_URL,
  jwtSecret: process.env.JWT_SECRET,
  sendgridKey: process.env.SENDGRID_API_KEY,
  emailSource: process.env.EMAIL_SOURCE,
  swaggerPath: 'docs',
};
