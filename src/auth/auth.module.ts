import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import env from '../../config/env';
import { LandlordModule } from '../landlord/landlord.module';
import { TenantModule } from '../tenant/tenant.module';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    LandlordModule,
    TenantModule,
    JwtModule.register({
      secret: env.jwtSecret,
      signOptions: { expiresIn: '1y' },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
