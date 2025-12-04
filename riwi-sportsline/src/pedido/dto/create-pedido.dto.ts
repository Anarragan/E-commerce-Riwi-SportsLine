import {
  IsUUID,
  IsArray,
  ValidateNested,
  IsInt,
  Min,
  IsOptional,
  IsString,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EstadoPedido } from '../entities/pedido.entity';

class PedidoItemDto {
  @IsUUID('4', { message: 'El producto_id debe ser un UUID válido' })
  producto_id: string;

  @IsInt({ message: 'La cantidad debe ser un número entero' })
  @Min(1, { message: 'La cantidad debe ser al menos 1' })
  cantidad: number;
}

export class CreatePedidoDto {
  @IsUUID('4', { message: 'El cliente_id debe ser un UUID válido' })
  cliente_id: string;

  @IsArray({ message: 'Los items deben ser un array' })
  @ValidateNested({ each: true })
  @Type(() => PedidoItemDto)
  items: PedidoItemDto[];

  @IsOptional()
  @IsString({ message: 'La dirección de envío debe ser un string' })
  @MaxLength(200, { message: 'La dirección no puede exceder 200 caracteres' })
  direccionEnvio?: string;

  @IsOptional()
  @IsString({ message: 'La ciudad de envío debe ser un string' })
  @MaxLength(100, { message: 'La ciudad no puede exceder 100 caracteres' })
  ciudadEnvio?: string;

  @IsOptional()
  @IsString({ message: 'El código postal debe ser un string' })
  @MaxLength(10, { message: 'El código postal no puede exceder 10 caracteres' })
  codigoPostalEnvio?: string;

  @IsOptional()
  @IsString({ message: 'El método de pago debe ser un string' })
  @MaxLength(100, { message: 'El método de pago no puede exceder 100 caracteres' })
  metodoPago?: string;

  @IsOptional()
  @IsString({ message: 'Las notas deben ser un string' })
  notas?: string;
}

export class UpdateEstadoPedidoDto {
  @IsEnum(EstadoPedido, { message: 'El estado debe ser un valor válido' })
  estado: EstadoPedido;
}
