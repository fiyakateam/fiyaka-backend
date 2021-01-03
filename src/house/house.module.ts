import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HouseService } from './service/house.service';
import { HouseController } from './controller/house.controller';
import { House, HouseSchema } from './model/house.model';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthMiddleware } from 'src/auth/middleware/auth.middleware';
import { LandlordModule } from 'src/landlord/landlord.module';
import { TenantModule } from 'src/tenant/tenant.module';
import { AuthModule } from 'src/auth/auth.module';
import { Tenant, TenantSchema } from 'src/tenant/model/tenant.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: House.name, schema: HouseSchema },
      { name: Tenant.name, schema: TenantSchema },
    ]),
  ],
  controllers: [HouseController],
  providers: [HouseService],
})
export class HouseModule {}
