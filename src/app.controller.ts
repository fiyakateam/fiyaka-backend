import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import env from '../config/env';

@ApiTags('other')
@Controller()
export class AppController {
  @Get()
  landing(): string {
    return `Docs @: <a href="/${env.swaggerPath}">/docs</a>`;
  }
}
