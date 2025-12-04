import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Bienvenido a Riwi SportsLine API - Backend NestJS';
  }
}
