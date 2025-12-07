# API Documentation - Riwi SportsLine

## 📋 Descripción

API REST para E-commerce de artículos deportivos con autenticación JWT, sistema de roles y permisos.

## 🚀 Documentación Swagger

La documentación interactiva de la API está disponible en:

```
http://localhost:3000/api/docs
```

## 🔐 Autenticación

La API utiliza JWT (JSON Web Tokens) para autenticación. Los tokens se obtienen mediante el endpoint `/auth/login`.

### Headers requeridos para rutas protegidas:

```
Authorization: Bearer <tu-access-token>
```

## 📚 Endpoints

### 🔑 Autenticación (`/auth`)

#### POST `/auth/register`
- **Descripción**: Registrar nuevo usuario
- **Acceso**: Público
- **Body**:
```json
{
  "name": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "password": "password123"
}
```
- **Respuesta**:
```json
{
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@ejemplo.com"
  },
  "message": "User registered successfully"
}
```

#### POST `/auth/login`
- **Descripción**: Iniciar sesión
- **Acceso**: Público
- **Body**:
```json
{
  "email": "juan@ejemplo.com",
  "password": "password123"
}
```
- **Respuesta**:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST `/auth/refresh`
- **Descripción**: Refrescar token de acceso
- **Acceso**: Requiere token de refresh válido
- **Headers**: `Authorization: Bearer <refresh-token>`
- **Respuesta**:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 👥 Usuarios (`/users`)

**Acceso**: Solo Admin (requiere rol `admin`)

#### GET `/users`
- **Descripción**: Obtener todos los usuarios
- **Requiere**: JWT + rol admin

#### GET `/users/:id`
- **Descripción**: Obtener usuario por ID
- **Requiere**: JWT + rol admin

#### POST `/users`
- **Descripción**: Crear nuevo usuario
- **Requiere**: JWT + rol admin

#### PATCH `/users/:id`
- **Descripción**: Actualizar usuario
- **Requiere**: JWT + rol admin

#### DELETE `/users/:id`
- **Descripción**: Eliminar usuario
- **Requiere**: JWT + rol admin

---

### 🛍️ Productos (`/products`)

#### GET `/products`
- **Descripción**: Obtener todos los productos
- **Acceso**: Público

#### GET `/products/:id`
- **Descripción**: Obtener producto por ID
- **Acceso**: Público

#### POST `/products`
- **Descripción**: Crear nuevo producto
- **Requiere**: JWT + rol `admin` o `manager`

#### PATCH `/products/:id`
- **Descripción**: Actualizar producto
- **Requiere**: JWT + rol `admin` o `manager`

#### DELETE `/products/:id`
- **Descripción**: Eliminar producto
- **Requiere**: JWT + rol `admin`

---

### 📦 Órdenes (`/orders`)

**Acceso**: Requiere autenticación JWT

#### GET `/orders`
- **Descripción**: Obtener todas las órdenes
- **Requiere**: JWT

#### GET `/orders/:id`
- **Descripción**: Obtener orden por ID
- **Requiere**: JWT

#### POST `/orders`
- **Descripción**: Crear nueva orden
- **Requiere**: JWT

#### PATCH `/orders/:id`
- **Descripción**: Actualizar orden
- **Requiere**: JWT

#### DELETE `/orders/:id`
- **Descripción**: Eliminar orden
- **Requiere**: JWT

---

### 📝 Items de Orden (`/order-items`)

**Acceso**: Requiere autenticación JWT

Todos los endpoints requieren autenticación JWT.

---

### 👤 Clientes (`/customers`)

**Acceso**: Requiere autenticación JWT

Todos los endpoints requieren autenticación JWT.

---

### 🎭 Roles (`/roles`)

**Acceso**: Solo Admin (requiere rol `admin`)

#### GET `/roles`
- **Descripción**: Obtener todos los roles
- **Requiere**: JWT + rol admin

#### GET `/roles/:id`
- **Descripción**: Obtener rol por ID
- **Requiere**: JWT + rol admin

#### POST `/roles`
- **Descripción**: Crear nuevo rol
- **Requiere**: JWT + rol admin

