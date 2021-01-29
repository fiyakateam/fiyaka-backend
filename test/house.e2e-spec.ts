import * as request from 'supertest';
import * as mongoose from 'mongoose';

import { HttpStatus } from '@nestjs/common';
import { database, root } from './constants';
import { TenantEntity } from '../src/tenant/dto/tenantentity.dto';
import { UpdateHouseDto } from '../src/house/dto/update-house.dto';
import { CreateTenantReq } from '../src/tenant/dto/tenant-post.dto';
import { CreateLandlordDto } from '../src/landlord/dto/create-landlord.dto';

describe('HOUSE', () => {
  let landlordToken: string;
  let tenantid: string;

  const house1: any = {
    name: 'testhouse1',
    address: 'testhouse1address',
  };

  const house2: any = {
    name: 'testhouse2',
  };

  const landlord: CreateLandlordDto = {
    name: 'landlord',
    email: 'landlord@gmail.com',
    password: 'landlordpass',
  };

  const tenant1: CreateTenantReq = {
    name: 'tenant4',
    email: 'tenant4@example.com',
  };

  const t1: TenantEntity = {
    id: '5ff3748526e3b038b0c43e3d',
    name: 'tenant4',
    email: 'tenant4@example.com',
    landlord: '5ff3722b26e3b038b0c43e35',
    description: '',
  };

  const uh1: UpdateHouseDto = {
    _occupant: t1.id,
  };

  let h1: string;
  const dummyId = '5ff21efcc26d022bb0c50s1e';

  beforeAll(async () => {
    await mongoose.connect(database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    await mongoose.connection.db.dropDatabase();
    await request(root)
      .post('/auth/register')
      .send(landlord)
      .expect(({ body }) => {
        landlordToken = body.token;
      });

    await request(root)
      .post('/tenant')
      .set('Authorization', `Bearer ${landlordToken}`)
      .set('Accept', 'application/json')
      .send(tenant1)
      .expect((res) => {
        tenantid = res.body.tenant.id;
      });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('Should create a house', () => {
    return request(root)
      .post('/house')
      .set('Authorization', `Bearer ${landlordToken}`)
      .set('Accept', 'application/json')
      .send(house1)
      .expect(({ body }) => {
        expect(body.name).toEqual(house1.name);
        expect(body.address).toEqual(house1.address);
        h1 = body._id;
      })
      .expect(HttpStatus.CREATED);
  });

  it('Should not create a house with invalid request', () => {
    return request(root)
      .post('/house')
      .set('Authorization', `Bearer ${landlordToken}`)
      .set('Accept', 'application/json')
      .send(house2)
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('Should read the existing house', () => {
    return request(root)
      .get(`/house/${h1}`)
      .set('Authorization', `Bearer ${landlordToken}`)
      .set('Accept', 'application/json')
      .send()
      .expect(({ body }) => {
        expect(body.name).toEqual(house1.name);
        expect(body.address).toEqual(house1.address);
      })
      .expect(HttpStatus.OK);
  });

  it('Should not read non existing house', () => {
    return request(root)
      .get(`/house/${dummyId}`)
      .set('Authorization', `Bearer ${landlordToken}`)
      .set('Accept', 'application/json')
      .send()
      .expect(HttpStatus.NOT_FOUND);
  });

  it('Should update existing house', () => {
    return request(root)
      .put(`/house/${h1}`)
      .set('Authorization', `Bearer ${landlordToken}`)
      .set('Accept', 'application/json')
      .send(house2)
      .expect(HttpStatus.OK);
  });

  it('Should not update non existing house', () => {
    return request(root)
      .put(`/house/${dummyId}`)
      .set('Authorization', `Bearer ${landlordToken}`)
      .set('Accept', 'application/json')
      .send(house2)
      .expect(HttpStatus.NOT_FOUND);
  });

  it('Should assign an existing tenant to an existing house', () => {
    return request(root)
      .patch(`/house/${h1}/tenant`)
      .set('Authorization', `Bearer ${landlordToken}`)
      .set('Accept', 'application/json')
      .send({ _occupant: tenantid })
      .expect(HttpStatus.OK);
  });

  it('Should delete existing house', () => {
    return request(root)
      .delete(`/house/${h1}`)
      .set('Authorization', `Bearer ${landlordToken}`)
      .set('Accept', 'application/json')
      .send()
      .expect(HttpStatus.OK);
  });

  it('Should not delete non existing house', () => {
    return request(root)
      .delete(`/house/${h1}`)
      .set('Authorization', `Bearer ${landlordToken}`)
      .set('Accept', 'application/json')
      .send()
      .expect(HttpStatus.NOT_FOUND);
  });
});
