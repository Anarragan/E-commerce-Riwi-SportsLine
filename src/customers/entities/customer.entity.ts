import { PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, Entity, OneToOne, JoinColumn } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { Order } from "src/orders/entities/order.entity";

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ length: 100 })
  address: string;

  @Column({ length: 20 })
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToOne(() => User, user => user.customer)
  @JoinColumn()
  user: User;

  @OneToMany(() => Order, order => order.customer)
  orders: Order[];
}

