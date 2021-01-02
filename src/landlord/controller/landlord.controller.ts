import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { LandlordService } from '../service/landlord.service';
import { CreateLandlordDto } from '../dto/create-landlord.dto';
import { UpdateLandlordDto } from '../dto/update-landlord.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('landlord')
@Controller('landlord')
export class LandlordController {
  constructor(private readonly landlordService: LandlordService) {}

  @Post()
  create(@Body() createLandlordDto: CreateLandlordDto) {
    return this.landlordService.create(createLandlordDto);
  }

  @Get()
  findAll() {
    return this.landlordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.landlordService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateLandlordDto: UpdateLandlordDto
  ) {
    return this.landlordService.update(+id, updateLandlordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.landlordService.remove(+id);
  }
}
