import { Module } from '@nestjs/common';
import { RolesPermissionsService } from './roles-permissions.service';
import { RolesPermissionsController } from './roles-permissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesPermission } from './entities/roles-permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolesPermission])],
  controllers: [RolesPermissionsController],
  providers: [RolesPermissionsService],
  exports: [RolesPermissionsService],
})
export class RolesPermissionsModule {}
