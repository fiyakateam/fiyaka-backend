import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HouseModule } from './house/house.module';
import { TenantModule } from './tenant/tenant.module';
import { LandlordModule } from './landlord/landlord.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import env from 'config/env';

@Module({
  imports: [
    HouseModule,
    LandlordModule,
    TenantModule,
    AuthModule,
    MongooseModule.forRoot(env.mongoURL),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
