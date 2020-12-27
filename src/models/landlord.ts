import mongoose, { Model } from 'mongoose';
import { userSchema, IUser } from './user';
import bcrypt from 'bcryptjs';
import { IHouse } from './house';

export interface ILandlord extends IUser {
  houses: IHouse[];
}

export interface ILandlordModel extends Model<ILandlord> {
  findByCredentials(email: string, password: string): Promise<ILandlord>;
}

const landlordSchema: mongoose.Schema = new mongoose.Schema();
landlordSchema.add(userSchema).add({ nick: 'string' });

landlordSchema.virtual('houses', {
  ref: 'House',
  localField: '_id',
  foreignField: '_owner',
});

landlordSchema.virtual('tenants', {
  ref: 'Tenant',
  localField: '_id',
  foreignField: '_landlord',
});

landlordSchema.statics.findByCredentials = async (
  email: string,
  password: string
) => {
  const user = await Landlord.findOne({ email });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

const Landlord = mongoose.model<ILandlord, ILandlordModel>(
  'Landlord',
  landlordSchema
);

export default Landlord;
