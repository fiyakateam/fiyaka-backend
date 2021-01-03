import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { LandlordService } from '../service/landlord.service';
import { CreateLandlordDto } from '../dto/create-landlord.dto';
import { UpdateLandlordDto } from '../dto/update-landlord.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('landlord')
@Controller('landlord')
export class LandlordController {
  constructor(private readonly landlordService: LandlordService) {}

  @Post('register')
  public async create(
    @Res() res,
    @Body() createLandlordDto: CreateLandlordDto
  ) {
    try {
      const landlord = await this.landlordService.create(createLandlordDto);
      return res.status(201).send(landlord);
    } catch (e) {
      return res.status(400).send(e);
    }
  }

  @Get()
  findAll() {
    return this.landlordService.findAll();
  }

  @Get(':id')
  public async findOne(@Res() res, @Param('id') id: string) {
    const landlord = await this.landlordService.findOne(id);
    if (!landlord) {
      throw new NotFoundException();
    }
    return res.status(200).send(landlord);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateLandlordDto: UpdateLandlordDto
  ) {
    return this.landlordService.update(id, updateLandlordDto);
  }

  @Delete(':id')
  public async remove(@Res() res, @Param('id') id: string) {
    const landlord = await this.landlordService.remove(id);

    if (!landlord) {
      throw new NotFoundException();
    }

    return res.status(200).send(landlord);
  }
}
