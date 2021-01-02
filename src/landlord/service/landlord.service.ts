import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLandlordDto } from '../dto/create-landlord.dto';
import { UpdateLandlordDto } from '../dto/update-landlord.dto';
import { ILandlord, Landlord } from '../model/landlord.model';

@Injectable()
export class LandlordService {
  constructor(
    @InjectModel('Landlord') private readonly landlordModel: Model<Landlord>
  ) {}

  public async create(
    createLandlordDto: CreateLandlordDto
  ): Promise<ILandlord> {
    const newLandlord = await new this.landlordModel(createLandlordDto);
    return newLandlord.save();
  }

  findAll() {
    return `This action returns all landlord`;
  }

  public async findOne(id: string): Promise<Landlord> {
    const landlord = await this.landlordModel.findById({ _id: id });

    if (!landlord) {
      throw new NotFoundException(`Landlord #${id} not found`);
    }
    return landlord;
  }

  update(id: string, updateLandlordDto: UpdateLandlordDto) {
    return `This action updates a #${id} landlord`;
  }

  public async remove(id: string) {
    const deletedLandlord = await this.landlordModel.findByIdAndRemove(id);
    return deletedLandlord;
  }
}
