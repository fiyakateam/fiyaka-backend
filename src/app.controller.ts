import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  landing(): string {
    return 'Docs @: <a href="/docs">/docs</a>';
  }
}
