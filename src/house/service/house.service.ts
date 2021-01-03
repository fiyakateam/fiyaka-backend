import { Dependencies, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LandlordService } from 'src/landlord/service/landlord.service';
import { Tenant } from 'src/tenant/model/tenant.model';
import { CreateHouseDto } from '../dto/create-house.dto';
import { UpdateHouseDto } from '../dto/update-house.dto';
import { House, IHouse } from '../model/house.model';

@Injectable()
@Dependencies(LandlordService)
export class HouseService {
  constructor(
    @InjectModel('House') private readonly houseModel: Model<House>,
    @InjectModel('Tenant') private readonly tenantModel: Model<Tenant>
  ) {}

  public async create(
    createHouseDto: CreateHouseDto,
    landlordId: string
  ): Promise<IHouse> {
    const newHouse = new this.houseModel({
      name: createHouseDto.name,
      address: createHouseDto.address,
      currentRentalContract: undefined,
      _occupant: undefined,
      _owner: landlordId,
    });
    return newHouse.save();
  }

  public async findAll(landlordId: string) {
    const houses = await this.houseModel.find({ _owner: landlordId });
    return houses;
  }

  public async findOne(
    id: string,
    userId: string,
    userRole: string
  ): Promise<House> {
    const house =
      userRole === 'landlord'
        ? await this.houseModel.findOne({ _id: id, _owner: userId })
        : await this.houseModel.findOne({ _id: id, _occupant: userId });

    return house;
  }

  public async update(
    id: string,
    updateHouseDto: UpdateHouseDto,
    userId: string
  ): Promise<IHouse> {
    const house = await this.houseModel.findOneAndUpdate(
      {
        _id: id,
        _owner: userId,
      },
      updateHouseDto
    );

    return house;
  }

  public async remove(id: string, userId: string): Promise<any> {
    const deletedHouse = await this.houseModel.findOneAndDelete({
      _id: id,
      _owner: userId,
    });

    return deletedHouse;
  }

  public async assign(id: string, tenantId: string): Promise<any> {
    const house = await this.houseModel.findOne({ _id: id });
    house.set('_occupant', tenantId);
    await house.save();

    const tenant = await this.tenantModel.findOne({ _id: tenantId });
    tenant.set('_house', id);
    return tenant.save();
  }
}
