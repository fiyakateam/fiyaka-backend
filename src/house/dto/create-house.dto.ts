import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
