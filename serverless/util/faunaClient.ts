import faunadb, { query as q } from 'faunadb';

const client = new faunadb.Client({ secret: process.env.FAUNADB_KEY });

export enum Indices {
  ALL_ORDERS = 'all_orders',
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

export async function createInstanceForClass(className: string, data: object) {
  const res: any = await client.query(q.Create(q.Class(className), data));
  console.log(res);

  return res.ref;
}
