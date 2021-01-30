import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { Conversation, conversationSchema } from './model/conversation.model';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Conversation.name, schema: conversationSchema },
    ]),
  ],
  controllers: [],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
