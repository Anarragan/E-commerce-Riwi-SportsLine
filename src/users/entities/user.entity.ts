import { PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, Entity, Unique, OneToOne } from "typeorm";
import { Exclude } from "class-transformer";
import { Order } from "src/orders/entities/order.entity";
import { Customer } from "src/customers/entities/customer.entity";

enum UserRoleEnum {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'enum', enum: UserRoleEnum, default: UserRoleEnum.CUSTOMER })
  role: UserRoleEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToOne(() => Customer, customer => customer.user)
  customer: Customer;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];
}