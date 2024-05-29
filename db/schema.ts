import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const guestsTable = sqliteTable('guests', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  created_at: text('created_at').default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`).notNull(),
  comment: text('comment').notNull(),
});

export type InsertGuest = typeof guestsTable.$inferInsert;
export type SelectGuests = typeof guestsTable.$inferSelect;