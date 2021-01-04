import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TenantEntity } from 'src/tenant/dto/tenantentity.dto';
import { HouseEntity } from './houseentity.dto';

export class CreateHouseDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @IsOptional()
  _occupant: string;
}
