import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app;
  let token: string;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('[POST] /auth/login', done => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'chris', password: 'secret' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        token = res.body.access_token;
        expect(res.body.access_token).toBeDefined();
        done();
      });
  });
  it('[GET] /profile', done => {
    return request(app.getHttpServer())
      .get('/profile')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.body).toEqual({
          username: 'chris',
          roles: ['user'],
        });
        done();
      });
  });
});
