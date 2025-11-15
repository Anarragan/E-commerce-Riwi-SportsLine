import { IsString, IsNotEmpty, MaxLength, IsNumberString } from 'class-validator';

export class CreateCustomerDto {
  @IsString({ message: 'The address must be a string' })
  @IsNotEmpty({ message: 'The address is required' })
  @MaxLength(100, { message: 'The address must be at most 100 characters long' })
  address: string;

  @IsString({ message: 'The phone must be a string' })
  @IsNotEmpty({ message: 'The phone is required' })
  @MaxLength(20, { message: 'The phone must be at most 20 characters long' })
  phone: string;

  @IsNumberString({}, { message: 'The userId must be a valid numeric string' })
  @IsNotEmpty({ message: 'The userId is required' })
  userId: string;
}
