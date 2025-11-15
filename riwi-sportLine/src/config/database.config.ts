import * as path from 'path';
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    type: 'mongodb',
    url: process.env.DB_URI,
    synchronize: true,
    logging: true,
    entities: [path.join(__dirname, '..', '**', '*.entity.{ts,js}')],
}));