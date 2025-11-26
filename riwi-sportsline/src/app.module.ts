import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { ClientModule } from './client/client.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order_item/order_item.module';
import { Client } from './client/entities/client.entity';
import { Order } from './order/entities/order.entity';
import { OrderItem } from './order_item/entities/order_item.entity';
import { Product } from './product/entities/product.entity';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/entities/role.entity';
import { ExternalModule } from './external/external.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace disponible la config en todos los módulos
      envFilePath: '.env', // Archivo a cargar
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Client, Order, OrderItem, Product, Role],
      synchronize: true,

    }),
    UserModule,
    ClientModule,
    ProductModule,
    OrderModule,
    OrderItemModule,
    AuthModule,
    RolesModule,
    ExternalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{ 
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*")
  }
}
