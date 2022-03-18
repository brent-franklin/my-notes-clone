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
    const result: QueryResult = await client.query( // create new note and return entire row
      `INSERT INTO notes (content, foldername)
                VALUES
                   ($1, $2)
                RETURNING
                   id, content, timecreated, timemodified, foldername`,
      [req.body.note, req.body.folderName]
    );
    const newNote: Data[] = result.rows; // get results
    return res.status(200).json({ newNote }); // return results
  } catch (err) { // if error return error
    return res.status(500).json({ message: (err as Error).message });
  }
}
