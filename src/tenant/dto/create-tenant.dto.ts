import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateTenantDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;

  @IsBoolean()
  readonly timestamps: boolean;

  @IsNotEmpty()
  @IsString()
  readonly _landlord: string;

  @IsString()
  readonly _house: string;
}
