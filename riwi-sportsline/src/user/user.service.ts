import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import { Role } from '../roles/entities/role.entity';
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto):Promise<User> {
    const role = await this.roleRepo.findOne({where:{ id: createUserDto.roleId}})
    if(!role) throw new NotFoundException("Rol no encontrado");

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepo.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
      role,
    })

    return this.userRepo.save(user);
  };

  async findAll():Promise<User[]> {
    return this.userRepo.find();
  }

  async findOne(id: number): Promise<User> {
  const user = await this.userRepo.findOneBy({ id });
  if (!user) {
    throw new NotFoundException("Usuario no encontrado");
  }
  return user;
}

  async update(id: number, updateUserDto: UpdateUserDto):Promise<User> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10)
    }
    await this.userRepo.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number):Promise<void> {
    const user = await this.userRepo.findOneBy({id})
    if (!user) {
      throw new NotFoundException("Usuario no encontrado");
    }
    await this.userRepo.remove(user);
  }

  async findByEmail(email:string):Promise<User> {
    const user = await this.userRepo.findOne({where: {email}})
    if (!user) {
      throw new NotFoundException("Usuario no encontrado")
    }
    return user;
  }

  async createGoogleUser(email: string, name: string):Promise<User> {
    const defaultRole = await this.roleRepo.findOne({where: { name: "analyst"}})

    if (!defaultRole) {
      throw new NotFoundException("El rol por defecto no existe en la DB")
    }

    const user = this.userRepo.create({
      name,
      email,
      password: "",
      role: defaultRole,
    })

    return this.userRepo.save(user);
  }
}
