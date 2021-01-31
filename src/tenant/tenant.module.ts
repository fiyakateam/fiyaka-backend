import { Module } from '@nestjs/common';
import { TenantService } from './service/tenant.service';
import { TenantController } from './controller/tenant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tenant, TenantSchema } from './model/tenant.model';
import { ChatModule } from '../chat/chat.module';
import {
  Conversation,
  conversationSchema,
} from '../chat/model/conversation.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tenant.name, schema: TenantSchema }]),
    MongooseModule.forFeature([
      { name: Conversation.name, schema: conversationSchema },
    ]),
  ],
  controllers: [TenantController],
  providers: [TenantService],
  exports: [TenantService],
})
export class TenantModule {}
