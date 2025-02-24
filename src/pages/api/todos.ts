import { eq } from 'drizzle-orm';
import { database } from '@/db';
import { todoInsertSchema, todoTable } from '@/db/schema';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		const todos = await database.select().from(todoTable);
		res.status(200).json({ todos });
	} else if (req.method === 'POST') {
		const { title, description } = req.body;
		const result = todoInsertSchema.safeParse({ title, description });

		if (!result.success) {
			res.status(400).json({ error: result.error });
			return;
		}

		const newTodos = await database
			.insert(todoTable)
			.values(result.data)
			.returning();

		res.status(201).json({ todo: newTodos[0] });
	} else if (req.method === 'DELETE') {
		const { id } = req.body;

		if (!id) {
			res.status(400).json({ error: 'Missing ID' });
			return;
		}

		const deletedTodos = await database
			.delete(todoTable)
			.where(eq(todoTable.id, id))
			.returning();

		res.status(200).json({ todo: deletedTodos[0] });
	} else {
		res.status(405).json({ error: 'Method Not Allowed' });
	}
}
