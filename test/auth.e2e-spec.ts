import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { database, root } from './constants';
import { AuthPostReq } from '../src/auth/dto/auth-post.dto';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { CreateLandlordDto } from '../src/landlord/dto/create-landlord.dto';
import { AppModule } from '../src/app.module';
import { Test } from '@nestjs/testing';

describe('AUTH', () => {
  const user1: CreateLandlordDto = {
    name: 'name1',
    email: 'test@example.com',
    password: 'testpass12',
  };

  const user1Log: AuthPostReq = {
    email: user1.email,
    password: user1.password,
  };

  const user1Logw: AuthPostReq = {
    email: user1.email,
    password: 'dsfgcsdfas',
  };

  const user2: CreateLandlordDto = {
    name: 'name2',
    email: 'test@example',
    password: 'testpass12',
  };

  const user2Log: AuthPostReq = {
    email: user2.email,
    password: user2.password,
  };

  const user3: CreateLandlordDto = {
    name: 'name3',
    email: 'test@example.com',
    password: 'tes',
  };

  let userToken: string;
  let app: INestApplication;

  beforeAll(async () => {
    await mongoose.connect(database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    await mongoose.connection.db.dropDatabase();

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    await mongoose.connection.db.dropDatabase();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    //await app.close();
  });

  it('Should register landlord', () => {
    return request(root)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user1)
      .expect(HttpStatus.CREATED);
  });

  it('Should not register landlord with invalid email', () => {
    return request(root)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send({
        name: 'name2',
        email: 'test@example',
        password: 'testpass12',
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('Should not register landlord with short password', () => {
    return request(root)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user3)
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('Should not register existing landlord', () => {
    return request(root)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user1)
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('Should login user and return correct token', () => {
    return request(root)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(user1Log)
      .expect(HttpStatus.CREATED);
  });

  it('Should not login user with wrong credential', () => {
    return request(root)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(user1Logw)
      .expect(HttpStatus.NOT_FOUND);
  });

  it('Should not login non existent user', () => {
    return request(root)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(user2Log)
      .expect(HttpStatus.NOT_FOUND);
  });
});
