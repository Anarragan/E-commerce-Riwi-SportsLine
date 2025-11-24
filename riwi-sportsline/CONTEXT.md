📌 Contexto del Proyecto: E-commerce Riwi SportsLine (Actualizado)
🎯 Objetivo General
Migrar el backend de Express a NestJS con TypeORM, implementando arquitectura modular, configuración robusta y buenas prácticas de documentación y validación. El sistema debe ser escalable, mantenible y seguro, con soporte para usuarios, clientes, productos, órdenes y sus items.

🗂️ Estado del Proyecto
✅ Semana 1
Configuración inicial del proyecto NestJS.

Dependencias principales instaladas (@nestjs/typeorm, pg, class-validator, class-transformer).

Estructura de carpetas definida (src/user, src/client, src/product, src/order, src/order_item, src/seeds).

Conexión a PostgreSQL con variables de entorno.

✅ Semana 2
Entidades migradas a TypeORM (User, Client, Product, Order, OrderItem).

Relaciones definidas correctamente.

Seeders implementados y probados.

Script de ejecución de seeders configurado en package.json.

Validación en BD con consultas SQL y flujo completo probado.

✅ Semana 3
Recursos generados con nest g resource para usuarios, productos, clientes, órdenes y order-items.

DTOs con validaciones (class-validator).

Servicios conectados a repositorios TypeORM.

Controladores REST con endpoints CRUD.

Validación completa en Swagger/Postman.

✅ Semana 4
Guards personalizados (JwtAuthGuard) implementados.

Decorador @Public creado.

Decorador @Roles y RolesGuard implementados.

ResponseInterceptor global implementado.

TimingInterceptor global implementado.

AllExceptionsFilter global implementado.

LoggerMiddleware global implementado para auditoría.

✅ Semana 5
Módulo Auth configurado con Passport y JWT.

AuthService con login y validación de credenciales.

AuthController con endpoint /auth/login.

JwtStrategy implementada.

Guards y decoradores funcionando.

Refresh Token implementado con cookies HttpOnly.

Logout seguro implementado (limpieza de cookie refreshToken).

Roles migrados a BD con entidad Role y relación FK en users.

Seeders de roles (admin, analyst) y usuarios iniciales creados con contraseñas encriptadas.

Flujo completo de seeders funcionando (roles, users, clients, products, orders, order_items).

🔄 Pendiente:

Documentación en Swagger (login, refresh, logout, roles).

Pruebas unitarias e integración del flujo de autenticación y roles.

📅 Próximos pasos
Documentar flujo completo en Swagger (login, refresh, logout, roles).

Avanzar hacia autenticaciones avanzadas (Semana 6: x-api-key y OAuth).

Configurar pruebas unitarias, integración y análisis estático (Semana 7).

📝 Notas
Seeders son idempotentes gracias a TRUNCATE ... CASCADE.

BD lista para ser consumida por servicios y controladores.

Autenticación JWT y autorización por roles ya implementadas.

Refresh Token funcionando con cookies HttpOnly.

Logout seguro completado.

Middleware, filtros e interceptores globales completados.

Roles gestionados desde BD con entidad Role.

Usuarios iniciales creados (admin@example.com, analyst@example.com) para pruebas de login.