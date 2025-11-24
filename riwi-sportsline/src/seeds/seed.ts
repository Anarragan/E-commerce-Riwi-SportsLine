import { DataSource } from "typeorm";
import { AppDataSource } from "../data-source"; 
import { seedUsers } from "./user.seed";
import { seedClients } from "./client.seed";
import { seedProducts } from "./product.seed";
import { seedOrders } from "./order.seed";
import { seedRoles } from "./role.seed";

async function runSeeders() {
  const dataSource: DataSource = await AppDataSource.initialize();

  // Truncar todas las tablas en orden correcto
  await dataSource.query(
    'TRUNCATE TABLE order_items, orders, products, clients, users, role RESTART IDENTITY CASCADE'
  );

  // Primero roles (porque users depende de roles)
  await seedRoles(dataSource);
  await seedUsers(dataSource);
  await seedClients(dataSource);
  await seedProducts(dataSource);
  await seedOrders(dataSource);

  await dataSource.destroy();
}

runSeeders().catch((err) => console.error(err));
