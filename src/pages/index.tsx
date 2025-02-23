import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
	return (
		<>
			<Head>
				<title>A public todo app</title>
				<meta
					name="description"
					content="Generated by create next app, using page routing approach."
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<section>
				<h1>Public Todo</h1>
				<p>
					A simple todo list built with Next.js using Page routing approach.
					<br />
					Start listing your todo <Link href="/todo/">here</Link>.
				</p>
				<p>
					See example of server side page rendering{' '}
					<Link href="/hello/">here</Link>.
				</p>
			</section>
		</>
	);
}
