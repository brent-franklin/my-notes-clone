// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import pg from 'db/db';
import { QueryResult } from 'pg';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const getAll: QueryResult = await pg.query(`SELECT name FROM folders`);
    console.log(getAll)
  res.status(200).json({ name: 'John Doe' })
}
