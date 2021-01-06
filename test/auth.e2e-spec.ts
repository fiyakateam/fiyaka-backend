import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { root, database } from './constants';
import { AuthPostReq } from 'src/auth/dto/auth-post.dto';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { CreateLandlordDto } from 'src/landlord/dto/create-landlord.dto';

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

describe('AUTH', () => {
  /*let app: INestApplication;
  beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [AppModule],
      }).compile();
      app = moduleFixture.createNestApplication();
      app.enableShutdownHooks();
      app.useGlobalPipes(new ValidationPipe());
      await app.init();
  });
  afterAll(async () => {
      await app.close();
  });*/

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

  it('Should register user', () => {
    return request(root)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user1)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        userToken = body.token;
      })
      .expect(HttpStatus.CREATED);
  });

  it('Should not register user with invalid email', () => {
    return request(root)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user2)
      .expect(({ body }) => {
        expect(body.token).toBeUndefined();
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('Should not register user with short password', () => {
    return request(root)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user3)
      .expect(({ body }) => {
        expect(body.token).toBeUndefined();
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('Should not register existing user', () => {
    return request(root)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user1)
      .expect(({ body }) => {
        expect(body.token).toBeUndefined();
        expect(body.message).toEqual('Email is already in use');
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('Should login user and return correct token', () => {
    return request(root)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(user1Log)
      .expect(({ body }) => {
        expect(body.token).toEqual(userToken);
      })
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
