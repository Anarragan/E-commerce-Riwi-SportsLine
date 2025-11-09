import { IsString, IsNotEmpty, MaxLength, IsNumberString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  address: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  phone: string;

  @IsNumberString({}, { message: 'The userId must be a valid numeric string' })
  @IsNotEmpty()
  userId: string;
}
