📌 context.md — Proyecto Riwi SportsLine (Actualizado hasta Semana 7)
🎯 Objetivo General
Migrar el backend de Express a NestJS con TypeORM, implementando arquitectura modular, configuración robusta y buenas prácticas de documentación y validación. El sistema debe ser escalable, mantenible y seguro, con soporte para usuarios, clientes, productos, órdenes y sus items.

🗂️ Estado del Proyecto
✅ Semana 1
Setup inicial de NestJS, dependencias, estructura de carpetas y conexión a PostgreSQL.

✅ Semana 2
Migración de entidades a TypeORM, relaciones, seeders y validación en BD.

✅ Semana 3
Generación de recursos con nest g resource, DTOs con validaciones, servicios conectados a repositorios y controladores CRUD.

✅ Semana 4
Implementación de guards, decoradores, interceptores, filtros y middleware globales.

✅ Semana 5
Módulo Auth con JWT, refresh token con cookies HttpOnly, logout seguro, roles en BD y seeders iniciales.

✅ Semana 6
Integración de Google OAuth 2.0 con Passport, endpoints /auth/google y /auth/google/callback, creación automática de usuarios externos y emisión de tokens.

🔄 Semana 7 (en curso)
Historia de Usuario: Como líder técnico necesito asegurar la calidad y mantenibilidad del código con Swagger, SonarQube y linters.

Criterios de aceptación:

Swagger actualizado y documentando DTOs, respuestas y errores (Obligatorio).

Pruebas de caja blanca y negra (WorkShop - Aplicación).

Análisis de calidad con SonarQube (WorkShop - Aplicación).

Configuración de linters y pre-commit hooks (WorkShop - Aplicación).

Tareas base de migración:

Configurar análisis de código estático con SonarQube.

Realizar pruebas unitarias (caja blanca) e integración (caja negra).

Implementar Husky/pre-commit para control de calidad.