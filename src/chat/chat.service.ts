import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/service/auth.service';

@Injectable()
export class ChatService {
  constructor(private readonly authService: AuthService) {}
}
