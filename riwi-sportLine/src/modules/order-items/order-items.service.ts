import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class OrderItemsService {
  constructor(@InjectRepository(OrderItem) private orderItemRepository: Repository<OrderItem>) {}

  create(createOrderItemDto: CreateOrderItemDto) {
    const orderItem = this.orderItemRepository.create({
      quantity: createOrderItemDto.quantity,
      price:
        typeof createOrderItemDto.price === 'string'
          ? parseFloat(createOrderItemDto.price)
          : createOrderItemDto.price,
      orderId: new ObjectId(createOrderItemDto.orderId),
      productId: new ObjectId(createOrderItemDto.productId),
    });
    return this.orderItemRepository.save(orderItem);
  }

  findAll() {
    return this.orderItemRepository.find();
  }

  findOne(id: string) {
    return this.orderItemRepository.findOne({ 
      where: { id: new ObjectId(id) }
    });
  }

  async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    const updateData: any = { ...updateOrderItemDto };
    if (updateData.orderId) {
      updateData.orderId = new ObjectId(updateData.orderId);
    }
    if (updateData.productId) {
      updateData.productId = new ObjectId(updateData.productId);
    }
    await this.orderItemRepository.update({ id: new ObjectId(id) }, updateData);
    return this.findOne(id);
  }
  
  remove(id: string) {
    return this.orderItemRepository.delete({ id: new ObjectId(id) });
  }
}
