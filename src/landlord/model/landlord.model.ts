import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { IUser, User } from 'src/auth/model/user.model';

@Schema()
export class Landlord extends User {
  @Prop({ type: [Types.ObjectId], ref: 'Tenant' })
  _tenants: string;

  @Prop({ type: [Types.ObjectId], ref: 'House' })
  _houses: string;

  @Prop({ default: 'landlord' })
  role: string;
}

export interface ILandlord extends IUser {
  role: string;
}

export const LandlordSchema = SchemaFactory.createForClass(Landlord);
