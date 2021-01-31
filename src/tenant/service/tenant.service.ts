import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTenantReq, CreateTenantRes } from '../dto/tenant-post.dto';
import { TenantEntity } from '../dto/tenantentity.dto';
import { UpdateTenantDto } from '../dto/update-tenant.dto';
import { Tenant } from '../model/tenant.model';
import { hash } from 'bcrypt';
import { Conversation } from '../../chat/model/conversation.model';
@Injectable()
export class TenantService {
  constructor(
    @InjectModel('Tenant') private readonly tenantModel: Model<Tenant>,
    @InjectModel('Conversation')
    private readonly conversationModel: Model<Conversation>
  ) {}
  async create(
    landlordid: string,
    createTenantDto: CreateTenantReq
  ): Promise<CreateTenantRes> {
    if (await this.findOneEmail(createTenantDto.email)) {
      throw new BadRequestException('This email is already in use');
    }

    const password = Math.random().toString(16).substr(2, 8);
    const hashed = await hash(password, 8);
    const tenant = new this.tenantModel({
      ...createTenantDto,
      password: hashed,
      _landlord: landlordid,
    });
    try {
      const tenantData = await tenant.save();
      await this.createConversation(landlordid, tenantData.id);
      return {
        tenant: this.sanitize(tenantData),
        password,
      };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async createConversation(
    landlord: string,
    tenant: string
  ): Promise<Conversation> {
    const conv = new this.conversationModel({ landlord, tenant, messages: [] });
    return conv.save();
  }

  async findAll(landlordid: string): Promise<TenantEntity[] | undefined> {
    const tenants = await this.tenantModel.find({ _landlord: landlordid });
    return tenants.map((tenant) => this.sanitize(tenant));
  }

  async findOne(id: string): Promise<TenantEntity | undefined> {
    const tenant = await this.tenantModel.findOne({ _id: id });
    if (!tenant) return;
    return this.sanitize(tenant);
  }

  async findOneEmail(email: string): Promise<Tenant> {
    const tenant = await this.tenantModel.findOne({ email });
    return tenant;
  }

  async update(
    id: string,
    updateTenantDto: UpdateTenantDto
  ): Promise<TenantEntity | undefined> {
    const updated = await this.tenantModel.findOneAndUpdate(
      { _id: id },
      updateTenantDto,
      { new: true }
    );
    return this.sanitize(updated);
  }

  async remove(id: string): Promise<TenantEntity | undefined> {
    const deleted = await this.tenantModel.findOneAndRemove(
      { _id: id },
      { useFindAndModify: true }
    );
    return this.sanitize(deleted);
  }
  private sanitize(tenant: Tenant): TenantEntity {
    return {
      id: tenant._id,
      name: tenant.name,
      email: tenant.email,
      landlord: tenant._landlord,
      description: tenant.description,
    };
  }
}
