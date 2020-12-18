import mongoose from 'mongoose';
import validator from 'validator';
import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  age: number;
  tokens: [
    {
      token: { type: string; required: true };
    }
  ];
  timestamps: boolean;
  generateAuthToken(): string;
  toJSON(): any;
}

export const userSchema: mongoose.Schema = new mongoose.Schema({
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
  age: { type: Number, default: 0 },
  tokens: [
    {
      token: { type: String, required: true },
    },
  ],
  timestamps: { type: Boolean, default: true },
});

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function (): Promise<string> {
  const token = jwt.sign(
    { _id: this._id.toString() },
    process.env.JWT_SECRET as Secret
  );

  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next(null);
});

export default userSchema;
