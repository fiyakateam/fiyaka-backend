import { TenantEntity } from '../../tenant/dto/tenantentity.dto';

export class HouseEntity {
  _id: string;
  name: string;
  address: string;
  occupant: TenantEntity;
}
