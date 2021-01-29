import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { TenantService } from '../service/tenant.service';
import { CreateTenantReq, CreateTenantRes } from '../dto/tenant-post.dto';
import { UpdateTenantDto } from '../dto/update-tenant.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TenantEntity } from '../dto/tenantentity.dto';

@ApiTags('tenant')
@ApiBearerAuth()
@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  async create(
    @Req() req: any,
    @Body() createTenantReq: CreateTenantReq
  ): Promise<CreateTenantRes> {
    if (req.user.role != 'landlord') {
      throw new UnauthorizedException();
    }
    if (await this.tenantService.findOneEmail(createTenantReq.email)) {
      throw new BadRequestException();
    }
    return await this.tenantService.create(req.user._id, createTenantReq);
  }

  @Get()
  async findAll(@Req() req) {
    if (req.user.role != 'landlord') {
      throw new UnauthorizedException();
    }
    return await this.tenantService.findAll(req.user._id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TenantEntity> {
    return await this.tenantService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTenantDto: UpdateTenantDto
  ): Promise<TenantEntity> {
    return await this.tenantService.update(id, updateTenantDto);
  }

  @Delete(':id')
  async remove(@Req() req: any, @Param('id') id: string): Promise<void> {
    if (req.user.role != 'landlord') {
      throw new UnauthorizedException('Not authorized for this action.');
    }
    const deleted = await this.tenantService.remove(id);
    if (!deleted) {
      throw new NotFoundException('Tenant does not exist');
    }
  }
}
