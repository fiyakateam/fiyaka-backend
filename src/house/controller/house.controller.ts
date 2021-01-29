import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
  ForbiddenException,
  NotFoundException,
  Patch,
  BadRequestException,
} from '@nestjs/common';
import { HouseService } from '../service/house.service';
import { CreateHouseDto } from '../dto/create-house.dto';
import { UpdateHouseDto } from '../dto/update-house.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HouseEntity } from '../dto/houseentity.dto';
import { Tenant } from '../../tenant/model/tenant.model';

@ApiTags('house')
@ApiBearerAuth()
@Controller('house')
export class HouseController {
  constructor(
    private readonly houseService: HouseService,
    @InjectModel('Tenant') private readonly tenantModel: Model<Tenant>
  ) {}

  @Post()
  public async create(@Body() createHouseDto: CreateHouseDto, @Req() req) {
    if (req.user.role === 'tenant') {
      throw new ForbiddenException(`User #${req.user._id} is not a landlord`);
    }

    const house = await this.houseService.create(createHouseDto, req.user._id);
    return house;
  }

  @Get()
  public async findAll(@Req() req) {
    if (req.user.role === 'tenant') {
      throw new ForbiddenException(`User #${req.user._id} is not a landlord`);
    }

    const houses = await this.houseService.findAll(req.user._id);

    if (!houses) {
      throw new NotFoundException(`Houses not found`);
    }
    return houses;
  }

  @Get(':id')
  public async findOne(
    @Param('id') id: string,
    @Req() req
  ): Promise<HouseEntity> {
    const house = await this.houseService.findOne(
      id,
      req.user._id,
      req.user.role
    );

    if (!house) {
      throw new NotFoundException(`House #${id} not found`);
    }

    return house;
  }

  @Put(':id')
  public async update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateHouseDto: UpdateHouseDto
  ) {
    if (req.user.role === 'tenant') {
      throw new ForbiddenException(`User #${req.user._id} is not a landlord`);
    }

    const house = await this.houseService.update(
      id,
      updateHouseDto,
      req.user._id
    );

    if (!house) {
      throw new NotFoundException(`House #${id} not found on User`);
    }

    return house;
  }

  @Delete(':id')
  public async remove(@Param('id') id: string, @Req() req) {
    if (req.user.role === 'tenant') {
      throw new ForbiddenException(`User #${req.user._id} is not a landlord`);
    }

    const house = await this.houseService.remove(id, req.user._id);

    if (!house) {
      throw new NotFoundException(`House #${id} not found on User`);
    }

    return house;
  }

  @Patch(':id/tenant')
  public async assign(
    @Param('id') id: string,
    @Req() req,
    @Body() updateHouseDto: UpdateHouseDto
  ) {
    if (req.user.role === 'tenant') {
      throw new ForbiddenException(`User #${req.user._id} is not a landlord`);
    }

    if (!updateHouseDto._occupant) {
      throw new BadRequestException(
        `Occupant is not provivded for house #${id}`
      );
    }

    const tenant = await this.tenantModel.findOne({
      _id: updateHouseDto._occupant,
      _landlord: req.user._id,
    });

    if (!tenant) {
      throw new NotFoundException(
        `Tenant #${updateHouseDto._occupant} not found on Landlord`
      );
    }

    const house = await this.houseService.findOne(id, req.user._id, 'landlord');

    if (!house) {
      throw new NotFoundException(`House #${id} not found on Landlord`);
    }

    const newHouse = await this.houseService.assign(
      id,
      updateHouseDto._occupant
    );
    return newHouse;
  }
}
