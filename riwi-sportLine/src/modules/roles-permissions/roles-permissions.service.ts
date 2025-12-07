import { Injectable } from '@nestjs/common';
import { CreateRolesPermissionDto } from './dto/create-roles-permission.dto';
import { UpdateRolesPermissionDto } from './dto/update-roles-permission.dto';
import { RolesPermission } from './entities/roles-permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesPermissionsService {
  constructor(private readonly repository: Repository<RolesPermission>) {}

  create(createRolesPermissionDto: CreateRolesPermissionDto) {
    const newRolesPermission = {
      ...createRolesPermissionDto,
      id: Date.now(),
    };
    return `This action adds a new rolesPermission with data: ${JSON.stringify(newRolesPermission)}`;
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  update(id: number, updateRolesPermissionDto: UpdateRolesPermissionDto) {
    const updatedRolesPermission = {
      id,
      ...updateRolesPermissionDto,
    };
    return `This action updates a #${id} rolesPermission with data: ${JSON.stringify(updatedRolesPermission)}`;
  }

  remove(id: number) {
    return `This action removes a #${id} rolesPermission`;
  }
}
