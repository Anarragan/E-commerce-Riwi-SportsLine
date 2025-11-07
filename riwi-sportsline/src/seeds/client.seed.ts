import { DataSource } from "typeorm";
import { Client } from "../client/entities/client.entity";

export async function seedClients(dataSource: DataSource) {
  const repo = dataSource.getRepository(Client);

  const clients = [
    {
      name: "Juan Pérez",
      email: "juanperez@gmail.com",
      phoneNumber: "+57 3011234567",
    },
    {
      name: "María Gómez",
      email: "maria.gomez@gmail.com",
      phoneNumber: "+57 3027654321",
    },
  ];

  await repo.save(clients);
}
