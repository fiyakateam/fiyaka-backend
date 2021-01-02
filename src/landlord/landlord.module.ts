import { Module } from '@nestjs/common';
import { LandlordService } from './service/landlord.service';
import { LandlordController } from './controller/landlord.controller';

@Module({
  controllers: [LandlordController],
  providers: [LandlordService],
  exports: [LandlordService],
})
export class LandlordModule {}
