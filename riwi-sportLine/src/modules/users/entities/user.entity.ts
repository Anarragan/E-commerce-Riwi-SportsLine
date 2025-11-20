import { Column, CreateDateColumn, UpdateDateColumn, Entity, PrimaryGeneratedColumn, OneToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Customer } from "src/modules/customers/entities/customer.entity";
import { Role } from "../../roles/entities/role.entity";
import { Exclude } from "class-transformer";
import { Order } from "src/modules/orders/entities/order.entity";

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

  /*
  @Column({ type: 'enum', enum: UserRoleEnum, default: UserRoleEnum.CUSTOMER })
  role: UserRoleEnum;*/


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToOne(() => Customer, (customer) => customer.user)
  customer?: Customer;

  @ManyToMany(() => Role, role => role.users, { eager: true })
  @JoinTable()
  roles: Role[];

  @OneToMany(() => Order, (order) => order.user)
  orders?: Order[];

}