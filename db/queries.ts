import { desc, sql } from 'drizzle-orm';
import { db } from './';
import { guestsTable, InsertGuest } from './schema';

export const dynamic = 'force-dynamic'

export async function getGuestsDesc(): Promise<
  Array<{
    id: number;
    name: string;
    created_at: string;
    comment: string;
  }>
> {
  return await db.select().from(guestsTable).orderBy(desc(guestsTable.created_at));
}

export async function createGuest(data: InsertGuest) {
  await db.insert(guestsTable).values(data);
}