import { IsInt, IsNotEmpty, IsNumberString } from 'class-validator';
import { Type } from 'class-transformer'


export class CreateOrderItemDto {
  @Type(() => Number)
  @IsInt({ message: 'The quantity must be an integer' })
  @IsNotEmpty({ message: 'The quantity is required' })
  quantity: number;

  @IsNumberString({}, { message: 'The price must be a valid number string' })
  @IsNotEmpty({ message: 'The price is required' })
  price: string;

  @IsNumberString({}, { message: 'The order ID must be a valid number string' })
  @IsNotEmpty({ message: 'The order ID is required' })
  orderId: string;

  @IsNumberString({}, { message: 'The product ID must be a valid number string' })
  @IsNotEmpty({ message: 'The product ID is required' })
  productId: string;
}
