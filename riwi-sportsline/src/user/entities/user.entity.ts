import { Role } from '../../roles/entities/role.entity';
import { Order } from '../../order/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

export enum UserRole {
  ADMIN = "admin",
  ANALYST = "analyst",
};

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  role:Role;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}