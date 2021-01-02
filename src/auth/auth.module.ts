import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { LandlordModule } from 'src/landlord/landlord.module';
import { TenantModule } from 'src/tenant/tenant.module';
import { JwtModule } from '@nestjs/jwt';
import env from 'config/env';
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
