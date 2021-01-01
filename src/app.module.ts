import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HouseModule } from './house/house.module';
import { TenantModule } from './tenant/tenant.module';
import { LandlordModule } from './landlord/landlord.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProofModule } from './proof/proof.module';
import env from 'config/env';

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
  providers: [AppService],
})
export class AppModule {}
