import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class CustomersService {
  constructor(@InjectRepository(Customer) private customerRepository: Repository<Customer>) {}

  create(createCustomerDto: CreateCustomerDto) {
    const customer = this.customerRepository.create({
      ...createCustomerDto,
      userId: createCustomerDto.userId ? createCustomerDto.userId : undefined,
  });
    return this.customerRepository.save(customer);
  }

  findAll() {
    return this.customerRepository.find();
  }

  findOne(id: string) {
    return this.customerRepository.findOne({ 
      where: { id: new ObjectId(id) } });
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const updateData = { ...updateCustomerDto } as any;
    if (updateData.userId !== undefined) {
      updateData.userId = new ObjectId(updateData.userId);
    }
    await this.customerRepository.update({ id: new ObjectId(id) }, updateData);
    return this.findOne(id);
  }

  remove(id: string) {
    return this.customerRepository.delete({ id: new ObjectId(id) });
  }
}
