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
      const result: QueryResult = await client.query( // updated selected note content, and timemodified
      `UPDATE notes
               SET content = $1, timemodified = CURRENT_TIMESTAMP
               WHERE id = $2
               RETURNING *`,
      [req.body.note, req.body.selectedNote]
    );

    const updatedNote: Data[] = result.rows; // get results
    return res.status(200).json({ updatedNote }); // return results
  } catch (err) { // if error return error
    return res.status(500).json({ message: (err as Error).message });
  }
}
