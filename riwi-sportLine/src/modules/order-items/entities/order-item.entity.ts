import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "src/modules/orders/entities/order.entity";
import { Product } from "src/modules/products/entities/product.entity";

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'numeric' })
  price: number;

  //Relations
  @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: 'CASCADE' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderItems)
  product: Product;
}
