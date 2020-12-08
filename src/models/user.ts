import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import { ILandlord } from './landlord';
import { ITenant } from './tenant';

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
  _landlord: ILandlord['_id'];
  _tenant: ITenant['_id'];
  timestamps: boolean;
}

export const UserSchema: Schema = new mongoose.Schema({
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
  _landlord: { type: Schema.Types.ObjectId, ref: 'Landlord' },
  _tenant: { type: Schema.Types.ObjectId, ref: 'Tenant' },
  timestamps: { type: Boolean, default: true },
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
