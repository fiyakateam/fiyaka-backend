import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/service/auth.service';
import { LandlordService } from 'src/landlord/service/landlord.service';
import { TenantService } from 'src/tenant/service/tenant.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly landlordService: LandlordService,
    private readonly tenantService: TenantService,
    private readonly authService: AuthService
  ) {}
  async use(req: any, res: any, next: () => void) {
    const token = req.header('Authorization')?.replace('Bearer ', '') as string;
    const decoded = this.authService.verifyToken(token);
    if (!decoded || !decoded.role) {
      throw new UnauthorizedException();
    }

    try {
      const user =
        decoded.role === 'landlord'
          ? await this.landlordService.findOne(decoded._id)
          : await this.tenantService.findOne(decoded._id);
      req.body.user = user;
    } catch (e) {
      throw new UnauthorizedException();
    }

    next();
  }
}
