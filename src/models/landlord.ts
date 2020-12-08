import mongoose, { Schema } from 'mongoose';
import { IUser } from './user';

export interface ILandlord extends mongoose.Document {
  _userSelf: IUser['_id'];
  // TODO add housees ref somehow ?
}

export const LandlordSchema: Schema = new mongoose.Schema({
  _userSelf: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Landlord = mongoose.model<ILandlord>('Landlord', LandlordSchema);
export default Landlord;
