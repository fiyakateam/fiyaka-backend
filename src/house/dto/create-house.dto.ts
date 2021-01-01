import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateHouseDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly address: string;

  readonly currentRentalContract: Buffer;

  @IsString()
  readonly _occupant: string;

  @IsString()
  @IsNotEmpty()
  readonly _owner: string;
}
