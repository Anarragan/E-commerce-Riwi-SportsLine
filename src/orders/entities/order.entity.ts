import { OrderItem } from "src/order-items/entities/order-item.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ length: 20 })
  status: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  // relations
  @ManyToOne(() => User, user => user.orders)
  user: User;

  @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true })
  orderItems: OrderItem[];
}
