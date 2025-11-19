import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './loggin.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
