import type { NextApiRequest, NextApiResponse } from 'next';
import pg from 'db/db';
import { PoolClient, QueryResult } from 'pg';

type Data = {
  [name: string]: string;
};

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<{ [notes: string]: Data[] } | { [message: string]: string }>
) {
  try {
    const client: PoolClient = await pg.connect(); // connect client
    const result: QueryResult = await client.query(`SELECT * FROM notes ORDER BY timeModified DESC`); // select all rows in notes and return ordered by timemodified
    const notes: Data[] = result.rows; // get results
    return res.status(200).json({ notes }); // return results
  } catch (err) { // if error return error
    return res.status(500).json({ message: (err as Error).message });
  }
}
