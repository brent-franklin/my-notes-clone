import type { NextApiRequest, NextApiResponse } from 'next';
import pg from 'db/db';
import { PoolClient, QueryResult } from 'pg';

type Data = {
  [name: string]: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ [folder: string]: Data[] } | { [message: string]: string }>
) {
  try {
    const client: PoolClient = await pg.connect(); // connect client
    await client.query(`INSERT INTO folders (name) VALUES ($1) RETURNING *`, [req.body.name]); // insert new folder
    const result: QueryResult = await client.query(`SELECT * FROM folders ORDER BY name`); // return all folders ordered alphabetically
    client.release(); // since there were two DB queries the pool client needs to be explicitly released
    const newFolder: Data[] = result.rows; // get results
    return res.status(200).json({ newFolder }); // return results
  } catch (err) { // if error then return error
    return res.status(500).json({ message: (err as Error).message });
  }
}
