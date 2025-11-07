import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export enum OrderStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export class CreateOrderDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsNumber()
  totalAmount: number;

  @IsNumber()
  clientId: number;

  @IsNumber()
  userId: number;

  @IsOptional()
  createdAt?: Date;
}
