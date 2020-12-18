import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URL as string, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
});
