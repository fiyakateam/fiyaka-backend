import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTenantDto } from '../dto/create-tenant.dto';
import { UpdateTenantDto } from '../dto/update-tenant.dto';
import { Tenant } from '../model/tenant.model';

@Injectable()
export class TenantService {
  constructor(
    @InjectModel('Tenant') private readonly tenantModel: Model<Tenant>
  ) {}
  create(createTenantDto: CreateTenantDto) {
    return 'This action adds a new tenant';
  }

  findAll() {
    return `This action returns all tenant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tenant`;
  }

  async findOneEmail(email: string): Promise<Tenant> {
    const tenant = await this.tenantModel.findOne({ email });
    if (!tenant) {
      throw new NotFoundException('Email or password is wrong');
    }
    return tenant;
  }

  update(id: number, updateTenantDto: UpdateTenantDto) {
    return `This action updates a #${id} tenant`;
  }

  remove(id: number) {
    return `This action removes a #${id} tenant`;
  }
}
