import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../../interfaces/jwt-payload.interface';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(config: ConfigService) {
    const secret = config.get<string>('JWT_REFRESH_SECRET_KEY');
    if (!secret) {
      throw new Error(
        'JWT_REFRESH_SECRET_KEY is not defined in environment variables',
      );
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
      ignoreExpiration: false,
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
