import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])], // 👈 ¡Esto es clave!
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // opcional si usarás UserService fuera
})  
export class UserModule {}
