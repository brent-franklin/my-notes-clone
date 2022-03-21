This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
## Getting Started

This application was created using NextJS and PostgreSQL.
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

When inside home folder, populate the database with initial values by running:
```bash
psql < ./db/my-notes-clone.pgsql
```

Before the app can run we need to set some environment variables

Create a .env.local file in the home directory
```bash
touch .env.local
```

Then set the environment variables for PostgreSQL and the URL for the API

[user] is your personal username for your PostgreSQL instance

[passowrd] is your personal password for your PostgreSQL instance

Also, if you have changed the port that PostgreSQL runs on please subsitute the port number below
for your chosen port number, otherwise it should default to 5432

```text
PGUSER=[user]
PGHOST=localhost
PGDATABASE=my_notes_clone
PGPASSWORD=[password]
PGPORT=5432
NOTES_URL=http://localhost:3000/
```

First, run the development server:

```bash
npm run dev
```

If you would like to build and run the production server
```bash
npm run build && npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
