import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: false },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Riwi SportsLine API')
    .setDescription('API REST para E-commerce de artículos deportivos con autenticación JWT, roles y permisos')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Ingrese el token JWT',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('auth', 'Autenticación y registro de usuarios')
    .addTag('users', 'Gestión de usuarios (Admin)')
    .addTag('roles', 'Gestión de roles (Admin)')
    .addTag('permissions', 'Gestión de permisos (Admin)')
    .addTag('products', 'Catálogo de productos')
    .addTag('orders', 'Gestión de órdenes')
    .addTag('order-items', 'Items de órdenes')
    .addTag('customers', 'Información de clientes')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger documentation available at: ${await app.getUrl()}/api/docs`);
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
