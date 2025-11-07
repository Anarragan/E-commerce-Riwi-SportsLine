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
  - `User`: con roles (`admin`, `analyst`), relación con `Order`.
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

## 📅 Próximos pasos (Semana 3)
- Generar recursos con `nest g resource` para cada entidad (`user`, `client`, `product`, `order`, `order-item`).
- Conectar servicios a repositorios TypeORM.
- Implementar DTOs y validaciones (`class-validator`).
- Exponer endpoints REST y probar en Swagger/Postman.
- Documentar endpoints y flujo de datos.

---

## 📝 Notas
- Los seeders son **idempotentes** gracias al `TRUNCATE ... CASCADE`, reinician IDs en cada corrida.
- Documentar en README cómo correr `npm run seed` y validar datos.
- La base de datos ya está lista para ser consumida por los servicios y controladores que se generarán en Semana 3.
