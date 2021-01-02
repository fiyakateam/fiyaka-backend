import { Module } from '@nestjs/common';
import { HouseService } from './service/house.service';
import { HouseController } from './controller/house.controller';
import { House, HouseSchema } from './model/house.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: House.name, schema: HouseSchema }]),
  ],
  controllers: [HouseController],
  providers: [HouseService],
})
export class HouseModule {}
