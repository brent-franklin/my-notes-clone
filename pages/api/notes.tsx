import type { NextApiRequest, NextApiResponse } from 'next'
import pg from 'db/db';
import { QueryResult } from 'pg';

type Data = {
    [name: string]: string
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
    try{
	const result: QueryResult = await pg.query(`SELECT * FROM notes ORDER BY timeModified`);
	const notes: Data[] = result.rows;
	return res.status(200).json( {notes} )
    } catch (err) {
	return res.status(500).json({message: err.message});
    }
}
