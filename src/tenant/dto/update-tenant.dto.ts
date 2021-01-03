import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateTenantReq } from './tenant-post.dto';

export class UpdateTenantDto extends PartialType(CreateTenantReq) {
  @IsString()
  name: string;
}
