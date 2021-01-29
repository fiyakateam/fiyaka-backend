import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { root, database } from './constants';
import { CreateTenantReq } from '../src/tenant/dto/tenant-post.dto';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { UpdateTenantDto } from '../src/tenant/dto/update-tenant.dto';
import { CreateLandlordDto } from '../src/landlord/dto/create-landlord.dto';
import axios from 'axios';

describe('TENANT', () => {
  const tenant1: CreateTenantReq = {
    name: 'testtenant',
    email: 'testtenant@gmail.com',
  };
  const updateTenant: UpdateTenantDto = {
    name: 'changedtenant',
  };

  const landlord: CreateLandlordDto = {
    name: 'landlord',
    email: 'landlord@gmail.com',
    password: 'landlordpass',
  };

  let tenantid: string;
  let landlordToken: string;

  let app: INestApplication;

  beforeAll(async () => {
    await mongoose.connect(database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    await mongoose.connection.db.dropDatabase();

    /*     const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
 */

    const {
      data: { token },
    } = await axios.post(`${root}/auth/register`, landlord);

    landlordToken = token;
  });

  afterAll(async () => {
    await mongoose.disconnect();
    //await app.close();
  });

  it('Should register a tenant', () => {
    return request(root)
      .post('/tenant')
      .set('Authorization', `Bearer ${landlordToken}`)
      .set('Accept', 'application/json')
      .send(tenant1)
      .expect((res) => {
        tenantid = res.body.tenant.id;
      })
      .expect(HttpStatus.CREATED);
  });
  it('Should not register an existent tenant', () => {
    return request(root)
      .post('/tenant')
      .set('Authorization', `Bearer ${landlordToken}`)
      .set('Accept', 'application/json')
      .send(tenant1)

      .expect(HttpStatus.BAD_REQUEST);
  });
  it('Should get all tenants of the jwt owner landlord', () => {
    return request(root)
      .get('/tenant')
      .set('Authorization', `Bearer ${landlordToken}`)
      .set('Accept', 'application/json')
      .send(tenant1)
      .expect(HttpStatus.OK);
  });
  it('Should get the tenant with given id', () => {
    return request(root)
      .get(`/tenant/${tenantid}`)
      .set('Authorization', `Bearer ${landlordToken}`)
      .set('Accept', 'application/json')
      .send(tenant1)
      .expect(HttpStatus.OK);
  });
  it('Should update the tenant with given id', () => {
    return request(root)
      .put(`/tenant/${tenantid}`)
      .set('Authorization', `Bearer ${landlordToken}`)
      .set('Accept', 'application/json')
      .send(updateTenant)
      .expect(HttpStatus.OK);
  });
  it('Should delete the tenant with given id', () => {
    return request(root)
      .delete(`/tenant/${tenantid}`)
      .set('Authorization', `Bearer ${landlordToken}`)
      .set('Accept', 'application/json')
      .expect(HttpStatus.OK);
  });
});
