import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    const cookieParser = require('cookie-parser');
    app.use(cookieParser());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("flujo completo: login → refresh → logout", async () => {

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: "test@example.com", password: "123456" })
      .expect(200);

    const cookie = loginResponse.headers["set-cookie"][0]; // <--- FIX

    const refreshResponse = await request(app.getHttpServer())
      .post('/auth/refresh')
      .set("Cookie", cookie)  // <--- FIX
      .expect(200);

    console.log("Refresh response body:", refreshResponse.body);

    await request(app.getHttpServer())
      .post('/auth/logout')
      .set("Cookie", cookie)
      .expect(200);
  });

});
