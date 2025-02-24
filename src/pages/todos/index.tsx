import Head from 'next/head';
import Todos from '@/components/Todos';
import { database } from '@/db';
import { todoTable } from '@/db/schema';

interface Todo {
	id: string;
	title: string;
	description?: string;
}

interface TodosPageProps {
	todos: Todo[];
}

export const getServerSideProps = async () => {
	const todos = await database
		.select({
			id: todoTable.id,
			title: todoTable.title,
			description: todoTable.description,
		})
		.from(todoTable);

	return {
		props: {
			todos,
		},
	};
};

export default function TodosPage({ todos }: TodosPageProps) {
	return (
		<>
			<Head>
				<title>Everyone&apos;s todo</title>
				<meta name="description" content="A todo app for everyone" />
			</Head>
			<section>
				<h1>Welcome to Everyone&apos;s Todo</h1>
				<p>This is a simple todo app for everyone.</p>
				<Todos todos={todos} />
			</section>
		</>
	);
}
