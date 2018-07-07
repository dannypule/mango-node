# Node, Postgres, Babel project starter (https://github.com/dannypule)

### This is a work in progress. I am actively contributing to this project.

## Prereqs

Node v8.11.2 or a higher LTS release

NPM 5.6.0 or higher

Setup your `.env` file. An example `.env-example` file is included with this project for
your reference. Assign values to the properties prefixed with `STAGING_DB_`.

## Getting started 

`npm install`

`npm run dev` (run in dev mode)

`npm run dev:local` (run in local dev mode)

## Setup Postgres DB in Docker

This command sets up a docker container then populates the db with mock data `npm run db:docker`

## Setting up the database with mock data

This project is configured to run with an external Postgres database. Heroku
have a free add-on which you can use with an existing application.

When you have your postgres database details, enter them into the .env
file.

To seed the db with demo data, run this command `npm run setup:db`

## Using the mock data

Login at `http://localhost:5566/api/auth/login` using:

```
{
  "email": "Super.Admin@fake-email.infoz",
  "password": "supersecure"
}
```

You will receive a Bearer token. Use this token in Postman or a similar application to add the following header:
`Authorization: Bearer token.goes.here`

View mock users using this test command `http://localhost:5566/api/users`

## Running the example tests

This application does not have full test coverage by any stretch but some unit and integrations tests have been setup to provide a baseline for further test coverage.

`npm run test` to run unit and jest tests in watch mode
`npm run test:c` to run unit and jest tests and generate a coverage report

## Heroku support

There is a Procfile setup for Heroku support.

package.json also has the following which tells Heroku which version of Node to
use:

```
"engines": {
  "node": "6.11.4"
},
```

Setup config vars in Heroku:

```
PROD_DB_USERNAME=yourdbusername
PROD_DB_PASSWORD=yourdbpassword
PROD_DB_DATABASE=yourdb
PROD_DB_HOST=yourdbhost
PROD_DB_SECRET=supersecret
PROD_JWT_ENCRYPTION=jwt_please_change
PROD_JWT_EXPIRATION=2592000000
```

If you have heroku installed you can view the logs of your app by typing
something like `heroku logs --app your-heroku-project` in the command line.

### Contributor(s) Danny Pule - open sourced under the MIT Liscense https://github.com/dannypule
