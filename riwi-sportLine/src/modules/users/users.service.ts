import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  private readonly BCRYPT_ROUNDS = 10;
  private readonly USER_RELATIONS = [
    'roles',
    'roles.role',
    'roles.role.permissions',
    'roles.role.permissions.permission',
  ];

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // create user
  async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log(`Creando usuario: ${createUserDto.email}`);

    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      this.logger.warn(`Email ya registrado: ${createUserDto.email}`);
      throw new ConflictException('El email ya está registrado');
    }

    const hashedPassword = await this.hashPassword(createUserDto.password);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);
    this.logger.log(`Usuario creado: ${savedUser.email} (ID: ${savedUser.id})`);

    return savedUser;
  }

  // get all users
  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['roles', 'roles.role'],
    });
  }

  // get user by id
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: this.USER_RELATIONS,
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return user;
  }

  // get user by id (string)
  async findByUserId(id: string): Promise<User | null> {
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      throw new BadRequestException('ID de usuario inválido');
    }

    return await this.userRepository.findOne({
      where: { id: numericId },
      relations: this.USER_RELATIONS,
    });
  }

  // get user by email
  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
      relations: this.USER_RELATIONS,
    });
  }

  // update user
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    this.logger.log(`Actualizando usuario ID: ${id}`);

    const user = await this.findOne(id);

    if (updateUserDto.password) {
      updateUserDto.password = await this.hashPassword(updateUserDto.password);
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });

      if (existingUser) {
        throw new ConflictException('El email ya está en uso');
      }
    }

    await this.userRepository.update(id, updateUserDto);

    this.logger.log(`Usuario actualizado: ID ${id}`);
    return await this.findOne(id);
  }

  // delete user
  async remove(id: number): Promise<void> {
    this.logger.log(`Eliminando usuario ID: ${id}`);

    await this.findOne(id);

    await this.userRepository.delete(id);
    this.logger.log(`Usuario eliminado: ID ${id}`);
  }

  // hash password
  private async hashPassword(password: string): Promise<string> {
    return await hash(password, this.BCRYPT_ROUNDS);
  }
}
