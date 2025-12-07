import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LogginDto } from '../dto/loggin.dto';
import { RegisterDto } from '../dto/register.dto';
import { UsersService } from '../../modules/users/users.service';
import { JwtPayload } from '../../interfaces/jwt-payload.interface';
import { User } from '../../modules/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private getJwtSecret(key = 'JWT_SECRET_KEY'): string {
    const secret = this.configService.get<string>(key);
    if (!secret) throw new Error(`${key} no está definido`);
    return secret;
  }

  private mapRolesAndPermissions(user: User): {
    roles: string[];
    permissions: string[];
  } {
    const roles: string[] =
      user.roles
        ?.map(
          (ur) => ur.role?.name ?? (ur.role?.id ? String(ur.role?.id) : null),
        )
        .filter((r): r is string => !!r) ?? [];

    const permissions: string[] =
      user.roles
        // access a UsersRole -> Role -> RolesPermission
        ?.flatMap((ur) => ur.role?.permissions ?? [])
        // acces a rolesPermission -> Permission -> name
        .map((rp) => rp.permission?.name)
        // filter non-null values
        .filter((p): p is string => !!p) ?? [];

    return { roles, permissions };
  }

  async login(logginDto: LogginDto) {
    try {
      this.logger.log(`Intentando login para email: ${logginDto.email}`);
      const user = await this.usersService.findByEmail(logginDto.email);
      if (!user) {
        this.logger.warn(`Usuario no encontrado: ${logginDto.email}`);
        throw new UnauthorizedException('Email o contraseña incorrectos');
      }

      this.logger.log(`Usuario encontrado: ${user.email}, ID: ${user.id}`);

      // Validar contraseña
      const isPasswordValid = await bcrypt.compare(
        logginDto.password,
        user.password,
      );
      if (!isPasswordValid) {
        this.logger.warn(
          `Contraseña incorrecta para usuario: ${logginDto.email}`,
        );
        throw new UnauthorizedException('Email o contraseña incorrectos');
      }

      this.logger.log(`Contraseña válida para usuario: ${user.email}`);

      // Mapear roles y permisos
      const { roles, permissions } = this.mapRolesAndPermissions(user);
      this.logger.log(
        `Roles: ${JSON.stringify(roles)}, Permisos: ${JSON.stringify(permissions)}`,
      );

      const payload: JwtPayload = {
        sub: user.id,
        email: user.email,
        roles,
        permissions,
      };

      const accessToken = await this.jwt.signAsync(payload, {
        secret: this.getJwtSecret('JWT_SECRET_KEY'),
        expiresIn: '15m',
      });

      const refreshToken = await this.jwt.signAsync(
        { sub: user.id },
        {
          secret: this.getJwtSecret('JWT_REFRESH_SECRET_KEY'),
          expiresIn: '7d',
        },
      );

      this.logger.log(`Login exitoso para usuario: ${user.email}`);
      return { accessToken, refreshToken };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : '';
      this.logger.error(`Error en login: ${errorMessage}`, errorStack);
      throw error;
    }
  }

  async register(registerDto: RegisterDto) {
    try {
      this.logger.log(`Intentando registrar usuario: ${registerDto.email}`);

      const existingUser = await this.usersService.findByEmail(
        registerDto.email,
      );
      if (existingUser) {
        this.logger.warn(`Usuario ya existe: ${registerDto.email}`);
        throw new BadRequestException('El email ya está registrado');
      }

      const user = await this.usersService.create(registerDto);
      this.logger.log(`Usuario registrado exitosamente: ${user.email}`);
      return user;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : '';
      this.logger.error(`Error en registro: ${errorMessage}`, errorStack);
      throw error;
    }
  }

  async refreshToken(userId: string) {
    const user = await this.usersService.findByUserId(userId);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const { roles, permissions } = this.mapRolesAndPermissions(user);

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      roles,
      permissions,
    };

    const accessToken = await this.jwt.signAsync(payload, {
      secret: this.getJwtSecret('JWT_SECRET_KEY'),
      expiresIn: '15m',
    });
    return { accessToken };
  }
}
