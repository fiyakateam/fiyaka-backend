import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ILandlord } from '../../landlord/model/landlord.model';
import { ITenant } from '../../tenant/model/tenant.model';

@Schema()
export class House extends Document {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ type: Buffer })
  currentRentalContract: Buffer;

  @Prop({ type: Types.ObjectId, ref: 'Tenant' })
  _occupant: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Landlord' })
  _owner: string;
}

export interface IHouse extends Document {
  name: string;
  address: string;
  currentRentalContract: Buffer;
  _occupant: ITenant['_id'];
  _owner: ILandlord['_id'];
}

export const HouseSchema = SchemaFactory.createForClass(House);
