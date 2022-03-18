/** Database connection for my-notes-clone */
import { Pool, PoolClient } from 'pg';

// Create new pool instance for use when querying DB
const pool: Pool = new Pool({
  idleTimeoutMillis: 3000,
  connectionTimeoutMillis: 2000,
});

// If there is an error, exit and print error to console
pool.on('error', (err: Error, _client: PoolClient) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;
