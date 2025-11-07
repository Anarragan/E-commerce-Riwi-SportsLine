import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity'

@Injectable()
export class OrdersService {
  constructor(
    private orderRepository: Repository<Order>,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    const order = this.orderRepository.create({
      ...createOrderDto,
      user: { id: createOrderDto.userId },
    });
    return this.orderRepository.save(order);
  }

  findAll() {
    return this.orderRepository.find();
  }

  findOne(id: string) {
    return this.orderRepository.findOne({ where: { id } });
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderRepository.update(id, updateOrderDto);
  }

  remove(id: string) {
    return this.orderRepository.delete(id);
  }
}
