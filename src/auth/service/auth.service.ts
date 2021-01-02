import {
  Dependencies,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LandlordService } from 'src/landlord/service/landlord.service';
import { TenantService } from 'src/tenant/service/tenant.service';
import { AuthPostReq, AuthPostRes } from '../dto/auth-post.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateLandlordDto } from 'src/landlord/dto/create-landlord.dto';

@Injectable()
@Dependencies(LandlordService, TenantService, JwtService)
export class AuthService {
  constructor(
    private readonly landlordService: LandlordService,
    private readonly tenantService: TenantService,
    private readonly jwtService: JwtService
  ) {}

  async register(info: CreateLandlordDto): Promise<AuthPostRes> {
    const password = await bcrypt.hash(info.password, 8);
    const landlord = await this.landlordService.create({ ...info, password });
    const token = this.generateAuthToken(landlord._id, landlord.role);
    return { token };
  }

  generateAuthToken(id: string, role: string): string {
    const token = this.jwtService.sign({ _id: id, role: role });
    return token;
  }

  verifyToken(token: string): any {
    const decoded = this.jwtService.verify(token);
    return decoded;
  }

  async findByCredentials(credentials: AuthPostReq): Promise<AuthPostRes> {
    const user =
      (await this.landlordService.findOneEmail(credentials.email)) ||
      (await this.tenantService.findOneEmail(credentials.email));
    const isMatch = await bcrypt.compare(credentials.password, user.password);
    if (!isMatch) {
      throw new NotFoundException('Email or password is wrong.');
    }
    return { token: this.generateAuthToken(user._id, user.role) };
  }
}
