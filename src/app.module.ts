import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { HouseModule } from './house/house.module';
import { TenantModule } from './tenant/tenant.module';
import { LandlordModule } from './landlord/landlord.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProofModule } from './proof/proof.module';
import env from 'config/env';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { HouseController } from './house/controller/house.controller';
import { LandlordController } from './landlord/controller/landlord.controller';
import { TenantController } from './tenant/controller/tenant.controller';

@Module({
  imports: [
    HouseModule,
    LandlordModule,
    TenantModule,
    AuthModule,
    MongooseModule.forRoot(env.mongoURL),
    ProofModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(HouseController, LandlordController, TenantController);
  }
}
