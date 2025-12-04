import {
  IsString,
  IsNumber,
  IsInt,
  Min,
  IsOptional,
  IsBoolean,
  MaxLength,
  IsPositive,
} from 'class-validator';

export class CreateProductoDto {
  @IsString({ message: 'El nombre debe ser un string' })
  @MaxLength(200, { message: 'El nombre no puede exceder 200 caracteres' })
  nombre: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser un string' })
  descripcion?: string;

  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio debe ser positivo' })
  @Min(0.01, { message: 'El precio debe ser mayor a 0' })
  precio: number;

  @IsInt({ message: 'El stock debe ser un número entero' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  stock: number;

  @IsOptional()
  @IsString({ message: 'La categoría debe ser un string' })
  @MaxLength(100, { message: 'La categoría no puede exceder 100 caracteres' })
  categoria?: string;

  @IsOptional()
  @IsString({ message: 'La imagen debe ser un string (URL)' })
  @MaxLength(500, { message: 'La URL de imagen no puede exceder 500 caracteres' })
  imagen?: string;

  @IsOptional()
  @IsBoolean({ message: 'El campo activo debe ser un booleano' })
  activo?: boolean;

  @IsOptional()
  @IsString({ message: 'La marca debe ser un string' })
  @MaxLength(50, { message: 'La marca no puede exceder 50 caracteres' })
  marca?: string;

  @IsOptional()
  @IsString({ message: 'El SKU debe ser un string' })
  @MaxLength(50, { message: 'El SKU no puede exceder 50 caracteres' })
  sku?: string;
}
