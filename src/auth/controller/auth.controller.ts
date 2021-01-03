import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateLandlordDto } from 'src/landlord/dto/create-landlord.dto';
import { AuthPostReq, AuthPostRes } from '../dto/auth-post.dto';
import { AuthService } from '../service/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async createLandlord(@Body() req: CreateLandlordDto): Promise<AuthPostRes> {
    return await this.authService.register(req);
  }

  @Post('login')
  async login(@Body() req: AuthPostReq): Promise<AuthPostRes> {
    return await this.authService.findByCredentials(req);
  }
}
