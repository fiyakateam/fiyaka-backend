import { Module } from '@nestjs/common';
import { LandlordService } from './service/landlord.service';
import { LandlordController } from './controller/landlord.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Landlord, LandlordSchema } from './model/landlord.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Landlord.name, schema: LandlordSchema },
    ]),
  ],
  controllers: [LandlordController],
  providers: [LandlordService],
  exports: [LandlordService],
})
export class LandlordModule {}
