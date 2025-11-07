import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order_item.entity';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
    const orderItem = this.orderItemRepo.create(createOrderItemDto);
    return this.orderItemRepo.save(orderItem);
  }

  async findAll() {
    return this.orderItemRepo.find({
      relations: ['order', 'product'],
    });
  }

  async findOne(id: number) {
    return this.orderItemRepo.findOne({
      where: { id },
      relations: ['order', 'product'],
    });
  }

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    await this.orderItemRepo.update(id, updateOrderItemDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.orderItemRepo.delete(id);
  }
}
