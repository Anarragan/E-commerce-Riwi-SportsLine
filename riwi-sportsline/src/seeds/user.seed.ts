import { DataSource } from "typeorm";
import { User, UserRole } from "../user/entities/user.entity";

export async function seedUsers(dataSource: DataSource) {
  const repo = dataSource.getRepository(User);
  const users = [
    {
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123", // sin hash
      role: UserRole.ADMIN,
    },
    {
      name: "Analyst User",
      email: "analyst@example.com",
      password: "analyst123",
      role: UserRole.ANALYST,
    },
  ];

  await repo.save(users);
}
