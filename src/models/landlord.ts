import mongoose from 'mongoose';
import { userSchema, IUser } from './user';

export interface ILandlord extends IUser {
  nick: string;
  // TODO add housees ref somehow ?
}

const landlordSchema: mongoose.Schema = new mongoose.Schema();
landlordSchema.add(userSchema).add({ nick: 'string' });

const Landlord = mongoose.model<ILandlord>('Landlord', landlordSchema);

export default Landlord;
