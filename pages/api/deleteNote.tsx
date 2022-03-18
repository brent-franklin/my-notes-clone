import type { NextApiRequest, NextApiResponse } from 'next';
import pg from 'db/db';
import { PoolClient, QueryResult } from 'pg';

type Data = {
  [name: string]: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ [newNote: string]: Data[] } | { [message: string]: string }>
) {
  try {
    const client: PoolClient = await pg.connect(); // connect client
    await client.query('DELETE FROM notes WHERE id = $1', [req.body.note.id]); // delete selected note
    const newTable: QueryResult = await client.query('SELECT * FROM notes ORDER BY timemodified'); // return all notes
    client.release(); // Because there were two calls the pool client needs to explicitly be released
    const deletedNote: Data[] = newTable.rows; // get result
    return res.status(200).json({ deletedNote }); // return result
  } catch (err) { // if error then return error
    return res.status(500).json({ message: (err as Error).message });
  }
}
