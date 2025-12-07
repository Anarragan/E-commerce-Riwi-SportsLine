import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
  ) {}

  create(createOrderItemDto: CreateOrderItemDto) {
    const orderItem = this.orderItemRepository.create({
      ...createOrderItemDto,
      product: { id: createOrderItemDto.productId },
    });
    return this.orderItemRepository.save(orderItem);
  }

  findAll() {
    return this.orderItemRepository.find();
  }

  findOne(id: number) {
    return this.orderItemRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    const orderItem = await this.orderItemRepository.preload({
      id,
      ...updateOrderItemDto,
      product: { id: updateOrderItemDto.productId },
    });
    if (!orderItem) {
      throw new NotFoundException(`OrderItem with id ${id} not found`);
    }
    return this.orderItemRepository.save(orderItem);
  }

  remove(id: number) {
    return this.orderItemRepository.delete({ id });
  }
}
