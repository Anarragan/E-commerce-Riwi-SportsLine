📄 PLAN_DE_MIGRACION.md - Proyecto Riwi SportsLine (Actualizado)
Descripción general
Migración del backend de Express a NestJS con enfoque modular, seguridad avanzada y buenas prácticas de arquitectura.

Tabla de contenido
Semana 1 - Fundamentos de NestJS y setup base

Semana 2 - ORM y persistencia con TypeORM

Semana 3 - Arquitectura modular y DTOs

Semana 4 - Middleware, filtros e interceptores

Semana 5 - Autenticación con JWT, roles y permisos

Semana 6 - Autenticaciones avanzadas (x-api-key y OAuth)

Semana 7 - Pruebas y análisis estático

Semana 5 - Autenticación con JWT, roles y permisos
Descripción: Sistema de autenticación seguro con roles gestionados desde BD.

Criterios de aceptación:

JWT + Refresh Token funcional.

Roles y permisos gestionados desde BD.

Guards y decoradores protegiendo endpoints.

Swagger actualizado.

Tareas:

✅ Configurar módulo Auth con Passport y JWT.

✅ Implementar AuthService con login y validación de credenciales.

✅ Implementar AuthController con endpoint /auth/login.

✅ Implementar JwtStrategy para validar tokens.

✅ Integrar guards y decoradores (@Public, @Roles, JwtAuthGuard, RolesGuard).

✅ Migrar roles y permisos a BD con entidad Role.

✅ Crear seeders de roles (admin, analyst) y usuarios iniciales con contraseñas encriptadas.

🔄 Documentar autenticación en Swagger.

👉 Con esto, el context.md y el plan de migración ya reflejan el avance real hasta Semana 5. ¿Quieres que el siguiente paso sea que te prepare directamente la documentación Swagger de login, refresh y logout con ejemplos de los usuarios iniciales?