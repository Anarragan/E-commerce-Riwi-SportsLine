import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UserRoleEnum } from '../enums/user.enum';
import { Category } from '../categories/entities/category.entity';
import { Product } from '../products/entities/product.entity';
import { Order } from '../orders/entities/order.entity';
import { OrderItem } from '../order-items/entities/order-item.entity';

async function run() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const dataSource = app.get(DataSource);

    if (process.env.NODE_ENV !== 'development') {
        console.error('Seeding is only allowed in development environment.');
        process.exit(1);
    }

    // Seed data
    const userRepo = dataSource.getRepository(User);
    const categoryRepo = dataSource.getRepository(Category);
    const productRepo = dataSource.getRepository(Product);
    const orderRepo = dataSource.getRepository(Order);
    const orderItemRepo = dataSource.getRepository(OrderItem);

    try {

        const categories = await categoryRepo.save([
            categoryRepo.create({ name: 'Swimming', description: 'Swimming gear and accessories' }),
            categoryRepo.create({ name: 'Football', description: 'Football equipment and apparel' }),
            categoryRepo.create({ name: 'Clothing', description: 'Apparel and accessories' }),
            categoryRepo.create({ name: 'Basketball', description: 'Basketball equipment and apparel' }),
            categoryRepo.create({ name: 'Tennis', description: 'Tennis equipment and apparel' }),
        ]);

        const products = await productRepo.save([
            productRepo.create({ title: 'Swimming Goggles', description: 'Anti-fog swimming goggles', value: '29.99', stock: 100, category: categories[0] }),
            productRepo.create({ title: 'Football', description: 'Official size and weight football', value: '19.99', stock: 150, category: categories[1] }),
            productRepo.create({ title: 'Running Shoes', description: 'Comfortable running shoes', value: '79.99', stock: 80, category: categories[2] }),
            productRepo.create({ title: 'Basketball Jersey', description: 'Breathable basketball jersey', value: '49.99', stock: 60, category: categories[3] }),
            productRepo.create({ title: 'Tennis Racket', description: 'Lightweight tennis racket', value: '89.99', stock: 40, category: categories[4] }),
        ]);

        const users = await userRepo.save([
            userRepo.create({ name: 'Admin User', email: 'admin@example.com', password: 'admin123', role: UserRoleEnum.ADMIN }),
            userRepo.create({ name: 'Seller User', email: 'seller@example.com', password: 'seller123', role: UserRoleEnum.SELLER }),
            userRepo.create({ name: 'Customer User', email: 'customer@example.com', password: 'customer123', role: UserRoleEnum.CUSTOMER }),
            userRepo.create({ name: 'John Doe', email: 'john@example.com', password: 'john123', role: UserRoleEnum.CUSTOMER }),
            userRepo.create({ name: 'Jane Smith', email: 'jane@example.com', password: 'jane123', role: UserRoleEnum.CUSTOMER }),
        ]);

        const orders = await orderRepo.save([
            orderRepo.create({ status: 'completed', user: users[2], total: '49.98' }),
            orderRepo.create({ status: 'completed', user: users[3], total: '79.99' }),
            orderRepo.create({ status: 'completed', user: users[4], total: '89.99' }), 
            orderRepo.create({ status: 'pending', user: users[2], total: '19.99' }),
            orderRepo.create({ status: 'pending', user: users[3], total: '29.99' }),
        ]);

        await orderItemRepo.save([
            orderItemRepo.create({ order: orders[0], product: products[0], quantity: 1, price: products[0].value }),
            orderItemRepo.create({ order: orders[0], product: products[1], quantity: 1, price: products[1].value }),
            orderItemRepo.create({ order: orders[1], product: products[2], quantity: 1, price: products[2].value }),
            orderItemRepo.create({ order: orders[2], product: products[4], quantity: 1, price: products[4].value }),
            orderItemRepo.create({ order: orders[3], product: products[1], quantity: 1, price: products[1].value }),
        ]);

        console.log('Seeding completed successfully.');

} catch (error) {
        console.error('Error during seeding:', error);
    } finally {
        await app.close();
    }
}

run();