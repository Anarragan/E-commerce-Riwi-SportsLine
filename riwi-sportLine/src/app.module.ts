import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { UsersModule } from './modules/users/users.module';
import { validateEnv } from './config/validate.schema';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { OrderItemsModule } from './modules/order-items/order-items.module';
import { CustomersModule } from './modules/customers/customers.module';
import { AuditMiddleware } from './common/middleware/audit.middleware';
import { MiddlewareConsumer, NestModule, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { getPostgresConfig } from './database/ormconfig';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { RolesModule } from './modules/roles/roles.module';
import { UsersRolesModule } from './modules/users-roles/users-roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      validate: (config) => validateEnv(config),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),
    UsersModule,
    ProductsModule,
    OrdersModule,
    OrderItemsModule,
    CustomersModule,
    AuthModule,
    PermissionsModule,
    RolesModule,
    UsersRolesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuditMiddleware).forRoutes('*');
  }
}
