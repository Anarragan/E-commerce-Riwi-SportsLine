import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) return null;
    console.log("encontrado")
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      console.log("password valida")
      return user
    } else {
      console.log("invalida")
      return null;

    }


  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException("Invalid Credentials");

    const payload = { sub: user.id, role: user.role, email: user.email };
    const accessToken = await this.jwtService.sign(payload, { expiresIn: "15m" });
    const refreshToken = await this.jwtService.sign(payload, { expiresIn: "7d" });
    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.usersService.findOne(payload.sub);

      if (!user) throw new UnauthorizedException("invalid refresh token");

      const newAccessToken = this.jwtService.sign(
        { sub: user.id, role: user.role, email: user.email },
        { expiresIn: "15m" },
      );

      return { accessToken: newAccessToken };
    } catch {
      throw new UnauthorizedException("Invalid refresh token")
    }
  }

  async loginWithGoogle(googleUser: { email: string, name: string }) {
    let user: User;

    try {
      user = await this.usersService.findByEmail(googleUser.email)
    } catch {
      user = await this.usersService.createGoogleUser(googleUser.email, googleUser.name)
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role.name,
    }

    const accessToken = await this.jwtService.sign(payload, { 
      secret: process.env.JWT_SECRET,
      expiresIn: "15m",
    });
    const refreshToken = await this.jwtService.sign(payload, { 
      secret: process.env.JWT_SECRET,
      expiresIn: "7d", 
    });

    return { accessToken, refreshToken };
  }
}
