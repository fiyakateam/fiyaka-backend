import { Module } from '@nestjs/common';
import { LandlordService } from './landlord.service';
import { LandlordController } from './landlord.controller';
import { Landlord } from './entities/landlord.entity';

@Module({
  controllers: [LandlordController],
  providers: [LandlordService],
  exports: [LandlordService],
})
export class LandlordModule {}
