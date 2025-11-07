import { IsInt, IsString } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateCategoryDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @Type(() => Number)
    @IsInt()
    product: number;
}
