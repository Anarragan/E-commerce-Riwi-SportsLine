import {
  Controller,
  Body,
  Post,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LogginDto } from '../dto/loggin.dto';
import { RegisterDto } from '../dto/register.dto';
import { RefreshJwtGuard } from 'src/common/guards/refresh-jwt.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso. Retorna accessToken y refreshToken',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  async login(@Body() logginDto: LogginDto) {
    try {
      this.logger.log(`Solicitud de login recibida para: ${logginDto.email}`);
      const result = await this.authService.login(logginDto);
      this.logger.log(`Login exitoso para: ${logginDto.email}`);
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.logger.error(`Error en login: ${errorMessage}`);
      throw error;
    }
  }

  @Post('register')
  @ApiOperation({ summary: 'Registrar nuevo usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado exitosamente',
    schema: {
      example: {
        user: {
          id: 1,
          name: 'Juan Pérez',
          email: 'juan@ejemplo.com',
          createdAt: '2024-01-01T00:00:00.000Z',
        },
        message: 'User registered successfully',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Refrescar token de acceso' })
  @ApiResponse({
    status: 201,
    description: 'Token refrescado exitosamente',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Token de refresco inválido' })
  async refreshToken(@Request() req: { user: { sub: string } }) {
    return this.authService.refreshToken(req.user.sub);
  }
}
