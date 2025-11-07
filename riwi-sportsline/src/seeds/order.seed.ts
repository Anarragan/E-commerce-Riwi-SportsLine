import { DataSource } from "typeorm";
import { Order } from "../order/entities/order.entity";
import { OrderItem } from "../order_item/entities/order_item.entity";
import { Client } from "../client/entities/client.entity";
import { User } from "../user/entities/user.entity";
import { Product } from "../product/entities/product.entity";

export async function seedOrders(dataSource: DataSource) {
  const orderRepo = dataSource.getRepository(Order);
  const orderItemRepo = dataSource.getRepository(OrderItem);

  const client = await dataSource.getRepository(Client).findOneBy({ id: 1 });
  const user = await dataSource.getRepository(User).findOneBy({ id: 1 });
  const product = await dataSource.getRepository(Product).findOneBy({ id: 1 });

  if (!client || !user || !product) return;

  const order = orderRepo.create({
    client,
    user,
    status: "pending",
    totalAmount: product.unitaryPrice * 2,
  });

  await orderRepo.save(order);

  const orderItem = orderItemRepo.create({
    order,
    product,
    quantity: 2,
    price: product.unitaryPrice,
  });

  await orderItemRepo.save(orderItem);
}
