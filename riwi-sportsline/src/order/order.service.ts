import { Injectable, NotFoundException } from '@nestjs/common';
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
  ) { }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepo.create(createOrderDto);
    return this.orderRepo.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepo.find({
      relations: ['client', 'user', 'orderItems'],
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['client', 'user', 'orderItems'],
    });
    if (!order) {
      throw new NotFoundException("Orden no encontrada");
    }
    return order;
  }


  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderRepo.findOneBy({ id })
    if (!order) {
      throw new NotFoundException("Orden no encontrada");
    }
    await this.orderRepo.update(id, updateOrderDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const order = await this.orderRepo.findOneBy({ id })
    if (!order) {
      throw new NotFoundException("Orden no encontrada");
    }
    await this.orderRepo.remove(order)
  }
}
