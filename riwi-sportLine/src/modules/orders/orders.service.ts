import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const payload: any = {
      ...createOrderDto,
      userId: createOrderDto.userId ? new ObjectId(createOrderDto.userId) : undefined,
      customerId: createOrderDto.customerId ? new ObjectId(createOrderDto.customerId) : undefined,
      orderItemsIds: createOrderDto.orderItemsIds ? createOrderDto.orderItemsIds.map(id => new ObjectId(id)) : [],
    };
    const order = this.orderRepository.create(payload as any);
    return this.orderRepository.save(order);
  }

  findAll() {
    return this.orderRepository.find();
  }

  findOne(id: string) {
    return this.orderRepository.findOne({
      where: {id: new ObjectId(id)} 
  });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const updateData: any = { ...updateOrderDto };

    if (updateData.userId) updateData.userId = new ObjectId(updateData.userId);
    if (updateData.customerId) updateData.customerId = new ObjectId(updateData.customerId);
    if (updateData.orderItemsIds) updateData.orderItemsIds = updateData.orderItemsIds.map((id: string) => new ObjectId(id));

    await this.orderRepository.update({id: new ObjectId(id)}, updateData);
    return this.findOne(id);
  }

  remove(id: string) {
    return this.orderRepository.delete({id: new ObjectId(id)});
  }
}
