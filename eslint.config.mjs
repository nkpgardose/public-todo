import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends(
		'next/core-web-vitals',
		'next/typescript',
		'plugin:prettier/recommended'
	),
	{
		rules: {
			'prettier/prettier': [
				'error',
				{
					useTabs: true,
					tabWidth: 2,
					singleQuote: true,
					trailingComma: 'es5',
				},
			],
			'id-length': [
				'error',
				{
					min: 3,
					properties: 'never',
					exceptions: ['id', 'ID', 'Id', '_'],
				},
			],
			'no-unused-vars': [
				'error',
				{
					vars: 'all',
					args: 'after-used',
					ignoreRestSiblings: true,
				},
			],
			'lines-between-class-members': ['error', 'always'],
		},
	},
];

export default eslintConfig;
