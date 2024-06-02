import { desc, sql } from 'drizzle-orm';
import { db } from '..';
import { guestbookEntries, InsertGuest } from '../schema';

export async function getGuestsDesc(): Promise<
  Array<{
    id: number;
    name: string;
    created_at: string;
    comment: string;
  }>
> {
  return db.select().from(guestbookEntries).orderBy(desc(guestbookEntries.created_at));
}

export async function createGuest(data: InsertGuest) {
  await db.insert(guestbookEntries).values(data);
}