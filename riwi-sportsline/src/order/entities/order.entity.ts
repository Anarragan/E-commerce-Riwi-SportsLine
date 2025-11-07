import { Client } from "../../client/entities/client.entity";
import { OrderItem } from "../../order_item/entities/order_item.entity";
import { User } from "../../user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("orders")
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Client, (client) => client.orders , {eager: true, onDelete: "CASCADE"})
    @JoinColumn({name: "client_id"})
    client: Client;

    @ManyToOne(() => User, (user) => user.orders , { eager: true, onDelete: "CASCADE"})
    @JoinColumn({name: "user_id"})
    user: User;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true})
    orderItems: OrderItem[];

    @Column({type: "varchar", length: 20, default: "pending"})
    status: string;

    @Column({name: "total_amount", type: "decimal", precision:12, scale:2, default:0})
    totalAmount: number;

    @CreateDateColumn({name: "created_at"})
    createdAt: Date;
}
