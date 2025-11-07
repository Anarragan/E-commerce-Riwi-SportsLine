import { Order } from "../../order/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("clients")
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    name: string;

    @Column({unique:true})
    email: string;

    @Column({ name: "phone_number", length:20, nullable:true})
    phoneNumber: string;

    @OneToMany(() => Order, (order) => order.client)
    orders: Order[];

}
