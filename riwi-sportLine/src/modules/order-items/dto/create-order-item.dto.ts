import { IsInt, IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';
import { Type } from 'class-transformer'


export class CreateOrderItemDto {
  @Type(() => Number)
  @IsInt({ message: 'The quantity must be an integer' })
  @IsNotEmpty({ message: 'The quantity is required' })
  quantity: number;


  @IsInt({ message: 'The product ID must be a valid number' })
  @IsNotEmpty({ message: 'The product ID is required' })
  productId: number;
}
