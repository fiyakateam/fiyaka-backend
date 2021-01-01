import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LandlordModule } from 'src/landlord/landlord.module';
import { TenantModule } from 'src/tenant/tenant.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [LandlordModule, TenantModule],
})
export class AuthModule {}
