import { PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, Entity, OneToOne, JoinColumn, ObjectIdColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Order } from "../../orders/entities/order.entity";
import { ObjectId } from "mongodb";

@Entity('customers')
export class Customer {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ length: 100 })
  address: string;

  @Column({ length: 20 })
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations

  @Column()
  userId: ObjectId;

  @Column()
  orders: ObjectId[];
}

