import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ trim: true })
  name: string;

  @Prop({ unique: true, trim: true })
  email: string;

  @Prop({ trim: true })
  password: string;

  @Prop({ default: true })
  timestamps: boolean;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  timestamps: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
