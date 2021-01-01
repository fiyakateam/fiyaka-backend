import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Tenant extends Document {
  @Prop({ trim: true })
  name: string;

  @Prop({ unique: true, trim: true })
  email: string;

  @Prop({ trim: true })
  password: string;

  @Prop({ default: true })
  timestamps: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Landlord' })
  _landlord: string;

  @Prop({ type: Types.ObjectId, ref: 'House' })
  _house: string;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);
