import { IsString, IsNumber, IsOptional, IsInt, Min, IsNotEmpty, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
    @IsString({message: 'Title must be a string'})
    @IsNotEmpty({message: 'Title is required'})
    @MaxLength(100, {message: 'Title is too long'})
    title: string;

    @IsString({message: 'Description must be a string'})
    @IsOptional()
    @MaxLength(255, {message: 'Description is too long'})
    description?: string;

    @Type(() => Number)
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    @IsNotEmpty({message: 'Price is required'})
    price: number;

    @Type(() => Number)
    @IsInt()
    @Min(0)
    stock: number;
}
