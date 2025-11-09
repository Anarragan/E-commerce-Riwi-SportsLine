import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Product } from '../products/entities/product.entity';
import { Order, OrderStatusEnum } from '../orders/entities/order.entity';
import { OrderItem } from '../order-items/entities/order-item.entity';

async function run() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const dataSource = app.get(DataSource);

    if (process.env.NODE_ENV !== 'development') {
        console.error('Seeding is only allowed in development environment.');
        process.exit(1);
    }

    // Repositories
    const userRepo = dataSource.getRepository(User);
    const customerRepo = dataSource.getRepository(Customer);
    const productRepo = dataSource.getRepository(Product);
    const orderRepo = dataSource.getRepository(Order);
    const orderItemRepo = dataSource.getRepository(OrderItem);

    try {

        // Products
        const products = await productRepo.save([
            productRepo.create({ title: 'Swimming Goggles', description: 'Anti-fog swimming goggles', price: '29.99', stock: 100 }),
            productRepo.create({ title: 'Football', description: 'Official size and weight football', price: '19.99', stock: 150 }),
            productRepo.create({ title: 'Running Shoes', description: 'Comfortable running shoes', price: '79.99', stock: 80 }),
            productRepo.create({ title: 'Basketball Jersey', description: 'Breathable basketball jersey', price: '49.99', stock: 60 }),
            productRepo.create({ title: 'Tennis Racket', description: 'Lightweight tennis racket', price: '89.99', stock: 40 }),
        ]);

        // Users
        const users = await userRepo.save([
            userRepo.create({ name: 'Admin User', email: 'admin@example.com', password: 'admin123', role: 'ADMIN' as any }),
            userRepo.create({ name: 'John Doe', email: 'john@example.com', password: 'john123' }),
            userRepo.create({ name: 'Jane Smith', email: 'jane@example.com', password: 'jane123' }),
            userRepo.create({ name: 'Carlos Perez', email: 'carlos@example.com', password: 'carlos123' }),
        ]);

        // Customers 
        const customers = await customerRepo.save([
            customerRepo.create({ user: users[1], address: '123 Main St', phone: '555111222' }),
            customerRepo.create({ user: users[2], address: '456 Market Ave', phone: '555333444' }),
            customerRepo.create({ user: users[3], address: '789 Center Rd', phone: '555555666' }),
        ]);

        // Helper to create order items and compute total
        const makeOrder = async (customerIndex: number, itemDefs: Array<{ productIndex: number; qty: number }>, status: OrderStatusEnum) => {
            const customer = customers[customerIndex];
            const user = customer.user; // relation
            const order = orderRepo.create({ status, user, customer, total: '0.00' });
            await orderRepo.save(order);
            let runningTotal = 0;
            for (const def of itemDefs) {
                const product = products[def.productIndex];
                const lineTotal = parseFloat(product.price) * def.qty;
                runningTotal += lineTotal;
                await orderItemRepo.save(orderItemRepo.create({ order, product, quantity: def.qty, price: product.price }));
            }
            order.total = runningTotal.toFixed(2);
            await orderRepo.save(order);
            return order;
        };

        // Orders
        await makeOrder(0, [ { productIndex: 0, qty: 1 }, { productIndex: 1, qty: 1 } ], OrderStatusEnum.COMPLETED);
        await makeOrder(1, [ { productIndex: 2, qty: 1 } ], OrderStatusEnum.COMPLETED);
        await makeOrder(2, [ { productIndex: 4, qty: 1 } ], OrderStatusEnum.COMPLETED);
        await makeOrder(0, [ { productIndex: 1, qty: 2 } ], OrderStatusEnum.PENDING);
        await makeOrder(1, [ { productIndex: 0, qty: 1 } ], OrderStatusEnum.PENDING);

    console.log('Seeding completed successfully.');

} catch (error) {
        console.error('Error during seeding:', error);
    } finally {
        await app.close();
    }
}

run();