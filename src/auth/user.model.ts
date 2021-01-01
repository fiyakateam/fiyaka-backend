import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  timestamps: boolean;
  role: string;
  toJSON(): any;
}

export const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value: string) {
      if (!validator.isEmail(value)) throw new Error('Email is invalid!');
    },
  },
  password: { type: String, required: true, trim: true, minlength: 8 },
  isLandlord: { type: Boolean, required: true },
  timestamps: { type: Boolean, default: true },
});

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next(null);
});

export default userSchema;
