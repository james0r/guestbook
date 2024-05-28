import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const guest = sqliteTable('guests', {
  id: integer("id").primaryKey(),
  name: text("name"),
  created_at: text('created_at').default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`).notNull(),
  comment: text("comment")
})