/** Database connection for my-notes-clone */
import { Pool, PoolClient } from 'pg';

const pool: PoolClient = new Pool();

pool.connect();

export default pool;
