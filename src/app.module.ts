import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { HouseModule } from './house/house.module';
import { TenantModule } from './tenant/tenant.module';
import { LandlordModule } from './landlord/landlord.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import env from '../config/env';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { HouseController } from './house/controller/house.controller';
import { LandlordController } from './landlord/controller/landlord.controller';
import { TenantController } from './tenant/controller/tenant.controller';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    HouseModule,
    LandlordModule,
    TenantModule,
    AuthModule,
    MongooseModule.forRoot(env.mongoURL),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(HouseController, LandlordController, TenantController);
  }
}
