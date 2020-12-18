import mongoose, { Schema } from 'mongoose';
import { userSchema, IUser } from './user';

export interface ITenant extends IUser {
  foo: 'string';
}

const tenantSchema: Schema = new mongoose.Schema();
tenantSchema.add(userSchema).add({ foo: 'string' });

const Tenant = mongoose.model<ITenant>('Tenant', tenantSchema);
export default Tenant;
