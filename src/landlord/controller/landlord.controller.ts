import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { LandlordService } from '../service/landlord.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EmailReq } from '../dto/email.dto';

@ApiTags('landlord')
@ApiBearerAuth()
@Controller('landlord')
export class LandlordController {
  constructor(private readonly landlordService: LandlordService) {}
  @Post('email')
  async email(@Body() email: EmailReq): Promise<void> {
    if (!(await this.landlordService.sendEmail(email))) {
      throw new BadRequestException('Could not send email');
    }
  }
}
