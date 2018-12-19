import faunadb, { query as q } from 'faunadb';
import logger from './logger';

const client = new faunadb.Client({ secret: process.env.FAUNADB_KEY });

export enum Indices {
  ALL_ORDERS = 'all_orders',
  ORDER_BY_ID = 'order_by_id',
}

export enum Classes {
  ORDERS = 'orders',
}

export async function getResultOfIndeces(index: string) {
  return await client.query(
    q.Map(q.Paginate(q.Match(q.Index(index))), ref => q.Get(ref))
  );
}

export async function createUniqueId() {
  return await client.query(q.NewId());
}

export async function createInstanceForClass(className: Classes, data: object) {
  const res: any = await client.query(q.Create(q.Class(className), data));
  console.log(res);

  return res.ref;
}

export async function runIndex(indexName: Indices, terms: string) {
  const res: any = await client.query(
    q.Get(q.Match(q.Index(indexName), terms))
  );
  logger.log('info', `Result of index: ${indexName}`);
  console.log(res);

  return res.ref;
}

export async function updateFromRef(ref: any, data: object) {
  const res: any = await client.query(q.Update(ref, { data }));
  logger.log('info', `Updating ref: ${ref}`);
  logger.log('info', `With data: ${JSON.stringify(data)}`);

  return res.ref;
}
