# 🛒 Riwi SportsLine - E-commerce Backend

Backend modular y escalable para e-commerce deportivo construido con NestJS, TypeORM y PostgreSQL.

## 📋 Tabla de Contenidos

- [Tecnologías](#-tecnologías)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Características Principales](#-características-principales)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Ejecución](#-ejecución)
- [Testing](#-testing)
- [Documentación API](#-documentación-api)
- [Roadmap de Desarrollo](#-roadmap-de-desarrollo)

## 🚀 Tecnologías

### Core
- **NestJS** v10.x - Framework progresivo de Node.js
- **TypeScript** v5.x - Superset tipado de JavaScript
- **Node.js** v18.x - Entorno de ejecución

### Base de Datos
- **PostgreSQL** v14+ - Base de datos relacional
- **TypeORM** v0.3.x - ORM para TypeScript/JavaScript

### Autenticación y Seguridad
- **Passport** v0.7.x - Middleware de autenticación
- **JWT** (JSON Web Tokens) - Tokens de acceso y refresh
- **bcrypt** v5.x - Hash de contraseñas
- **class-validator** v0.14.x - Validación de DTOs
- **class-transformer** v0.5.x - Transformación de objetos

### Documentación
- **Swagger/OpenAPI** v7.x - Documentación interactiva de API

### Testing y Calidad
- **Jest** v29.x - Framework de testing
- **ESLint** v8.x - Linter de código
- **Prettier** v3.x - Formateador de código

### Utilidades
- **@nestjs/config** - Gestión de variables de entorno
- **dotenv** - Carga de variables .env

## 📁 Arquitectura del Proyecto

```
riwi-sportLine/
├── src/
│   ├── auth/                          # 🔐 Módulo de Autenticación
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts     # Login, Register, Refresh
│   │   │   └── auth.controller.spec.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts        # Lógica de autenticación
│   │   │   ├── jwt.strategy.ts        # Estrategia JWT principal
│   │   │   └── refresh.strategy.ts    # Estrategia Refresh Token
│   │   ├── dto/
│   │   │   ├── login.dto.ts
│   │   │   ├── register.dto.ts
│   │   │   └── refresh-token.dto.ts
│   │   └── auth.module.ts
│   │
│   ├── modules/                       # 📦 Módulos de Negocio
│   │   ├── users/                     # Gestión de usuarios
│   │   │   ├── entities/
│   │   │   │   └── user.entity.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-user.dto.ts
│   │   │   │   └── update-user.dto.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   └── users.module.ts
│   │   │
│   │   ├── products/                  # Catálogo de productos
│   │   │   ├── entities/
│   │   │   ├── dto/
│   │   │   ├── products.controller.ts
│   │   │   ├── products.service.ts
│   │   │   └── products.module.ts
│   │   │
│   │   ├── orders/                    # Gestión de pedidos
│   │   │   ├── entities/
│   │   │   ├── dto/
│   │   │   ├── orders.controller.ts
│   │   │   ├── orders.service.ts
│   │   │   └── orders.module.ts
│   │   │
│   │   ├── customers/                 # Datos de clientes
│   │   ├── order-items/               # Ítems de pedidos
│   │   ├── roles/                     # Gestión de roles
│   │   ├── permissions/               # Gestión de permisos
│   │   ├── users-roles/               # Relación usuarios-roles
│   │   └── roles-permissions/         # Relación roles-permisos
│   │
│   ├── common/                        # 🔧 Utilidades Comunes
│   │   ├── decorators/
│   │   │   ├── roles.decorator.ts     # @Roles('admin', 'manager')
│   │   │   └── permissions.decorator.ts # @Permissions('read:users')
│   │   │
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts      # Protección JWT
│   │   │   ├── refresh-jwt.guard.ts   # Protección Refresh Token
│   │   │   ├── roles.guard.ts         # Validación de roles
│   │   │   └── permissions.guard.ts   # Validación de permisos
│   │   │
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts # Manejo global de errores
│   │   │
│   │   ├── interceptors/
│   │   │   ├── logging.interceptor.ts  # Log de requests
│   │   │   ├── response.interceptor.ts # Formato de respuestas
│   │   │   └── timeout.interceptor.ts  # Control de timeout
│   │   │
│   │   ├── middleware/
│   │   │   ├── audit.middleware.ts     # Auditoría de operaciones
│   │   │   └── request-logger.middleware.ts
│   │   │
│   │   └── pipes/
│   │       └── validation.pipe.ts      # Validación de DTOs
│   │
│   ├── config/                        # ⚙️ Configuración
│   │   ├── app.config.ts              # Configuración de aplicación
│   │   ├── database.config.ts         # Configuración de BD
│   │   └── validate.schema.ts         # Validación de .env
│   │
│   ├── database/                      # 🗄️ Base de Datos
│   │   ├── ormconfig.ts               # Configuración TypeORM
│   │   └── seeds/
│   │       └── mySeed.ts              # Datos iniciales
│   │
│   ├── interfaces/                    # 📝 Interfaces TypeScript
│   │   └── jwt-payload.interface.ts
│   │
│   ├── app.module.ts                  # Módulo raíz
│   └── main.ts                        # Bootstrap de aplicación
│
├── test/                              # 🧪 Tests E2E
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
│
├── .env                               # Variables de entorno
├── .env.example                       # Plantilla de variables
├── package.json
├── tsconfig.json
├── nest-cli.json
├── API_DOCUMENTATION.md               # Documentación detallada de API
└── TESTS_SUMMARY.md                   # Resumen de tests unitarios
```

## ✨ Características Principales

### 🔐 Sistema de Autenticación Completo
- **JWT con Access & Refresh Tokens**
  - Access Token: 15 minutos de vida
  - Refresh Token: 7 días de vida
- **Registro y Login** con validación robusta
- **Hash de contraseñas** con bcrypt (10 rounds)
- **Estrategias Passport** para JWT y Refresh Token

### 🛡️ Autorización Basada en Roles y Permisos
- **Sistema de Roles**: Admin, Manager, User
- **Permisos Granulares**: Gestión desde base de datos
- **Guards Personalizados**:
  - `JwtAuthGuard`: Valida tokens JWT
  - `RolesGuard`: Verifica roles del usuario
  - `PermissionsGuard`: Valida permisos específicos
- **Decoradores**:
  ```typescript
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @Get('protected')
  ```

### 🏗️ Arquitectura Modular
- **Separación de Responsabilidades**: Cada módulo es independiente
- **Inyección de Dependencias**: Fácil testeo y mantenimiento
- **DTOs Validados**: class-validator en todos los endpoints
- **Principios SOLID**: Código limpio y escalable

### 📊 Base de Datos con TypeORM
- **Entidades Relacionadas**:
  - Users ↔ Roles (Many-to-Many)
  - Roles ↔ Permissions (Many-to-Many)
  - Users → Orders (One-to-Many)
  - Orders → OrderItems (One-to-Many)
  - Products ↔ OrderItems (Many-to-One)
- **Migraciones y Seeds** para datos iniciales
- **Relaciones Lazy y Eager** optimizadas

### 🔍 Middleware y Filtros
- **Global Exception Filter**: Manejo uniforme de errores
- **Logging Interceptor**: Auditoría de todas las peticiones
- **Request Logger Middleware**: Tracking de requests
- **Validation Pipe**: Validación automática de DTOs

### 📚 Documentación Swagger
- **Interfaz Interactiva**: `http://localhost:3000/api/docs`
- **Autenticación JWT** integrada en Swagger UI
- **Ejemplos de Request/Response** en todos los endpoints
- **DTOs Documentados** con @ApiProperty

## 🔧 Instalación

### Prerrequisitos
```bash
Node.js >= 18.x
PostgreSQL >= 14.x
npm >= 9.x
```

### Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/E-commerce-Riwi-SportsLine.git
cd E-commerce-Riwi-SportsLine/riwi-sportLine
```

### Instalar Dependencias
```bash
npm install
```

## ⚙️ Configuración

### 1. Variables de Entorno
Crear archivo `.env` en la raíz del proyecto:

```env
# Application
NODE_ENV=development
PORT=3000
APP_NAME=Riwi-SportsLine

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_password
DB_DATABASE=riwi_sportsline

# JWT
JWT_SECRET_KEY=tu_super_secreto_seguro_aqui_cambiar_en_produccion
JWT_REFRESH_SECRET_KEY=tu_otro_secreto_para_refresh_token_cambiar

# Bcrypt
BCRYPT_ROUNDS=10
```

### 2. Base de Datos
```bash
# Crear la base de datos
createdb riwi_sportsline

# Ejecutar migraciones (si existen)
npm run migration:run

# Ejecutar seeds
npm run seed:run
```

## 🚀 Ejecución

### Modo Desarrollo
```bash
npm run start:dev
```
La aplicación estará disponible en `http://localhost:3000`

### Modo Producción
```bash
npm run build
npm run start:prod
```

### Ver Logs
```bash
# En desarrollo, los logs se muestran en consola con colores
# En producción, usa un servicio de logging como Winston o Pino
```

## 🧪 Testing

### Tests Unitarios
```bash
# Ejecutar todos los tests
npm run test

# Tests con cobertura
npm run test:cov

# Tests en modo watch
npm run test:watch

# Tests específicos
npm run test auth.service
```

### Tests E2E
```bash
npm run test:e2e
```

### Cobertura de Tests
El proyecto incluye tests para:
- ✅ AuthService (9 tests)
- ✅ UsersService (8 tests)
- ✅ AuthController (4 tests)
- ✅ RolesGuard (8 tests)

**Total: 29 tests pasando al 100%**

Ver detalles en `TESTS_SUMMARY.md`

## 📖 Documentación API

### Swagger UI
Accede a la documentación interactiva:
```
http://localhost:3000/api/docs
```

### Endpoints Principales

#### Autenticación
```http
POST   /auth/register    # Registro de usuario
POST   /auth/login       # Inicio de sesión
POST   /auth/refresh     # Renovar access token
```

#### Usuarios (Protegido - Solo Admin)
```http
GET    /users            # Listar usuarios
GET    /users/:id        # Obtener usuario
POST   /users            # Crear usuario
PATCH  /users/:id        # Actualizar usuario
DELETE /users/:id        # Eliminar usuario
```

#### Productos
```http
GET    /products         # Listar productos (Público)
GET    /products/:id     # Obtener producto (Público)
POST   /products         # Crear producto (Admin/Manager)
PATCH  /products/:id     # Actualizar producto (Admin/Manager)
DELETE /products/:id     # Eliminar producto (Admin)
```

#### Pedidos (Protegido - Usuario Autenticado)
```http
GET    /orders           # Listar pedidos
GET    /orders/:id       # Obtener pedido
POST   /orders           # Crear pedido
PATCH  /orders/:id       # Actualizar pedido
DELETE /orders/:id       # Eliminar pedido
```

Ver documentación completa en `API_DOCUMENTATION.md`

## 🗺️ Roadmap de Desarrollo

### ✅ Semana 1: Fundamentos de NestJS
- [x] Proyecto creado con Nest CLI
- [x] Integración TypeScript, ESLint, Prettier
- [x] Configuración de variables de entorno
- [x] Migración de conexión PostgreSQL con TypeORM
- [x] Documentación inicial

### ✅ Semana 2: ORM y Persistencia
- [x] Entidades Usuario, Producto, Cliente, Pedido
- [x] Relaciones entre entidades
- [x] Migraciones y seeders
- [x] Repositorios personalizados

### ✅ Semana 3: Arquitectura Modular y DTOs
- [x] Módulos de usuarios, productos, clientes
- [x] DTOs con class-validator
- [x] Configuración robusta de .env
- [x] Principios SOLID
- [x] Pruebas unitarias básicas

### ✅ Semana 4: Middleware, Filtros e Interceptores
- [x] Middleware de logging y auditoría
- [x] ExceptionFilter global
- [x] Guards personalizados para roles
- [x] Interceptors de formateo y tiempo
- [x] Pruebas unitarias avanzadas

### ✅ Semana 5: Autenticación JWT
- [x] Sistema JWT + Refresh Token
- [x] Roles y permisos desde BD
- [x] Guards y decoradores personalizados
- [x] Documentación Swagger con auth

### 🔄 Semana 6: Autenticaciones Avanzadas (En Progreso)
- [ ] Autenticación x-api-key
- [ ] OAuth2 (Google)
- [ ] Control de permisos por API key
- [ ] Documentación de flujos avanzados

### 📋 Semana 7: Calidad y Testing (Pendiente)
- [x] Swagger completo con DTOs y respuestas
- [ ] Pruebas de caja blanca y negra
- [ ] Análisis con SonarQube
- [ ] Pre-commit hooks con Husky

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run start              # Iniciar en modo normal
npm run start:dev          # Iniciar en modo watch
npm run start:debug        # Iniciar con debugger

# Build
npm run build              # Compilar para producción
npm run start:prod         # Iniciar compilado

# Testing
npm run test               # Ejecutar tests unitarios
npm run test:watch         # Tests en modo watch
npm run test:cov           # Tests con cobertura
npm run test:e2e           # Tests end-to-end

# Linting y Formato
npm run lint               # Ejecutar ESLint
npm run format             # Formatear con Prettier

# Base de Datos
npm run migration:generate # Generar migración
npm run migration:run      # Ejecutar migraciones
npm run seed:run           # Ejecutar seeds
```

## 🤝 Contribución

1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add: AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

### Estándares de Código
- Seguir guías de estilo de ESLint y Prettier
- Escribir tests para nuevas funcionalidades
- Documentar endpoints en Swagger
- Commits descriptivos siguiendo Conventional Commits

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Autores

- **Anarragan** - *Proyecto Educativo*

## 🙏 Agradecimientos

- NestJS Team por el excelente framework
- TypeORM por el ORM robusto
- Comunidad Open Source

---

**Hecho con ❤️ usando NestJS**
