import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/auth/model/user.model';

@Schema()
export class Tenant extends User {
  @Prop({ type: Types.ObjectId, ref: 'Landlord' })
  _landlord: string;

  @Prop({ type: Types.ObjectId, ref: 'House' })
  _house: string;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);
