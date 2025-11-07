import { DataSource } from "typeorm";
import { AppDataSource } from "../data-source"; // tu configuración principal
import { seedUsers } from "./user.seed";
import { seedClients } from "./client.seed";
import { seedProducts } from "./product.seed";
import { seedOrders } from "./order.seed";

async function runSeeders() {
    const dataSource: DataSource = await AppDataSource.initialize();

    await dataSource.query('TRUNCATE TABLE order_items, orders, products, clients, users RESTART IDENTITY CASCADE');

    await seedUsers(dataSource);
    await seedClients(dataSource);
    await seedProducts(dataSource);
    await seedOrders(dataSource);

    await dataSource.destroy();
}

runSeeders().catch((err) => console.error(err));
