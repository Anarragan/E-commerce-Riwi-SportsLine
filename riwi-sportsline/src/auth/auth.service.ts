import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? user : null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException("Invalid Credentials");

    const payload = { sub: user.id, role: user.role.name, email: user.email };

    const accessToken = this.jwtService.sign(payload, { 
      secret: process.env.JWT_SECRET,
      expiresIn: "15m",
    });
    const refreshToken = this.jwtService.sign(payload, { 
      secret: process.env.JWT_SECRET,
      expiresIn: "7d",
    });

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, { secret: process.env.JWT_SECRET });
      const user = await this.usersService.findOne(payload.sub);

      if (!user) throw new UnauthorizedException("Invalid refresh token");

      const newAccessToken = this.jwtService.sign(
        { sub: user.id, role: user.role.name, email: user.email },
        { secret: process.env.JWT_SECRET, expiresIn: "15m" },
      );

      return { accessToken: newAccessToken };
    } catch {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }

  async loginWithGoogle(googleUser: { email: string; name: string }) {
    let user: User;
    try {
      user = await this.usersService.findByEmail(googleUser.email);
    } catch {
      user = await this.usersService.createGoogleUser(googleUser.email, googleUser.name);
    }

    const payload = { sub: user.id, email: user.email, role: user.role.name };

    const accessToken = this.jwtService.sign(payload, { 
      secret: process.env.JWT_SECRET,
      expiresIn: "15m",
    });
    const refreshToken = this.jwtService.sign(payload, { 
      secret: process.env.JWT_SECRET,
      expiresIn: "7d",
    });

    return { accessToken, refreshToken };
  }
}
