import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    return this.userRepo.save(user)
  }

  async findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number) {
    return this.userRepo.findOneBy({id});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepo.update(id,updateUserDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }

  async findByEmail(email:string){
    const user = await this.userRepo.findOne({where: {email}})
    return user
  }
}
