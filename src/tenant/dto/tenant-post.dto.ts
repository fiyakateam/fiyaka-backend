import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { TenantEntity } from './tenantentity.dto';

export class CreateTenantReq {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}

export class CreateTenantRes {
  tenant: TenantEntity;
  password: string;
}
