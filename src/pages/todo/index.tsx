import Head from 'next/head';

export default function TodoPage() {
	return (
		<>
			<Head>
				<title>Everyone&apos;s todo</title>
				<meta name="description" content="A todo app for everyone" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<section>
				<h1>Welcome to Everyone&apos;s Todo</h1>
				<p>This is a simple todo app for everyone.</p>
			</section>
		</>
	);
}
