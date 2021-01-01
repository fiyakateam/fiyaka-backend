import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

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

  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
