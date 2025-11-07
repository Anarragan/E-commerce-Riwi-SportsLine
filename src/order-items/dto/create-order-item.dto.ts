import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer'
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';

export class CreateOrderItemDto {
    @IsInt()
    @IsNotEmpty()
    quantity: number;

    @IsString()
    @IsNotEmpty()
    price: string;

    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    order: number;

    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    product: number;
}
