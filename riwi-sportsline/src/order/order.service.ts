import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = this.orderRepo.create(createOrderDto);
    return this.orderRepo.save(order);
  }

  async findAll() {
    return this.orderRepo.find({
      relations: ['client', 'user', 'orderItems'],
    });
  }

  async findOne(id: number) {
    return this.orderRepo.findOne({
      where: { id },
      relations: ['client', 'user', 'orderItems'],
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    await this.orderRepo.update(id, updateOrderDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.orderRepo.delete(id);
  }
}
