import Link from 'next/link';
import { useState, useEffect, FormEvent } from 'react';

enum TodoStatuses {
	LOADING = 'loading',
	DEFAULT = 'default',
	SUCCESS = 'success',
	ERROR = 'error',
}

interface FormElements extends HTMLFormControlsCollection {
	title: HTMLInputElement;
	description: HTMLTextAreaElement;
}

interface TodoFormElement extends HTMLFormElement {
	readonly elements: FormElements;
}

interface Todo {
	id: string;
	title: string;
	description?: string;
}

interface TodosProps {
	todos: Todo[];
}

function Todos({ todos }: TodosProps) {
	const [currentTodos, setCurrentTodos] = useState<Todo[]>(todos);
	const [todosState, setTodoState] = useState<TodoStatuses>(
		TodoStatuses.DEFAULT
	);

	useEffect(() => {
		setTodoState(TodoStatuses.LOADING);

		fetch('/api/todos')
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setTodoState(TodoStatuses.SUCCESS);
			})
			.catch((error) => {
				console.error(error);
				setTodoState(TodoStatuses.ERROR);
			});
	}, []);

	function onFormSubmit(event: FormEvent<TodoFormElement>) {
		event.preventDefault();

		const { title, description } = event.currentTarget.elements;

		setTodoState(TodoStatuses.LOADING);
		fetch('/api/todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: title.value,
				description: description.value,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				setCurrentTodos([...currentTodos, data.todo]);
				setTodoState(TodoStatuses.SUCCESS);
			})
			.catch((error) => {
				console.error(error);
				setTodoState(TodoStatuses.ERROR);
			});
	}

	if (todosState === TodoStatuses.LOADING) {
		return <div>Loading...</div>;
	}

	if (todosState === TodoStatuses.ERROR) {
		return <div>Something went wrong...</div>;
	}

	return (
		<div>
			<h1>Add your todo</h1>
			<form onSubmit={onFormSubmit}>
				<label htmlFor="title">Todo title</label>
				<br />
				<input
					id="title"
					name="title"
					type="text"
					placeholder="Add a todo title"
				/>
				<br />
				<label htmlFor="description">Description</label>
				<br />
				<textarea
					id="description"
					name="description"
					placeholder="Add a todo description"
				/>
				<br />
				<button type="submit">Add</button>
			</form>

			<h2>Todos</h2>
			{currentTodos.length ? (
				<table>
					<thead>
						<tr>
							<th scope="col">Title</th>
							<th scope="col">Description</th>
						</tr>
					</thead>
					<tbody>
						{currentTodos.map((todo) => (
							<tr key={todo.id}>
								<th scope="row">{todo.title}</th>
								<td>{todo.description}</td>
								<td>
									<Link href={`/todos/${todo.id}`}>See more</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : null}
		</div>
	);
}

export default Todos;
