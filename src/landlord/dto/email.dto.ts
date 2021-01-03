import { PartialType } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class EmailReq {
  @IsEmail()
  to: string;
  @IsString()
  subject: string;
  @IsString()
  text: string;
}
