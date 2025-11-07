import { DataSource } from "typeorm";
import { Product } from "../product/entities/product.entity";

export async function seedProducts(dataSource: DataSource) {
  const repo = dataSource.getRepository(Product);

  const products = [
  {
    name: "Fútbol Adidas",
    description: "Balón oficial Adidas Champions League",
    category: "Fútbol",          // <-- faltaba
    availableAmount: 20,
    unitaryPrice: 120000,
  },
  {
    name: "Raqueta Wilson Pro",
    description: "Raqueta profesional de tenis Wilson",
    category: "Tenis",           // <-- faltaba
    availableAmount: 10,
    unitaryPrice: 350000,
  },
];
await repo.save(products);
}
