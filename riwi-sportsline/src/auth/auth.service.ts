import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UsuarioService } from '../usuario/usuario.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const usuario = await this.usuarioService.findByEmail(email);
    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, usuario.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (!usuario.activo) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = usuario;
    return result;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    const payload = {
      sub: user.id,
      email: user.email,
      rol: user.rol,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret:
        this.configService.get<string>('jwt.refreshSecret') ||
        this.configService.get<string>('jwt.secret'),
      expiresIn: '7d',
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        rol: user.rol,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usuarioService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new BadRequestException('El email ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const usuario = await this.usuarioService.create({
      ...registerDto,
      password: hashedPassword,
      rol: registerDto.rol || 'cliente',
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = usuario;
    return result;
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret:
          this.configService.get<string>('jwt.refreshSecret') ||
          this.configService.get<string>('jwt.secret'),
      });

      const user = await this.usuarioService.findOne(payload.sub);
      if (!user || !user.activo) {
        throw new UnauthorizedException('Usuario inválido');
      }

      const newPayload = {
        sub: user.id,
        email: user.email,
        rol: user.rol,
      };

      const accessToken = this.jwtService.sign(newPayload);

      return {
        access_token: accessToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Token de refresco inválido');
    }
  }

  async googleLogin(googleUser: any) {
    let usuario = await this.usuarioService.findByEmail(googleUser.email);

    if (!usuario) {
      // Crear usuario si no existe
      usuario = await this.usuarioService.create({
        email: googleUser.email,
        nombre: googleUser.nombre,
        apellido: googleUser.apellido,
        password: '', // No se usa password con OAuth
        rol: 'cliente',
      });
    }

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret:
        this.configService.get<string>('jwt.refreshSecret') ||
        this.configService.get<string>('jwt.secret'),
      expiresIn: '7d',
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        rol: usuario.rol,
      },
    };
  }
}
