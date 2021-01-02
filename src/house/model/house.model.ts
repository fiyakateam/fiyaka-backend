import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class House extends Document {
  @Prop({ trim: true })
  name: string;

  @Prop()
  address: string;

  @Prop({ type: Buffer })
  currentRentalContract: Buffer;

  @Prop({ type: Types.ObjectId, ref: 'Tenant' })
  _occupant: string;

  @Prop({ type: Types.ObjectId, ref: 'Landlord' })
  _owner: string;
}

export const HouseSchema = SchemaFactory.createForClass(House);
