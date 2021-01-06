import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { root, database } from './constants';
import { AuthPostReq } from 'src/auth/dto/auth-post.dto';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { CreateLandlordDto } from 'src/landlord/dto/create-landlord.dto';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { CreateHouseDto } from 'src/house/dto/create-house.dto';
import { HouseEntity } from 'src/house/dto/houseentity.dto';
import { TenantEntity } from 'src/tenant/dto/tenantentity.dto';
import { CreateTenantReq } from 'src/tenant/dto/tenant-post.dto';
import { UpdateHouseDto } from 'src/house/dto/update-house.dto';

beforeAll(async () => {
  await mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  await mongoose.connection.db.dropDatabase();
});

afterAll(async (done) => {
  await mongoose.disconnect(done);
});

describe('HOUSE', () => {
  const userToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmYzNzIyYjI2ZTNiMDM4YjBjNDNlMzUiLCJyb2xlIjoibGFuZGxvcmQiLCJpYXQiOjE2MDk3ODk5OTUsImV4cCI6MTY0MTM0NzU5NX0.Ec6PiEZ5l6QCTDWWJp0rIpisnUM7VvS5LfdQoA5aRUs';

  const house1: any = {
    name: 'testhouse1',
    address: 'testhouse1address',
  };

  const house2: any = {
    name: 'testhouse2',
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

  it('Should create a house', () => {
    return request(root)
      .post('/house')
      .set('Authorization', `Bearer ${userToken}`)
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
      .set('Authorization', `Bearer ${userToken}`)
      .set('Accept', 'application/json')
      .send(house2)
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('Should read the existing house', () => {
    return request(root)
      .get('/house/' + h1)
      .set('Authorization', `Bearer ${userToken}`)
      .set('Accept', 'application/json')
      .send()
      .expect(({ body }) => {
        expect(body.name).toEqual('testhouse1');
        expect(body.address).toEqual('testhouse1address');
      })
      .expect(HttpStatus.OK);
  });

  it('Should not read non existing house', () => {
    return request(root)
      .get('/house/' + dummyId)
      .set('Authorization', `Bearer ${userToken}`)
      .set('Accept', 'application/json')
      .send()
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('Should update existing house', () => {
    return request(root)
      .put('/house/' + h1)
      .set('Authorization', `Bearer ${userToken}`)
      .set('Accept', 'application/json')
      .send()
      .expect(({ body }) => {
        expect(body._id).toEqual(h1);
      })
      .expect(HttpStatus.OK);
  });

  it('Should not update non existing house', () => {
    return request(root)
      .get('/house/' + dummyId)
      .set('Authorization', `Bearer ${userToken}`)
      .set('Accept', 'application/json')
      .send()
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('Should assign an existing tenant to an existing house', () => {
    return request(root)
      .patch('/house/' + h1 + '/tenant')
      .set('Authorization', `Bearer ${userToken}`)
      .set('Accept', 'application/json')
      .send(uh1)
      .expect(HttpStatus.OK);
  });

  it('Should delete existing house', () => {
    return request(root)
      .delete('/house/' + h1)
      .set('Authorization', `Bearer ${userToken}`)
      .set('Accept', 'application/json')
      .send()
      .expect(HttpStatus.OK);
  });

  it('Should not delete non existing house', () => {
    return request(root)
      .delete('/house/' + h1)
      .set('Authorization', `Bearer ${userToken}`)
      .set('Accept', 'application/json')
      .send()
      .expect(HttpStatus.NOT_FOUND);
  });
});
