// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const schema = z.object({
	name: z.string().min(2).max(100),
});

type Data = z.infer<typeof schema>;
type ErrorResponse = { error: string };

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data | ErrorResponse>
) {
	if (req.method === 'GET') {
		const { name } = req.query;

		const result = schema.safeParse({ name });

		if (!result.success) {
			return res.status(400).json({
				error: result.error.errors[0].message,
			});
		}

		res.status(200).json({
			name: result.data.name,
		});
	} else if (req.method === 'POST') {
		const result = schema.safeParse({
			name: req.body?.name,
		});

		if (!result.success) {
			return res.status(400).json({
				error: result.error.errors[0].message,
			});
		}

		res.status(200).json({
			name: result.data.name,
		});
	} else {
		res.status(405).json({ error: 'Invalid API request method.' });
	}
}
