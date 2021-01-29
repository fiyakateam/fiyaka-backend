import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tenant, TenantSchema } from '../tenant/model/tenant.model';
import { TenantModule } from '../tenant/tenant.module';
import { HouseController } from './controller/house.controller';
import { House, HouseSchema } from './model/house.model';
import { HouseService } from './service/house.service';

@Module({
  imports: [
    TenantModule,
    MongooseModule.forFeature([
      { name: House.name, schema: HouseSchema },
      { name: Tenant.name, schema: TenantSchema },
    ]),
  ],
  controllers: [HouseController],
  providers: [HouseService],
})
export class HouseModule {}
