import { Injectable } from '@nestjs/common';
import { CreateUsersRoleDto } from './dto/create-users-role.dto';
import { UpdateUsersRoleDto } from './dto/update-users-role.dto';
import { UsersRole } from './entities/users-role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';

@Injectable()
export class UsersRolesService {
  constructor(
    @InjectRepository(UsersRole)
    private readonly repository: Repository<UsersRole>,
  ) {}
  create(createUsersRoleDto: CreateUsersRoleDto) {
    const newUserRole = {
      ...createUsersRoleDto,
      id: Date.now(),
    };
    return `This action adds a new usersRole with data: ${JSON.stringify(newUserRole)}`;
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  update(id: number, updateUsersRoleDto: UpdateUsersRoleDto) {
    const updatedUserRole = {
      id,
      ...updateUsersRoleDto,
    };
    return `This action updates a #${id} usersRole with data: ${JSON.stringify(updatedUserRole)}`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersRole`;
  }
}
