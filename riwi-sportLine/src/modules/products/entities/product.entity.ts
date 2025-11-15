import { Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";

@Entity('products')
export class Product {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  price: number;

  @Column({ default: 0 })
  stock: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @Column({type: 'array', nullable: true})
  orderItems: ObjectId[];
}
