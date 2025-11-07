import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsNumber, IsString, Min, IsInt } from 'class-validator';
import { Type } from 'class-transformer'

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @IsString()
    userId: string;
    
    @IsInt()
    @Min(1)
    orderItemsId: number;
    
    @IsNumber()
    @Min(0)
    quantity: number;
    
    @Type(() => Number)
    @IsInt()
    @Min(0)
    totalPrice: number;
}
