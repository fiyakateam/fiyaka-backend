import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Message } from '../dto/message.dto';

@Schema()
export class Conversation extends Document {
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId })
  tenant: string;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId })
  landlord: string;

  @Prop()
  messages: Message[];
}

export const conversationSchema = SchemaFactory.createForClass(Conversation);
