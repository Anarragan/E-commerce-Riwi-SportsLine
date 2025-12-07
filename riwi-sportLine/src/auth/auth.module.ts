import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/modules/users/users.module';
import { JwtStrategy } from './services/jwt.strategy';
import { RefreshStrategy } from './services/refresh.startegy';
import { RolesModule } from 'src/modules/roles/roles.module';

@Module({
  imports: [JwtModule.register({}), UsersModule, RolesModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefreshStrategy],
})
export class AuthModule {}
