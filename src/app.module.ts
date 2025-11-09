import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigModule } from './config/db.config';
import { OrdersModule } from './orders/orders.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { CustomersModule } from './customers/customers.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(3000),
        // add db url in the future if needed
      }),
    }),

    DatabaseConfigModule,
    OrdersModule,
    OrderItemsModule,
    CustomersModule
  ],
})

export class AppModule {}
