# PLAN_DE_MIGRACION.md - Proyecto Riwi SportsLine

## Descripción general
Migración del backend de Express a NestJS con enfoque modular, seguridad avanzada y buenas prácticas de arquitectura.

---

## Tabla de contenido
1. Semana 1 - Fundamentos de NestJS y setup base
2. Semana 2 - ORM y persistencia con TypeORM
3. Semana 3 - Arquitectura modular y DTOs
4. Semana 4 - Middleware, filtros e interceptores
5. Semana 5 - Autenticación con JWT, roles y permisos
6. Semana 6 - Autenticaciones avanzadas (x-api-key y OAuth)
7. Semana 7 - Pruebas y análisis estático

---

## Semana 1 - Fundamentos de NestJS y setup base
**Descripción:** Migrar el proyecto Express a NestJS con configuración inicial.  
**Criterios de aceptación:**
- Proyecto creado con Nest CLI.
- Configuración de TypeScript, ESLint, Prettier y `.env`.
- Conexión PostgreSQL con TypeORM.
- ConfigModule validando variables de entorno.

**Tareas:**
- Crear proyecto con `nest new riwi-sportsline`.
- Configurar variables de entorno y migrar las de Express.
- Sustituir Sequelize por TypeORM con entidad `Usuario`.
- Documentar proceso en README.

---

## Semana 2 - ORM y persistencia con TypeORM
**Descripción:** Migrar modelos y relaciones a TypeORM.  
**Criterios de aceptación:**
- Entidades `Usuario`, `Producto`, `Cliente`, `Pedido`.
- Relaciones definidas correctamente.
- Migraciones y seeders implementados.
- CRUD básico validado.

**Tareas:**
- Migrar modelos de Sequelize a TypeORM.
- Configurar relaciones (OneToMany, ManyToOne).
- Implementar migraciones y seeds iniciales.
- Validar consultas desde servicios.

---

## Semana 3 - Arquitectura modular y DTOs
**Descripción:** Estructurar proyecto modular con controladores, servicios y DTOs.  
**Criterios de aceptación:**
- Módulos de usuarios, productos y clientes.
- DTOs con `class-validator` y `class-transformer`.
- Config robusta de `.env`.
- Principios SOLID aplicados.

**Tareas:**
- Generar módulos, controladores y servicios.
- Migrar DTOs de Express a Nest.
- Centralizar configuración de entorno.
- Actualizar controladores con inyección de dependencias.
- Integrar pruebas unitarias.

---

## Semana 4 - Middleware, filtros e interceptores
**Descripción:** Mejorar robustez con middleware, filters, guards e interceptors.  
**Criterios de aceptación:**
- Middleware global de logging.
- ExceptionFilter global.
- Guards personalizados para roles.
- Interceptors para formateo y tiempos.

**Tareas:**
- Implementar middleware de auditoría.
- Crear ExceptionFilter para errores HTTP.
- Implementar Guards basados en roles.
- Añadir interceptors personalizados.
- Integrar pruebas unitarias.

---

## Semana 5 - Autenticación con JWT, roles y permisos
**Descripción:** Sistema de autenticación seguro con roles desde BD.  
**Criterios de aceptación:**
- JWT + Refresh Token funcional.
- Roles y permisos gestionados desde BD.
- Guards y decoradores protegiendo endpoints.
- Swagger actualizado.

**Tareas:**
- Configurar módulo Auth con Passport y JWT.
- Migrar roles y permisos a BD.
- Implementar guards y decoradores.
- Documentar autenticación en Swagger.

---

## Semana 6 - Autenticaciones avanzadas
**Descripción:** Integrar x-api-key y OAuth2.  
**Criterios de aceptación:**
- Autenticación por x-api-key.
- OAuth2 con terceros (Google).
- Validación de scopes y permisos.
- Documentación en Swagger.

**Tareas:**
- Crear módulo x-api-key.
- Implementar OAuth2.
- Validar scopes y permisos.
- Documentar flujos en Swagger.

---

## Semana 7 - Pruebas y análisis estático
**Descripción:** Garantizar calidad y mantenibilidad.  
**Criterios de aceptación:**
- Swagger actualizado.
- Pruebas de caja blanca y negra.
- SonarQube configurado.
- Linters y pre-commit hooks activos.

**Tareas:**
- Configurar SonarQube.
- Implementar pruebas unitarias y de integración.
- Configurar husky/pre-commit.
- Validar calidad con linters.
