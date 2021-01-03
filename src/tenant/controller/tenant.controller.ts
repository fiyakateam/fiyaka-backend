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
} from '@nestjs/common';
import { TenantService } from '../service/tenant.service';
import { CreateTenantReq, CreateTenantRes } from '../dto/tenant-post.dto';
import { UpdateTenantDto } from '../dto/update-tenant.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Landlord } from 'src/landlord/model/landlord.model';
import { Tenant } from '../model/tenant.model';

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
  async findOne(@Param('id') id: string) {
    return await this.tenantService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTenantDto: UpdateTenantDto
  ) {
    return await this.tenantService.update(id, updateTenantDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.tenantService.remove(id);
  }
}
