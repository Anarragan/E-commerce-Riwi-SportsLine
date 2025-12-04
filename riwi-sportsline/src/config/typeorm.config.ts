import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Usuario } from '../usuario/entities/usuario.entity';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'riwi_sportsline',
  // HU-1: Solo entidad Usuario
  entities: [Usuario],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: process.env.DB_LOGGING === 'true',
});
