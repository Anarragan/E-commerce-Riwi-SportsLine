import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(@InjectRepository(Customer) private customerRepository: Repository<Customer>) {}

  create(createCustomerDto: CreateCustomerDto) {
    const customer = this.customerRepository.create({
      ...createCustomerDto,
      user: { id: createCustomerDto.userId },
    });
    return this.customerRepository.save(customer);
  }

  findAll() {
    return this.customerRepository.find();
  }

  findOne(id: string) {
    return this.customerRepository.findOne({ 
      where: { id } });
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const updateCustomer = await this.customerRepository.preload({
      id,
      ...updateCustomerDto,
    });
    if (!updateCustomer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }
    return this.customerRepository.save(updateCustomer);
  }

  remove(id: string) {
    return this.customerRepository.delete({ id });
  }
}
