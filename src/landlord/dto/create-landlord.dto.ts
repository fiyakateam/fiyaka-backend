import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

export class CreateLandlordDto extends CreateUserDto {
  @IsString()
  readonly _tenants: string;

  @IsString()
  readonly _houses: string;
}
