# 🏗️ E-commerce Riwi SportsLine — Migración a NestJS

## 📖 Épica general
Migrar el backend del e-commerce **Riwi SportsLine** desde **Express** hacia **NestJS**, aplicando arquitectura modular, autenticación basada en roles, persistencia con **PostgreSQL + TypeORM**, y documentación profesional con **Swagger**.  
El objetivo es consolidar una base escalable, mantenible y alineada con estándares empresariales modernos.

---

## 🗓️ Semana 1 — Fundamentos de NestJS y setup base

### 🎯 Objetivo
Comprender la estructura y fundamentos de **NestJS**, instalando su CLI, configurando el entorno inicial y migrando la base del proyecto Express hacia una arquitectura modular.

### ✅ Estado
**Completado.**

### 🔍 Resultados
- Proyecto creado con `nest new riwi-sportsline`.
- Repositorio vinculado a GitHub.
- Configuración de TypeScript, ESLint y Prettier.
- Configuración del entorno mediante `@nestjs/config` y variables en `.env`.
- Servidor en funcionamiento con `npm run start:dev`.

---

## 🗓️ Semana 2 — Integración de ORM y persistencia con TypeORM

### 🎯 Objetivo
Sustituir Sequelize por **TypeORM**, conectando el backend a **PostgreSQL** y creando las primeras entidades con persistencia real en base de datos.

### ⚙️ Configuración actual
- **ORM:** TypeORM
- **Base de datos:** PostgreSQL
- **Conexión:** Probada y establecida exitosamente mediante `TypeOrmModule.forRootAsync`
- **Entidades activas:**
  - `User` (id, name, email, password, role)
- **Roles manejados:**
  - `"admin"`
  - `"analyst"`

### ✅ Estado actual
- Configuración del módulo `UserModule` corregida.
- Inyección del repositorio `UserRepository` funcional.
- Servidor NestJS ejecutando correctamente con conexión activa a la base de datos.

---

## 🧩 Tablas registradas (DB Schema actual)
| Tabla | Campos principales |
|-------|--------------------|
| **users** | id, name, email, password, role |
| **clients** | id, name |
| **products** | id, name, amount, price |
| **orders** | id, client_id |
| **order_products** | id, product_id, order_id, amount |

*(Estructura extensible según futuras historias de usuario.)*

---

## 🚀 Próxima historia de usuario (Semana 3)
**Historia:** Arquitectura modular y DTOs.  
**Objetivo:**  
Implementar la separación de responsabilidades mediante módulos independientes (`ProductModule`, `OrderModule`, etc.), aplicando DTOs para validar y tipar los datos de entrada, siguiendo principios SOLID.

---

## 🧠 Contexto técnico de avance
El proyecto cuenta con:
- Arquitectura modular base (`AppModule`, `UserModule`).
- Conexión a PostgreSQL mediante `TypeORM`.
- Inyección de dependencias funcionando.
- Scripts base en `package.json` para desarrollo (`start:dev`).
- Variables de entorno centralizadas (`.env` y `ConfigModule`).

---

## 🧩 Próximos pasos
1. Implementar entidades restantes (`Product`, `Client`, `Order`, `OrderProduct`).
2. Configurar relaciones entre tablas (OneToMany, ManyToOne, etc.).
3. Crear DTOs y controladores iniciales para operaciones CRUD.
4. Agregar validación con `class-validator` y `class-transformer`.
5. Documentar endpoints con **Swagger**.

---

## 👨‍💻 Autor
**Miguel Ángel Molina Gutiérrez**  
Proyecto académico: *Riwi SportsLine*  
Tecnologías: NestJS, TypeORM, PostgreSQL, JWT, Swagger  
Versión actual del contexto: **v1.0 (Semana 2 completada)**
