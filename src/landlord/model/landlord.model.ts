import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { IUser, User } from '../../auth/model/user.model';

@Schema()
export class Landlord extends User {
  @Prop({ type: [Types.ObjectId], ref: 'Tenant' })
  tenants: string;

  @Prop({ type: [Types.ObjectId], ref: 'House' })
  houses: string;

  @Prop({ default: 'landlord' })
  role: string;
}

export interface ILandlord extends IUser {
  role: string;
}

const LandlordSchema = SchemaFactory.createForClass(Landlord);

export { LandlordSchema };
