import { Module } from '@nestjs/common';
import { TenantService } from './service/tenant.service';
import { TenantController } from './controller/tenant.controller';

@Module({
  controllers: [TenantController],
  providers: [TenantService],
  exports: [TenantService],
})
export class TenantModule {}
