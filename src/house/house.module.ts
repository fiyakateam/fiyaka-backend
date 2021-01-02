import { Module } from '@nestjs/common';
import { HouseService } from './service/house.service';
import { HouseController } from './controller/house.controller';

@Module({
  controllers: [HouseController],
  providers: [HouseService],
})
export class HouseModule {}
