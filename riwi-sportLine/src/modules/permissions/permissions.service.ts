import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  create(createPermissionDto: CreatePermissionDto) {
    const newPermission = {
      ...createPermissionDto,
      id: Date.now(),
    };
    return `This action adds a new permission with data: ${JSON.stringify(newPermission)}`;
  }

  findAll() {
    return this.permissionRepository.find();
  }

  findOne(id: number) {
    return this.permissionRepository.findOneBy({ id });
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const updatedPermission = {
      id,
      ...updatePermissionDto,
    };
    return `This action updates a #${id} permission with data: ${JSON.stringify(updatedPermission)}`;
  }

  remove(id: number) {
    return this.permissionRepository.delete(id);
  }
}
