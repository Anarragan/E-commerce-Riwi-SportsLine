import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from '../order-items/entities/order-item.entity';
import { Product } from '../products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
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
      const product = await this.productRepository.findOne({
        where: { id: item.productId },
      });
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
      user: { id: createOrderDto.userId } as unknown as Order['user'],
      customer: {
        id: createOrderDto.customerId,
      } as unknown as Order['customer'],
      total,
      orderItems,
    });

    return this.orderRepository.save(newOrder);
  }

  findAll() {
    return this.orderRepository.find();
  }

  findOne(id: number) {
    return this.orderRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['orderItems', 'orderItems.product'],
    });

    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }

    // update order fields
    if (updateOrderDto.userId) {
      order.user = { id: updateOrderDto.userId } as unknown as Order['user'];
    }

    if (updateOrderDto.customerId) {
      order.customer = {
        id: updateOrderDto.customerId,
      } as unknown as Order['customer'];
    }

    // Order items update
    if (updateOrderDto.orderItems) {
      await this.orderItemRepository.delete({ order: { id } });

      // create and save new items
      const newItems = await Promise.all(
        updateOrderDto.orderItems.map(async (itemDto) => {
          const product = await this.productRepository.findOne({
            where: { id: Number(itemDto.productId) },
          });

          if (!product) {
            throw new NotFoundException(
              `Product #${itemDto.productId} not found`,
            );
          }

          const item = this.orderItemRepository.create({
            quantity: itemDto.quantity,
            price: product.price,
            product,
            order,
          });

          return this.orderItemRepository.save(item);
        }),
      );

      order.orderItems = newItems;
    }

    // new total calculation
    order.total = order.orderItems.reduce(
      (acc, item) => acc + item.quantity * Number(item.price),
      0,
    );

    await this.orderRepository.save(order);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.orderRepository.delete({ id });
  }
}
