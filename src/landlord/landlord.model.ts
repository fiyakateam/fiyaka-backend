import mongoose, { Model } from 'mongoose';
import { userSchema, IUser } from '../auth/user.model';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ILandlord extends IUser {
  houses: string; // placeholder types for now
  tenants: string; // placeholder types for now
}

export interface ILandlordModel extends Model<ILandlord> {
  findByCredentials(email: string, password: string): Promise<ILandlord>;
}

const landlordSchema: mongoose.Schema = new mongoose.Schema();
landlordSchema.add(userSchema).add({
  role: { type: String, default: 'Landlord' },
});

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

const Landlord = mongoose.model<ILandlord, ILandlordModel>(
  'Landlord',
  landlordSchema
);

export default Landlord;
