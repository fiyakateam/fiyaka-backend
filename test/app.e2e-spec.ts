import env from '../config/env';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { root } from './constants';

describe('ROOT', () => {
  let app: INestApplication;
  beforeAll(async () => {
    /*     const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init(); */
  });
  afterAll(async () => {
    //await app.close();
  });
  it('should ping', () => {
    return request(root)
      .get('/')
      .expect(200)
      .expect(`Docs @: <a href="/${env.swaggerPath}">/docs</a>`);
  });
});
