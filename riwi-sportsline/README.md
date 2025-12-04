# 🏋️‍♂️ Riwi SportsLine — Backend API

Riwi SportsLine is a backend API built with NestJS for managing clients, products, orders, and user authentication in a sports-oriented e-commerce platform. It includes robust traceability features, role-based access control, and integration with SonarQube for code quality analysis.

---

## 🚀 Technologies Used

- **NestJS** — Modular TypeScript framework for scalable server-side applications
- **TypeORM** — ORM for PostgreSQL and MongoDB
- **PostgreSQL** — Relational database for auditability and integrity
- **MongoDB** — NoSQL database for flexible data modeling
- **JWT Authentication** — Secure login and role-based access
- **Jest** — Unit and integration testing
- **Supertest** — HTTP assertions for E2E tests
- **SonarQube** — Static code analysis and coverage tracking
- **ESLint + Prettier** — Code formatting and linting
- **Husky + lint-staged** — Git hooks for pre-commit validation

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/riwi-sportsline.git
   cd riwi-sportsline
Install dependencies

bash
npm install
Configure environment variables Create a .env file based on .env.example:

env
DATABASE_URL=postgres://user:pass@localhost:5432/sportsline
MONGO_URI=mongodb://localhost:27017/sportsline
JWT_SECRET=your_jwt_secret
Run migrations (if using TypeORM)

bash
npm run migration:run
🧪 Running Tests
Unit and integration tests

bash
npm run test
Coverage report

bash
npm run test:cov
📊 SonarQube Integration
To analyze code quality:

Start SonarQube locally:

bash
./bin/windows-x86-64/StartSonar.bat
Run coverage first:

bash
npm run test:cov
Run SonarScanner:

bash
sonar-scanner
Make sure sonar-project.properties is configured correctly.

🛡️ Linting and Pre-commit Hooks
Format and lint code:

bash
npm run lint
Husky and lint-staged are configured to run on every commit:

bash
npx husky install
📚 Project Structure
Código
src/
├── auth/           # Authentication and guards
├── client/         # Client entity and controller
├── product/        # Product entity and controller
├── order/          # Order entity and controller
├── order_item/     # Items within orders
├── user/           # User management and roles
├── common/         # Decorators and shared utilities
🧠 Developer Notes
DTOs are validated with class-validator and mapped to entities.

MongoDB is used for flexible route tracking; PostgreSQL ensures auditability.

All modules are tested with Jest and Supertest.

Quality metrics are documented in QUALITY_REPORT.md.

📮 Contact
For questions or contributions, feel free to open an issue or reach out to the maintainer.