import mongoose, { Model, Schema } from 'mongoose';
import { userSchema, IUser } from './user';
import bcrypt from 'bcryptjs';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ITenant extends IUser {}

export interface ITenantModel extends Model<ITenant> {
  findByCredentials(email: string, password: string): Promise<ITenant>;
}

const tenantSchema: Schema = new mongoose.Schema();
tenantSchema
  .add(userSchema)
  .add({ role: { type: String, default: 'Landlord' } });

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
