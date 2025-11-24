import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

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
    const accessToken = await this.jwtService.sign(payload, {expiresIn: "15m"});
    const refreshToken = await this.jwtService.sign(payload, {expiresIn: "7d"});
    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.usersService.findOne(payload.sub);

      if (!user) throw new UnauthorizedException("invalid refresh token");

      const newAccessToken =  this.jwtService.sign(
        {sub: user.id, role: user.role, email: user.email},
        {expiresIn: "15m"},
      );

      return {accessToken: newAccessToken};
    } catch {
      throw new UnauthorizedException("Invalid refresh token")
    }
  }
}
