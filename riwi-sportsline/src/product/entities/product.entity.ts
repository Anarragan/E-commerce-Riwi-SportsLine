import { OrderItem } from "../../order_item/entities/order_item.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    name: string;

    @Column({type: "text", nullable: true})
    description: string;

    @Column({length: 50})
    category: string;

    @Column({ name: "available_amount", type: "int", default: 0})
    availableAmount: number;

    @Column({ name: "unitary_price", type: "decimal", precision:10, scale:2 })
    unitaryPrice: number;

    @Column({name: "created_at", type:"timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @Column({name: "updated_at", type:"timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    updatedAt: Date;

    @OneToMany(() => OrderItem, (OrderItem) => OrderItem.product)
    orderProducts: OrderItem[];
}
