import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { IUser, User } from 'src/auth/model/user.model';
import { IHouse } from 'src/house/model/house.model';
import { ILandlord } from 'src/landlord/model/landlord.model';

@Schema()
export class Tenant extends User {
  @Prop({ type: Types.ObjectId, ref: 'Landlord' })
  _landlord: string;

  @Prop({ type: Types.ObjectId, ref: 'House' })
  _house: string;

  @Prop()
  description: string;

  @Prop({ default: 'tenant' })
  role: string;
}

export interface ITenant extends IUser {
  _landlord: ILandlord['id'];
  _house: IHouse['id'];
  description: string;
  role: string;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);
