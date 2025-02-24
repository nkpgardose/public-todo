import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import {
	createSelectSchema,
	createInsertSchema,
	createUpdateSchema,
} from 'drizzle-zod';

export const todoTable = sqliteTable('todos', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	description: text('description').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.default(sql`(strftime('%s', 'now'))`)
		.notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.default(sql`(strftime('%s', 'now'))`)
		.$onUpdate(() => new Date()),
});

export const todoSelectSchema = createSelectSchema(todoTable);
export const todoInsertSchema = createInsertSchema(todoTable);
export const todoUpdateSchema = createUpdateSchema(todoTable);
