This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

> [!TIP]
> **Prevent tech debt by always running the following**:
> - check and update `.nvmrc` node version
> - `npm update --save` to keep the project up to date.

## Getting Started

First, setup your db, in your env:

```
# create your .env in the root folder
TURSO_DATABASE_URL=file:local.sqlite
```

Next, add a `local.sqlite` file in your root folder.

```bash
$ npm run db:generate # generate a migration when schema have(/src/db/schema.ts)
$ npm run db:migrate # perform db migration based on `src/migrations` dir.
```

> [!NOTE]
> `migrations` folder is self generated and no manual changes happening there.
> It's the result of running `db:generate` if you have updated the schema in `src/db/schema.ts`


run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
