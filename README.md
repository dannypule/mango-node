# Node, Postgres, Babel starter seed project (https://github.com/dannypule)

# Babel setup from https://github.com/babel/example-node-server

## Prereqs

Node 8.9.4 or a higher LTS release

NPM 5.6.0 or higher

An `.env` file - speak to your project's maintainter or setup your
configuration. An example `.env-example` file is included with this project for
your reference.

## Getting started

`npm install`

`npm run dev` (run in dev mode)

`npm run debug` (run in debug mode)

## Setting up the database

This project is configured to run with an external Postgres database. Heroku
have a free add-on which you can use with an existing application.

When you have your postgres database details ready, enter them into the .env
file.

To seed the db with demo data, run this command `npm run setup:db`

View your database data using this test command
`http://localhost:5566/api/users`

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
```

If you have heroku installed you can view the logs of your app by typing
something like `heroku logs --app your-heroku-project` in the command line.

### Contributor(s) Danny Pule - open sourced under the MIT Liscense https://github.com/dannypule
