import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigModule } from './config/db.config';
import { ProductsModule } from './products/products.module';
import { ClientsModule } from './customers/clients.module';
import { OrdersModule } from './orders/orders.module';
import { CategoriesModule } from './categories/categories.module';
import { OrderItemsModule } from './order-items/order-items.module';


@Module({
  imports: [ConfigModule, DatabaseConfigModule, ProductsModule, ClientsModule, OrdersModule, CategoriesModule, OrderItemsModule],
})
export class AppModule {}
