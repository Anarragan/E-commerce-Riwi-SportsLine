import { Entity, Column, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";

@Entity('order_items')
export class OrderItem {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  quantity: number;

  @Column()
  price: number;

  //Relations
  @Column()
  orderId: ObjectId;

  @Column()
  productId: ObjectId;
}
