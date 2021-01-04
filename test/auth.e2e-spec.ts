import * as request from 'supertest';
import * as mongoose from 'mongoose';
import env from 'config/env';
import { AuthPostReq } from 'src/auth/dto/auth-post.dto';
import { HttpStatus } from '@nestjs/common';
import { CreateLandlordDto } from 'src/landlord/dto/create-landlord.dto';

const app = `http://localhost:${env.port}`;

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

  const user2: CreateLandlordDto = {
    name: 'name2',
    email: 'test@example',
    password: 'testpass12',
  };

  const user3: CreateLandlordDto = {
    name: 'name3',
    email: 'test@example.com',
    password: 'tes',
  };

  let userToken: string;

  it('Should register user', () => {
    return request(app)
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
    return request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user2)
      .expect(({ body }) => {
        expect(body.token).toBeUndefined();
        expect(body.constraints.isEmail).toBe('email must be an email');
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('Should not register user with short password', () => {
    return request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user3)
      .expect(({ body }) => {
        expect(body.token).toBeUndefined();
        expect(body.constraints.MinLength).toBe(
          'password must be longer than or equal to 8 characters'
        );
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('Should not register existing user', () => {
    return request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user1)
      .expect(({ body }) => {
        expect(body.token).toBeUndefined();
        expect(body.message).toBe('Email is already in use');
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('Should login user', () => {
    return request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(user1Log)
      .expect(({ body }) => {
        expect(body.token).toBe(userToken);
      });
  });
});
