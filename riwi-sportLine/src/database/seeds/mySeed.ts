/*import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRoleEnum } from '../../modules/users/entities/user.entity';
import { Customer } from '../../modules/customers/entities/customer.entity';
import { Product } from '../../modules/products/entities/product.entity';
import { Order, OrderStatusEnum } from '../../modules/orders/entities/order.entity';
import { OrderItem } from '../../modules/order-items/entities/order-item.entity';
import { DataSource } from 'typeorm';

async function seed() {
	const app = await NestFactory.createApplicationContext(AppModule, {
		logger: ['log', 'error', 'warn'],
	});

    // clear existing data
    const dataSource = app.get(DataSource);
    await dataSource.query(`
        TRUNCATE TABLE "order_items", "orders", "customers", "products", "users" RESTART IDENTITY CASCADE;
    `);

	try {
		const userRepo = app.get<Repository<User>>(getRepositoryToken(User));
		const customerRepo = app.get<Repository<Customer>>(getRepositoryToken(Customer));
		const productRepo = app.get<Repository<Product>>(getRepositoryToken(Product));
		const orderRepo = app.get<Repository<Order>>(getRepositoryToken(Order));
		const orderItemRepo = app.get<Repository<OrderItem>>(getRepositoryToken(OrderItem));

		// Users
		const admin = userRepo.create({
			name: 'Admin User',
			email: 'admin@example.com',
			password: 'password123',
			role: UserRoleEnum.ADMIN,
		});
		const shopper = userRepo.create({
			name: 'Jane Shopper',
			email: 'jane@example.com',
			password: 'password123',
			role: UserRoleEnum.CUSTOMER,
		});
		await userRepo.save([admin, shopper]);

		// Customer for shopper
		const customer = customerRepo.create({
			address: '123 Main St, City',
			phone: '+57 3001234567',
			user: shopper,
		});
		await customerRepo.save(customer);

		// Products
		const productsData = [
			{ title: 'Running Shoes', description: 'Lightweight running shoes', price: 79.99, stock: 50 },
			{ title: 'Football', description: 'Official size and weight', price: 25.5, stock: 100 },
			{ title: 'Tennis Racket', description: 'Graphite frame', price: 120.0, stock: 20 },
		];
		const products = await productRepo.save(productsData.map((p) => productRepo.create(p)));

		// Order for customer
		const order = orderRepo.create({
			status: OrderStatusEnum.PENDING,
			total: 0,
			user: shopper,
			customer: customer,
		});
		await orderRepo.save(order);

		// Order Items
		const oi1 = orderItemRepo.create({
			order,
			product: products[0],
			quantity: 2,
			price: products[0].price,
		});
		const oi2 = orderItemRepo.create({
			order,
			product: products[1],
			quantity: 1,
			price: products[1].price,
		});
		await orderItemRepo.save([oi1, oi2]);

		// Update order total
		const total = (oi1.quantity * Number(oi1.price)) + (oi2.quantity * Number(oi2.price));
		order.total = total;
		order.status = OrderStatusEnum.COMPLETED;
		await orderRepo.save(order);

		console.log('Seed completed successfully.');
	} catch (err) {
		console.error('Seed failed:', err);
		process.exitCode = 1;
	} finally {
		await app.close();
	}
}

seed();
 */