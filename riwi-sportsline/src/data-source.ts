// src/data-source.ts
import { DataSource } from "typeorm";
import { User } from "./user/entities/user.entity";
import { Client } from "./client/entities/client.entity";
import { Product } from "./product/entities/product.entity";
import { Order } from "./order/entities/order.entity";
import { OrderItem } from "./order_item/entities/order_item.entity";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" }); // asegura que lea el archivo en la raíz

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false, // 🔴 importante: desactivar
  logging: true,
});
