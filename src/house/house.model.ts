import mongoose, { Schema } from 'mongoose';
import { ILandlord } from '../landlord/landlord.model';
import { ITenant } from '../tenant/tenant.model';

export interface IHouse extends mongoose.Document {
  name: string;
  address: string;
  currentRentalContract: Buffer;
  _owner: ILandlord['_id'];
  _occupant: ITenant['_id'];
}

export const HouseSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  currentRentalContract: { type: Buffer },
  _owner: { type: Schema.Types.ObjectId, ref: 'Landlord', required: true },
  _occupant: { type: Schema.Types.ObjectId, ref: 'Tenant' },
});

const House = mongoose.model<IHouse>('House', HouseSchema);
export default House;
