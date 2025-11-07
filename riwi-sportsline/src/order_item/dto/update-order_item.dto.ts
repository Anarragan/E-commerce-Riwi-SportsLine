import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderItemDto } from './create-order_item.dto';
import { IsOptional, IsNumber, Min } from 'class-validator';

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {
  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;
}
