import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @Roles("admin")
  @ApiOperation({ summary: 'Crear un usuario nuevo' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  async create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }
  
  @Get()
  @Roles("admin", "analyst")
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(":email")
  @Roles("admin", "analyst")
  @ApiOperation({ summary: 'Obtener un usuario por Email' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  async findByEmail(@Param("email") email: string) {
    return this.usersService.findByEmail(email)
  }

  @Get(':id')
  @Roles("admin", "analyst")
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  async findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  @Roles("admin")
  @ApiOperation({ summary: "Modificar un usuario"})
  @ApiResponse({ status: 200, description: 'Usuario modificado' })
  async update(@Param("id") id:number, @Body("updateUserDto")updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles("admin")
  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado' })
  async remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
