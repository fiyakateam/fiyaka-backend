import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateHouseDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @IsString()
  readonly _owner: string;
}
