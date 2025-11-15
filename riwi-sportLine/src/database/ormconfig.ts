import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/modules/users/entities/user.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { Order } from 'src/modules/orders/entities/order.entity';
import { OrderItem } from 'src/modules/order-items/entities/order-item.entity';
import { Customer } from 'src/modules/customers/entities/customer.entity';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
    type: 'mongodb',
    url: configService.get<string>('DB_URI'),
    database: configService.get<string>('DB_NAME'),
    entities: [User, Product, Order, OrderItem, Customer],
    synchronize: true,
})