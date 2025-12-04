# 🏃 Riwi SportsLine - Backend NestJS

E-commerce backend migrado de Express a NestJS con arquitectura modular, inyección de dependencias, y mejores prácticas de seguridad.

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Historias de Usuario](#historias-de-usuario)
- [Scripts Disponibles](#scripts-disponibles)
- [Pruebas](#pruebas)
- [Contribución](#contribución)

## 📝 Descripción

Este proyecto es la migración del backend del e-commerce **Riwi SportsLine** de Express.js a NestJS. La migración se realiza por etapas semanales, cada una representada por una Historia de Usuario (HU).

### Objetivos de la Migración

- ✅ Adoptar arquitectura modular de NestJS
- ✅ Implementar inyección de dependencias
- ✅ Migrar de Sequelize a TypeORM
- ✅ Implementar pruebas automatizadas
- ✅ Mejorar seguridad y validación
- ✅ Aplicar principios SOLID
- ✅ Documentar todo el proceso

## 🛠️ Tecnologías

- **NestJS** 10.3.0 - Framework Node.js
- **TypeScript** 5.3.3 - Lenguaje de programación
- **TypeORM** 0.3.17 - ORM para base de datos
- **PostgreSQL** - Base de datos relacional
- **Jest** 29.7.0 - Framework de pruebas
- **ESLint** + **Prettier** - Linting y formateo de código
- **class-validator** + **class-transformer** - Validación y transformación de datos

## 🚀 Instalación

### Prerrequisitos

- Node.js >= 18.x
- PostgreSQL >= 14.x
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**

```bash
git clone <repository-url>
cd riwi-sportsline
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

```bash
cp .env.example .env
# Editar .env con tus credenciales de base de datos
```

4. **Crear la base de datos**

```sql
CREATE DATABASE riwi_sportsline;
```

5. **Ejecutar migraciones** (cuando estén disponibles)

```bash
npm run migration:run
```

6. **Iniciar el servidor**

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## ⚙️ Configuración

### Variables de Entorno

El proyecto utiliza `@nestjs/config` para gestionar variables de entorno. Archivo `.env`:

```env
PORT=3000
NODE_ENV=development

DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=riwi_sportsline
DB_SYNCHRONIZE=false
DB_LOGGING=true

JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=1d
```

### TypeORM

La configuración de TypeORM se encuentra en:
- `src/config/typeorm-config.service.ts` - Configuración para NestJS
- `src/config/typeorm.config.ts` - Configuración para CLI de migraciones

## 📁 Estructura del Proyecto

```
riwi-sportsline/
├── src/
│   ├── config/              # Configuraciones (TypeORM, variables de entorno)
│   ├── usuario/             # Módulo de usuarios
│   │   ├── entities/        # Entidades TypeORM
│   │   ├── usuario.controller.ts
│   │   ├── usuario.service.ts
│   │   └── usuario.module.ts
│   ├── app.module.ts        # Módulo principal
│   ├── app.controller.ts
│   ├── app.service.ts
│   └── main.ts              # Punto de entrada
├── test/                    # Pruebas e2e
├── dist/                    # Código compilado
├── .env                     # Variables de entorno
├── .env.example            # Ejemplo de variables de entorno
├── package.json
├── tsconfig.json
└── README.md
```

## 📅 Historias de Usuario

### ✅ HU-1: Fundamentos de NestJS y migración del setup base (Semana 1)

**Estado:** ✅ Completada

**Rama:** `HU-1`

**Objetivo:** Comprender la estructura de NestJS, instalar su CLI y migrar el setup base desde Express.

**Tareas completadas:**
- ✅ Proyecto NestJS inicializado
- ✅ ConfigModule configurado para variables de entorno
- ✅ TypeORM configurado (sustituyendo Sequelize)
- ✅ Entidad base `Usuario` creada
- ✅ TypeScript, ESLint y Prettier integrados
- ✅ Servidor validado y funcionando

**Rama:** `HU-1`

### ✅ HU-2: Integración de ORM y persistencia con TypeORM (Semana 2)

**Estado:** ✅ Completada

**Objetivo:** Reemplazar Sequelize por TypeORM y definir entidades y relaciones.

**Tareas completadas:**
- ✅ Migrados modelos: Usuario, Producto, Cliente, Pedido, PedidoItem
- ✅ Definidas relaciones (OneToMany, ManyToOne)
- ✅ Implementadas migraciones iniciales
- ✅ Creados seeders para datos iniciales
- ✅ Repositorios personalizados implementados

**Rama:** `HU-2`

### ✅ HU-3: Arquitectura modular y DTOs (Semana 3)

**Estado:** ✅ Completada

**Objetivo:** Estructurar el proyecto en módulos con controladores, servicios y DTOs.

**Tareas completadas:**
- ✅ Módulos creados: productos, clientes, pedidos
- ✅ DTOs migrados con class-validator y class-transformer
- ✅ Principios SOLID aplicados
- ✅ Pruebas unitarias integradas

**Rama:** `HU-3`

### ✅ HU-4: Middleware, filtros e interceptores (Semana 4)

**Estado:** ✅ Completada

**Objetivo:** Implementar herramientas de control de flujo y robustez en NestJS.

**Tareas completadas:**
- ✅ Middleware global de auditoría implementado
- ✅ ExceptionFilter para errores HTTP creado
- ✅ Guards para roles y permisos implementados
- ✅ Interceptors para logging y tiempo de ejecución añadidos

**Rama:** `HU-4`

### ✅ HU-5: Autenticación con JWT, roles y permisos (Semana 5)

**Estado:** ✅ Completada

**Objetivo:** Implementar autenticación con JWT y gestión de roles desde base de datos.

**Tareas completadas:**
- ✅ Módulo Auth configurado con estrategias JWT
- ✅ Refresh Token implementado
- ✅ Sistema de roles y permisos migrado
- ✅ Rutas protegidas con Guards y decoradores personalizados

**Rama:** `HU-5`

### ✅ HU-6: Autenticaciones avanzadas (x-api-key y OAuth) (Semana 6)

**Estado:** ✅ Completada

**Objetivo:** Permitir autenticación externa segura mediante x-api-key y OAuth2.

**Tareas completadas:**
- ✅ Módulo para autenticación con x-api-key creado
- ✅ OAuth2 (Google) implementado
- ✅ Validación de scopes y permisos por API key

**Rama:** `HU-6`

### ✅ HU-7: Pruebas y análisis estático (Semana 7)

**Estado:** ✅ Completada

**Objetivo:** Asegurar calidad del código con herramientas de análisis y pruebas.

**Tareas completadas:**
- ✅ SonarQube configurado para análisis estático
- ✅ Pruebas de caja blanca y negra implementadas
- ✅ Linters y hooks con Husky/pre-commit configurados

**Rama:** `HU-7`

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run start:dev          # Iniciar en modo desarrollo con hot-reload
npm run start:debug        # Iniciar en modo debug

# Producción
npm run build              # Compilar TypeScript
npm run start:prod         # Iniciar en modo producción

# Calidad de código
npm run lint               # Ejecutar ESLint
npm run format             # Formatear código con Prettier

# Pruebas
npm run test              # Ejecutar pruebas unitarias
npm run test:watch        # Ejecutar pruebas en modo watch
npm run test:cov          # Generar reporte de cobertura
npm run test:e2e          # Ejecutar pruebas end-to-end

# Migraciones TypeORM
npm run migration:generate # Generar nueva migración
npm run migration:run     # Ejecutar migraciones pendientes
npm run migration:revert   # Revertir última migración
```

## 🧪 Pruebas

### Ejecutar Pruebas

```bash
# Pruebas unitarias
npm run test

# Pruebas con cobertura
npm run test:cov

# Pruebas e2e
npm run test:e2e
```

### Estructura de Pruebas

- Pruebas unitarias: `*.spec.ts` junto a los archivos fuente
- Pruebas e2e: `test/*.e2e-spec.ts`

## 🔒 Seguridad

- Validación de datos con `class-validator`
- Variables de entorno para secretos
- CORS configurado
- Preparado para JWT (HU-5)

## 📚 Recursos

- [Documentación NestJS](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [NestJS Best Practices](https://github.com/nestjs/awesome-nestjs)

## 👥 Contribución

Este proyecto sigue un flujo de trabajo basado en historias de usuario:

1. Crear rama para cada HU: `git checkout -b HU-X`
2. Desarrollar las tareas de la HU
3. Realizar commits descriptivos
4. Crear Pull Request hacia `main`
5. Documentar avances en README

## 📝 Licencia

MIT

## 🎯 Estado del Proyecto

✅ **Todas las Historias de Usuario completadas**

- ✅ HU-1: Setup base de NestJS
- ✅ HU-2: TypeORM y entidades
- ✅ HU-3: Arquitectura modular y DTOs
- ✅ HU-4: Middleware, filtros e interceptores
- ✅ HU-5: Autenticación JWT
- ✅ HU-6: OAuth y API Keys
- ✅ HU-7: Pruebas y análisis estático

---

**Última actualización:** Todas las HUs completadas - Migración completa de Express a NestJS ✅

