import mongoose, { Model, Schema } from 'mongoose';
import { userSchema, IUser } from '../auth/user.model';
import { ILandlord } from '../landlord/landlord.model';
import bcrypt from 'bcryptjs';

export interface ITenant extends IUser {
  _landlord: ILandlord['_id'];
}

export interface ITenantModel extends Model<ITenant> {
  findByCredentials(email: string, password: string): Promise<ITenant>;
}

const tenantSchema: Schema = new mongoose.Schema({
  _landlord: { type: Schema.Types.ObjectId, ref: 'Landlord', required: true },
});

tenantSchema.add(userSchema).add({ role: { type: String, default: 'Tenant' } });

const Tenant = mongoose.model<ITenant, ITenantModel>('Tenant', tenantSchema);
export default Tenant;
