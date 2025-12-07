import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
  ) {}
  create(createRoleDto: CreateRoleDto) {
    const newRole = {
      ...createRoleDto,
      id: Date.now(),
    };
    return `This action adds a new role with data: ${JSON.stringify(newRole)}`;
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    const updatedRole = {
      id,
      ...updateRoleDto,
    };
    return `This action updates a #${id} role with data: ${JSON.stringify(updatedRole)}`;
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
