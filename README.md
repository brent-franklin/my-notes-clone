This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
## Getting Started

This application was created using NextJS and and PostgreSQL.
This guide assumes that you already have NPM and PostgreSQL installed on your system.

To download and start the application please run the following commands below;

For HTTPS connections:
```git
git clone https://github.com/brent-franklin/my-notes-clone.git
```

For SSL connections:
```
git clone git@github.com:brent-franklin/my-notes-clone.git
```

CD in the directory and install dependencies
```bash
cd ./my-notes-clone
npm install
```

To populate the database with initial values run:
```bash
psql < ./db/my-notes-clone.pgsql
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

If you would liek to build and run the production server
```bash
npm run build && npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
