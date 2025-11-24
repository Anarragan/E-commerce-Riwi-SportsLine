import { Controller, Get, Req } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  
  // 🔹 Endpoint público (no requiere token)
  @Public()
  @Get('public')
  @ApiOperation({ summary: 'Endpoint público' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve un mensaje indicando que no requiere autenticación',
    content: {
      'application/json': {
        example: { message: 'Este endpoint es público, no requiere autenticación.' }
      }
    }
  })
  getPublic() {
    return { message: 'Este endpoint es público, no requiere autenticación.' };
  }

  // 🔹 Endpoint protegido (requiere token válido)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Perfil del usuario autenticado' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve el payload del JWT (id, role, email)',
    content: {
      'application/json': {
        example: {
          message: 'Perfil del usuario autenticado',
          user: { id: 1, email: 'admin@example.com', role: 'admin' }
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Token inválido o ausente' })
  getProfile(@Req() req) {
    return {
      message: 'Perfil del usuario autenticado',
      user: req.user, // payload del JWT (id, role, email)
    };
  }

  // 🔹 Endpoint restringido a ADMIN
  @Roles('admin')
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todos los usuarios (solo ADMIN)' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios (solo accesible para ADMIN)',
    content: {
      'application/json': {
        example: { message: 'Solo los ADMIN pueden ver todos los usuarios.' }
      }
    }
  })
  @ApiResponse({ status: 403, description: 'Acceso denegado (rol insuficiente)' })
  findAll() {
    return { message: 'Solo los ADMIN pueden ver todos los usuarios.' };
  }
}
