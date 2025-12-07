import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RequestLoggerMiddleware } from '../../common/middleware/request-logger.middleware';
import { Role } from '../roles/entities/role.entity';
import { UsersRole } from '../users-roles/entities/users-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, UsersRole])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes(UsersController);
  }
}
