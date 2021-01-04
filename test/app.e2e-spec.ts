import env from '../config/env';
import * as request from 'supertest';
import { root } from './constants';

describe('ROOT', () => {
  it('should ping', () => {
    return request(root)
      .get('/')
      .expect(200)
      .expect(`Docs @: <a href="/${env.swaggerPath}">/docs</a>`);
  });
});
