import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Message } from '../dto/message.dto';

@Schema()
export class Conversation extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId })
  tenant: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId })
  landlord: Types.ObjectId;

  @Prop()
  messages: Message[];
}

export const conversationSchema = SchemaFactory.createForClass(Conversation);
