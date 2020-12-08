import mongoose, { Schema } from 'mongoose';
import { IUser } from './user';

export interface ITenant extends mongoose.Document {
  _userSelf: IUser['_id'];
  // TODO add house somehow
}

export const TenantSchema: Schema = new mongoose.Schema({
  _userSelf: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Tenant = mongoose.model<ITenant>('Tenant', TenantSchema);
export default Tenant;
