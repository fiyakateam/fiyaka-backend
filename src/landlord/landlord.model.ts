import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/auth/user.model';

@Schema()
export class Landlord extends User {
  @Prop({ type: [Types.ObjectId], ref: 'Tenant' })
  _tenants: string;

  @Prop({ type: [Types.ObjectId], ref: 'House' })
  _houses: string;
}

export const LandlordSchema = SchemaFactory.createForClass(Landlord);
