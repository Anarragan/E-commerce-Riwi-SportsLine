import { Role } from "../roles/entities/role.entity";
import { DataSource } from "typeorm";

export async function seedRoles(dataSource: DataSource) {
  const repo = dataSource.getRepository(Role);

  const roles = ["admin", "analyst"];

  for (const name of roles) {
    const exists = await repo.findOne({ where: { name } });
    if (!exists) {
      const role = repo.create({ name });
      await repo.save(role);
      console.log(`✅ Rol creado: ${name}`);
    } else {
      console.log(`ℹ️ Rol ya existe: ${name}`);
    }
  }
}
