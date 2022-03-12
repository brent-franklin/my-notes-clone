/** Database connection for my-notes-clone */
import { Client } from 'pg';

const client: Client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT)!,
});

client.connect();

export default client;
