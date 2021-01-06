import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { LandlordService } from '../../landlord/service/landlord.service';
import { TenantService } from '../../tenant/service/tenant.service';
import { AuthService } from '../service/auth.service';

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
      req.user = user;
    } catch (e) {
      throw new UnauthorizedException();
    }

    next();
  }
}
