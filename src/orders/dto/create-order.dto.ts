import { Type } from 'class-transformer';
import { 
  IsOptional, 
  IsNumberString,
  IsNotEmpty,
  IsEnum,
  IsArray,
  ValidateNested 
} from 'class-validator';
import { OrderStatusEnum } from '../entities/order.entity';

class OrderItemDto {
  @IsNumberString({}, { message: 'Product ID must be a number' })
  @IsNotEmpty({ message: 'Product ID is required' })
  productId: string;

  @Type(() => Number)
  @IsNotEmpty({ message: 'Quantity is required' })
  quantity: number;
}

export class CreateOrderDto {
  @IsEnum(OrderStatusEnum)
  @IsOptional()
  status?: OrderStatusEnum;

  @IsNumberString({}, { message: 'User ID must be a number' })
  @IsNotEmpty({ message: 'User ID is required' })
  userId: string;

  @IsNumberString({}, { message: 'Customer ID must be a number' })
  @IsNotEmpty({ message: 'Customer ID is required' })
  customerId: string;

  @IsOptional()
  @IsNumberString({}, { message: 'Total must be a number' })
  total?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];
}
