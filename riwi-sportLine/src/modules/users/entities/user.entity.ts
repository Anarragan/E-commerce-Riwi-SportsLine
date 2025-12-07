import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity';
import { Order } from '../../orders/entities/order.entity';
import { UsersRole } from '../../users-roles/entities/users-role.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToOne(() => Customer, (customer) => customer.user)
  customer?: Customer;

  @OneToMany(() => UsersRole, (ur) => ur.user)
  roles: UsersRole[];

  @OneToMany(() => Order, (order) => order.user)
  orders?: Order[];
}
