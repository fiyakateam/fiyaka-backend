import { TenantEntity } from 'src/tenant/dto/tenantentity.dto';

export class HouseEntity {
  _id: string;
  name: string;
  address: string;
  occupant: TenantEntity;
}
