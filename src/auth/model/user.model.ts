import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema()
export class User extends Document {
  @Prop({ require: true, trim: true })
  name: string;

  @Prop({ require: true, unique: true, trim: true })
  email: string;

  @Prop({ require: true, trim: true })
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

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

UserSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next(null);
});

export { UserSchema };
