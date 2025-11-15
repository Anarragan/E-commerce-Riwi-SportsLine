import { 
  IsOptional, 
  IsString,
  IsNotEmpty,
  IsEnum,
  IsArray,
} from 'class-validator';
import { OrderStatusEnum } from '../entities/order.entity';

export class CreateOrderDto {
  @IsEnum(OrderStatusEnum)
  @IsOptional()
  status?: OrderStatusEnum;

  @IsString({ message: 'El userId debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El userId es obligatorio' })
  userId: string;

  @IsString({ message: 'El customerId debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El customerId es obligatorio' })
  customerId: string;

  @IsOptional()
  @IsString({ message: 'El total debe ser una cadena de texto' })
  total?: string;

  @IsArray()
  @IsString({ each: true, message: 'Cada item del pedido debe ser una cadena de texto' })
  orderItemsIds: string[];
}
