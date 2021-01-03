import { IsString } from 'class-validator';

export class AuthPostReq {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class AuthPostRes {
  @IsString()
  token: string;
}
