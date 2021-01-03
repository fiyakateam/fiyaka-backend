import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LandlordService } from 'src/landlord/service/landlord.service';
import { CreateHouseDto } from '../dto/create-house.dto';
import { UpdateHouseDto } from '../dto/update-house.dto';
import { House, IHouse } from '../model/house.model';

@Injectable()
export class HouseService {
  private readonly landlordService: LandlordService;
  constructor(
    @InjectModel('House') private readonly houseModel: Model<House>
  ) {}

  public async create(createHouseDto: CreateHouseDto): Promise<IHouse> {
    const landlord = await this.landlordService.findOne(createHouseDto._owner);
    if (!landlord) {
      throw new NotFoundException(
        `Landlord #${createHouseDto._owner} not found`
      );
    }
    const newHouse = new this.houseModel(createHouseDto);
    return newHouse.save();
  }

  findAll() {
    return `This action returns all house`;
  }

  public async findOne(id: string): Promise<House> {
    const house = await this.houseModel.findById({ _id: id });

    if (!house) {
      throw new NotFoundException(`House #${id} not found`);
    }
    return house;
  }

  update(id: number, updateHouseDto: UpdateHouseDto) {
    return `This action updates a #${id} house`;
  }

  remove(id: number) {
    return `This action removes a #${id} house`;
  }
}
