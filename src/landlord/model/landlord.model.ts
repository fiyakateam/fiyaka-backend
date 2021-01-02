import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { IUser, User } from 'src/auth/model/user.model';

@Schema()
export class Landlord extends User {
  @Prop({ type: [Types.ObjectId], ref: 'Tenant' })
  _tenants: string;

  @Prop({ type: [Types.ObjectId], ref: 'House' })
  _houses: string;
}

export type ILandlord = IUser;

export const LandlordSchema = SchemaFactory.createForClass(Landlord);
