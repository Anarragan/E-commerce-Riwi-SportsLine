import { Order } from "../../order/entities/order.entity";
import { Product } from "../../product/entities/product.entity";
import { Column, Entity, ManyToOne, NumericType, PrimaryGeneratedColumn } from "typeorm";

@Entity("order_items")
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, (order) => order.orderItems, {onDelete: "CASCADE"})
    order:Order;

    @ManyToOne(() => Product, {eager: true})
    product: Product;

    @Column({type: "int"})
    quantity: number;

    @Column({type: "decimal", precision: 10, scale:2})
    price: number;
}
