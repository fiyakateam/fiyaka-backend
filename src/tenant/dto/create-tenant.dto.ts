import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

export class CreateTenantDto extends CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly _landlord: string;

  @IsString()
  readonly _house: string;
}
