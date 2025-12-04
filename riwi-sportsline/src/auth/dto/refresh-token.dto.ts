import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString({ message: 'El refresh_token debe ser un string' })
  refresh_token: string;
}
