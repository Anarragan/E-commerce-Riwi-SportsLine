import { Column, CreateDateColumn, UpdateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";
import { Customer } from "src/modules/customers/entities/customer.entity";
import { Order } from "src/modules/orders/entities/order.entity";
import { Exclude } from "class-transformer";

export enum UserRoleEnum {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}

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

  @Column({ type: 'enum', enum: UserRoleEnum, default: UserRoleEnum.CUSTOMER })
  role: UserRoleEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToOne(() => Customer, (customer) => customer.user)
  customer?: Customer;

  @OneToMany(() => Order, (order) => order.user)
  orders?: Order[];

}