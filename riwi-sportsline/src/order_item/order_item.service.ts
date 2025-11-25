import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    const orderItem = this.orderItemRepo.create(createOrderItemDto);
    return this.orderItemRepo.save(orderItem);
  }

  async findAll(): Promise<OrderItem[]> {
    return this.orderItemRepo.find({
      relations: ['order', 'product'],
    });
  }

  async findOne(id: number): Promise<OrderItem> {
    const orderItem = await this.orderItemRepo.findOne({
      where: { id },
      relations: ['order', 'product'],
    });
    if (!orderItem) {
      throw new NotFoundException('OrderItem no encontrado');
    }
    return orderItem;
  }

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto): Promise<OrderItem> {
    const orderItem = await this.findOne(id);
    Object.assign(orderItem, updateOrderItemDto);
    return this.orderItemRepo.save(orderItem);
  }

  async remove(id: number): Promise<void> {
    const orderItem = await this.findOne(id);
    await this.orderItemRepo.remove(orderItem);
  }
}

