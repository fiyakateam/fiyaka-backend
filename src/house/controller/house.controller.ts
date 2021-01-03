import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { HouseService } from '../service/house.service';
import { CreateHouseDto } from '../dto/create-house.dto';
import { UpdateHouseDto } from '../dto/update-house.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Landlord } from 'src/landlord/model/landlord.model';
import { Tenant } from 'src/tenant/model/tenant.model';

@ApiTags('house')
@ApiBearerAuth()
@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Post()
  public async create(@Res() res, @Body() createHouseDto: CreateHouseDto) {
    try {
      const house = await this.houseService.create(createHouseDto);
      return res.status(201).send(house);
    } catch (e) {
      return res.status(400).send(e);
    }
  }

  @Get()
  findAll(@Body() user: Landlord | Tenant) {
    console.log(user);
    return this.houseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.houseService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateHouseDto: UpdateHouseDto) {
    return this.houseService.update(+id, updateHouseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.houseService.remove(+id);
  }
}
