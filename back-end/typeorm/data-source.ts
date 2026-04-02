import 'reflect-metadata';

import { DataSource } from 'typeorm';

import { User } from '../src/auth/entities/user.entity';
import { Client } from '../src/clients/entities/client.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASS ?? 'postgres',
  database: process.env.DB_NAME ?? 'teddy_db',
  synchronize: false,
  migrations: ['migrations/*.ts'],
  entities: [User, Client],
});

