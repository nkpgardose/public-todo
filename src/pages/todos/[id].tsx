import { FormEvent } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { eq } from 'drizzle-orm';
import { database } from '@/db';
import { todoTable } from '@/db/schema';

interface FormElements extends HTMLFormControlsCollection {
	id: HTMLInputElement;
}

interface TodoFormElement extends HTMLFormElement {
	readonly elements: FormElements;
}

interface Todo {
	id: string;
	title: string;
	description?: string;
}

interface TodoPageProps {
	todo: Todo;
}

export const getServerSideProps = async (
	context: GetServerSidePropsContext<{ id: string }>
) => {
	const id = context.params?.id;

	if (!id) {
		return {
			notFound: true,
		};
	}

	const todos = await database
		.select({
			id: todoTable.id,
			title: todoTable.title,
			description: todoTable.description,
		})
		.from(todoTable)
		.where(eq(todoTable.id, id));
	const todo = todos[0];

	if (!todo) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			todo,
		},
	};
};

export default function TodoPage({ todo }: TodoPageProps) {
	const router = useRouter();

	function onDeleteSubmit(event: FormEvent<TodoFormElement>) {
		event.preventDefault();
		const { id } = event.currentTarget.elements;
		const idValue = id.value;

		fetch('/api/todos', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: idValue }),
		}).then(() => {
			router.replace('/todos');
		});
	}

	return (
		<>
			<Head>
				<title>This Todo | {todo.title} </title>
				<meta name="description" content={todo.description} />
			</Head>
			<h1>Todo | {todo.title}</h1>
			<p>{todo.description}</p>
			<form onSubmit={onDeleteSubmit}>
				<input type="hidden" name="id" value={todo.id} />
				<button type="submit">Delete</button>
			</form>
			<Link href="/todos">Back to All of Todos</Link>
		</>
	);
}