#### PATCH `/roles/:id`
- **Descripción**: Actualizar rol
- **Requiere**: JWT + rol admin

#### DELETE `/roles/:id`
- **Descripción**: Eliminar rol
- **Requiere**: JWT + rol admin

---

### 🔒 Permisos (`/permissions`)

**Acceso**: Solo Admin (requiere rol `admin`)

Todos los endpoints requieren JWT + rol `admin`.

---

## 🛡️ Sistema de Seguridad

### Guards Implementados

1. **JwtAuthGuard**: Valida el token JWT
2. **RolesGuard**: Valida roles del usuario
3. **PermissionsGuard**: Valida permisos específicos
4. **RefreshJwtGuard**: Valida token de refresh

### Decoradores

- `@Roles('admin', 'manager')`: Define roles requeridos
- `@Permissions('manage_users')`: Define permisos requeridos
- `@ApiBearerAuth('JWT-auth')`: Documenta autenticación en Swagger

### Middleware

- **RequestLoggerMiddleware**: Registra todas las peticiones HTTP
- **AuditMiddleware**: Audita acciones críticas

### Interceptors

- **LoggingInterceptor**: Logging de requests/responses
- **ResponseInterceptor**: Formato estándar de respuestas
- **TimeoutInterceptor**: Timeout de requests

### Filters

- **HttpExceptionFilter**: Manejo global de excepciones

---

## 🧪 Pruebas Unitarias

### Archivos con pruebas implementadas:

1. **`auth.service.spec.ts`**: Pruebas del servicio de autenticación
   - Login con credenciales válidas
   - Login con credenciales inválidas
   - Registro de usuarios
   - Refresh de tokens
   - Mapeo de roles y permisos

2. **`users.service.spec.ts`**: Pruebas del servicio de usuarios
   - Crear usuario
   - Obtener todos los usuarios
   - Buscar por ID y email
   - Actualizar usuario
   - Eliminar usuario

3. **`auth.controller.spec.ts`**: Pruebas del controlador de autenticación
   - Endpoint login
   - Endpoint register
   - Endpoint refresh

4. **`roles.guard.spec.ts`**: Pruebas del guard de roles
   - Validación de roles
   - Validación de permisos
   - Acceso denegado sin permisos
   - Usuario no encontrado

### Ejecutar pruebas

```bash
# Todas las pruebas
npm test

# Pruebas en watch mode
npm run test:watch

# Cobertura de código
npm run test:cov
```

---

## 🔄 Flujo de Autenticación

1. Usuario se registra (`POST /auth/register`)
2. Usuario inicia sesión (`POST /auth/login`)
3. API retorna `accessToken` (15 min) y `refreshToken` (7 días)
4. Cliente usa `accessToken` en header `Authorization: Bearer <token>`
5. Cuando `accessToken` expira, usa `refreshToken` (`POST /auth/refresh`)
6. API retorna nuevo `accessToken`

---

## 📊 Códigos de Respuesta HTTP

- `200` - OK
- `201` - Created
- `400` - Bad Request (datos inválidos)
- `401` - Unauthorized (token inválido o expirado)
- `403` - Forbidden (sin permisos suficientes)
- `404` - Not Found
- `500` - Internal Server Error

---

## 🌐 Variables de Entorno

```env
PORT=3000
JWT_SECRET=tu-secret-key
JWT_REFRESH_SECRET=tu-refresh-secret-key
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=riwi_sportline
```

---

## 📝 Notas Importantes

1. Los tokens JWT contienen:
   - `sub`: ID del usuario
   - `email`: Email del usuario
   - `roles`: Array de roles
   - `permissions`: Array de permisos

2. El sistema valida:
   - Al menos UN rol requerido (`some`)
   - TODOS los permisos requeridos (`every`)

3. Rutas públicas (sin autenticación):
   - `POST /auth/login`
   - `POST /auth/register`
   - `GET /products`
   - `GET /products/:id`

---

## 🚀 Iniciar el Servidor

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

Una vez iniciado, accede a la documentación Swagger en:
```
http://localhost:3000/api/docs
```
