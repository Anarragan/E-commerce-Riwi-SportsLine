import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity'
import { OrderItem } from '../order-items/entities/order-item.entity';
import { Product } from '../products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
  const orderItems: OrderItem[] = [];
  let total = 0;

  for (const item of createOrderDto.orderItems) {
    const product = await this.productRepository.findOne({ where: { id: item.productId } });
    if (!product) continue;

    const orderItem = this.orderItemRepository.create({
      product,
      quantity: item.quantity,
      price: product.price,
    });
    total += Number(product.price) * item.quantity;
    orderItems.push(orderItem);
  }

  const newOrder = this.orderRepository.create({
    user: { id: createOrderDto.userId } as any,
    customer: { id: createOrderDto.customerId } as any,
    total,
    orderItems,
  });
  return this.orderRepository.save(newOrder);
}

  findAll() {
    return this.orderRepository.find();
  }

  findOne(id: string) {
    return this.orderRepository.findOne({
      where: {id} 
  });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const updateData: any = { ...updateOrderDto };

    if (updateData.userId) updateData.userId;
    if (updateData.customerId) updateData.customer;
    if (updateData.orderItemsIds) updateData.orderItems;

    await this.orderRepository.update({id}, updateData);
    return this.findOne(id);
  }

  remove(id: string) {
    return this.orderRepository.delete({id});
  }
}
