import { DataSource } from "typeorm";
import { User } from "../user/entities/user.entity";
import { Role } from "../roles/entities/role.entity";
import * as bcrypt from "bcrypt";

export async function seedUsers(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);
  const roleRepo = dataSource.getRepository(Role);

  // Buscar rol admin en BD
  const adminRole = await roleRepo.findOne({ where: { name: "admin" } });
  const analystRole = await roleRepo.findOne({ where: { name: "analyst" } });

  if (!adminRole) {
    throw new Error("El rol 'admin' no existe en la BD.");
  }

  if (!analystRole) {
    throw new Error("El rol 'analyst' no existe en la BD.");
  }

  const users = [
    {
      name: "Admin User",
      email: "admin@example.com",
      password: await bcrypt.hash("admin123", 10),
      role: adminRole, // ✅ objeto Role
    },
    {
      name: "Analyst User",
      email: "analyst@example.com",
      password: await bcrypt.hash("analyst123", 10),
      role: analystRole, // ✅ objeto Role
    },
  ];

  await userRepo.save(users);
  console.log("✅ Usuarios iniciales creados");
}
