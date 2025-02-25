import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: '/pl/loan',
				destination: '/',
				permanent: true,
			},
		];
	},
};

export default nextConfig;
