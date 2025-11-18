import { 
  IsOptional, 
  IsNotEmpty,
  IsEnum,
  IsArray,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatusEnum } from '../entities/order.entity';
import { CreateOrderItemDto } from '../../order-items/dto/create-order-item.dto';


export class CreateOrderDto {
  @IsEnum(OrderStatusEnum)
  @IsOptional()
  status?: OrderStatusEnum;

  @IsNumber({}, {message: 'El userId debe ser un número' })
  @IsNotEmpty({ message: 'El userId es obligatorio' })
  userId: number;

  @IsNumber({}, { message: 'El customerId debe ser un número' })
  @IsNotEmpty({ message: 'El customerId es obligatorio' })
  customerId: number;

  @IsOptional()
  @IsNumber({}, { message: 'El total debe ser un número' })
  total?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  orderItems: CreateOrderItemDto[];

}
