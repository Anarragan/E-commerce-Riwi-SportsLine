# 📌 Contexto del Proyecto: E-commerce Riwi SportsLine

## 🎯 Objetivo General
Migrar el backend de Express a NestJS con TypeORM, implementando arquitectura modular, configuración robusta y buenas prácticas de documentación y validación.  
El sistema debe ser escalable, mantenible y seguro, con soporte para usuarios, clientes, productos, órdenes y sus items.

---

## 🗂️ Estado del Proyecto

### ✅ Semana 1
- Configuración inicial del proyecto NestJS.
- Instalación de dependencias principales (`@nestjs/typeorm`, `pg`, `class-validator`, `class-transformer`).
- Definición de estructura de carpetas (`src/user`, `src/client`, `src/product`, `src/order`, `src/order_item`, `src/seeds`).
- Configuración de `AppModule` con conexión a PostgreSQL usando variables de entorno (`.env`).

### ✅ Semana 2
- **Entidades migradas a TypeORM**:
  - `User`: con roles (`admin`, `analyst`, `client`), relación con `Order`.
  - `Client`: relación con `Order`.
  - `Product`: con categoría, stock (`availableAmount`), precio unitario.
  - `Order`: relación con `User` y `Client`, contiene `OrderItems`.
  - `OrderItem`: relación con `Order` y `Product`.

- **Relaciones definidas**:
  - `User (1) ↔ (N) Order`
  - `Client (1) ↔ (N) Order`
  - `Order (1) ↔ (N) OrderItem`
  - `Product (1) ↔ (N) OrderItem`

- **Seeders implementados y probados**:
  - `UserSeeder`: crea usuarios iniciales (Admin, Analyst).
  - `ClientSeeder`: crea clientes de prueba.
  - `ProductSeeder`: inserta productos con categoría y stock.
  - `OrderSeeder`: genera órdenes asociadas a usuarios y clientes.
  - `OrderItemSeeder`: añade productos a las órdenes.

- **Script de ejecución de seeders**:
  - Configurado en `package.json`:
    ```json
    "scripts": {
      "seed": "ts-node src/seeds/seed.ts"
    }
    ```
  - `seed.ts` limpia tablas en orden correcto (`order_items → orders → products → clients → users`) usando `TRUNCATE ... CASCADE` y luego ejecuta los seeders.
  - IDs reiniciados en cada corrida (`RESTART IDENTITY`).

- **Validación en BD**:
  - Datos insertados correctamente en PostgreSQL.
  - Relaciones comprobadas con consultas SQL (`JOIN` entre órdenes, clientes, usuarios y productos).
  - Flujo completo validado: una orden con sus items y productos asociados.

---

### ✅ Semana 3
- **Recursos generados con `nest g resource`**:
  - `User`: CRUD completo con DTOs (`CreateUserDto`, `UpdateUserDto`), validaciones (`class-validator`) y endpoints REST.
  - `Product`: CRUD completo con validaciones de stock y precio.
  - `Client`: CRUD completo para gestión de clientes.
  - `Order`: CRUD con relaciones hacia `User` y `Client`, incluye estado (`pending`, `completed`, `cancelled`) y totalAmount.
  - `OrderItem`: CRUD que conecta `Order` y `Product`, con cantidad y precio.

- **Servicios conectados a repositorios TypeORM**:
  - Uso de `@InjectRepository` en cada servicio.
  - Métodos CRUD (`create`, `findAll`, `findOne`, `update`, `remove`) implementados.
  - Relaciones cargadas con `relations` en `findAll` y `findOne`.

- **Controladores REST**:
  - Endpoints expuestos en plural (`/users`, `/products`, `/clients`, `/orders`, `/order-items`).
  - Uso de `ParseIntPipe` para tipado seguro en parámetros `id`.
  - Validaciones activas en Swagger/Postman.

- **Validación en Swagger/Postman**:
  - `POST /users` → creación de usuarios con roles.
  - `POST /products` → creación de productos con stock y precio.
  - `POST /clients` → creación de clientes.
  - `POST /orders` → creación de órdenes asociadas a usuarios y clientes.
  - `POST /order-items` → asociación de productos a órdenes.
  - `GET` endpoints devuelven datos con relaciones completas.

---

## 📅 Próximos pasos (Semana 4 en adelante)
- Implementar **autenticación y autorización** (JWT, roles).
- Añadir **validaciones avanzadas** en servicios (ej. stock disponible antes de crear `OrderItem`).
- Documentar endpoints en README y Swagger.
- Optimizar consultas con `QueryBuilder` para reportes (ventas por cliente, productos más vendidos).
- Añadir pruebas unitarias y de integración.

---

## 📝 Notas
- Los seeders son **idempotentes** gracias al `TRUNCATE ... CASCADE`, reinician IDs en cada corrida.
- La base de datos ya está lista para ser consumida por los servicios y controladores.
- Los recursos CRUD de Semana 3 permiten validar el flujo completo de datos desde Swagger/Postman.
