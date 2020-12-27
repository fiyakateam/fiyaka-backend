import mongoose, { Model, Schema } from 'mongoose';
import { userSchema, IUser } from './user';
import bcrypt from 'bcryptjs';
import { ILandlord } from './landlord';

export interface ITenant extends IUser {
  foo: 'string';
  _landlord: ILandlord['_id'];
  findByCredentials(email: string, password: string): Promise<ITenant>;
}

export interface ITenantModel extends Model<ITenant> {
  findByCredentials(email: string, password: string): Promise<ITenant>;
}

const tenantSchema: Schema = new mongoose.Schema({
  _landlord: { type: Schema.Types.ObjectId, ref: 'Landlord', required: true },
});
tenantSchema.add(userSchema).add({ foo: 'string' });

tenantSchema.statics.findByCredentials = async (
  email: string,
  password: string
) => {
  const tenant = await Tenant.findOne({ email });

  if (!tenant) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, tenant.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return tenant;
};

const Tenant = mongoose.model<ITenant, ITenantModel>('Tenant', tenantSchema);
export default Tenant;
