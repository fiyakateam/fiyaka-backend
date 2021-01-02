import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ILandlord } from 'src/landlord/model/landlord.model';
import { ITenant } from 'src/tenant/model/tenant.model';

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

export interface IHouse extends Document {
  _occupant: ITenant['id'];
  _owner: ILandlord['id'];
}

export const HouseSchema = SchemaFactory.createForClass(House);
