import {
  IsEmail,
  IsString,
  IsOptional,
  IsBoolean,
  IsDateString,
  MaxLength,
  IsUUID,
} from 'class-validator';

export class CreateClienteDto {
  @IsString({ message: 'El nombre debe ser un string' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  nombre: string;

  @IsOptional()
  @IsString({ message: 'El apellido debe ser un string' })
  @MaxLength(100, { message: 'El apellido no puede exceder 100 caracteres' })
  apellido?: string;

  @IsEmail({}, { message: 'El email debe ser válido' })
  @MaxLength(100, { message: 'El email no puede exceder 100 caracteres' })
  email: string;

  @IsOptional()
  @IsString({ message: 'El teléfono debe ser un string' })
  @MaxLength(20, { message: 'El teléfono no puede exceder 20 caracteres' })
  telefono?: string;

  @IsOptional()
  @IsString({ message: 'La dirección debe ser un string' })
  @MaxLength(200, { message: 'La dirección no puede exceder 200 caracteres' })
  direccion?: string;

  @IsOptional()
  @IsString({ message: 'La ciudad debe ser un string' })
  @MaxLength(100, { message: 'La ciudad no puede exceder 100 caracteres' })
  ciudad?: string;

  @IsOptional()
  @IsString({ message: 'El código postal debe ser un string' })
  @MaxLength(10, { message: 'El código postal no puede exceder 10 caracteres' })
  codigoPostal?: string;

  @IsOptional()
  @IsString({ message: 'El país debe ser un string' })
  @MaxLength(100, { message: 'El país no puede exceder 100 caracteres' })
  pais?: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de nacimiento debe ser una fecha válida' })
  fechaNacimiento?: string;

  @IsOptional()
  @IsBoolean({ message: 'El campo activo debe ser un booleano' })
  activo?: boolean;

  @IsOptional()
  @IsUUID('4', { message: 'El usuario_id debe ser un UUID válido' })
  usuario_id?: string;
}
