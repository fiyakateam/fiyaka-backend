import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('other')
@Controller()
export class AppController {
  @Get()
  landing(): string {
    return 'Docs @: <a href="/docs">/docs</a>';
  }
}
