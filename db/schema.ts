import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const guest = sqliteTable('guests', {
  id: integer("id").primaryKey(),
  name: text("name"),
  created_at: integer("created_at"),
  comment: text("comment")
})