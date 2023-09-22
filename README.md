# Superb coding exercise

## BE part

Provided exercise is an example implementation of API based on NodeJS. This API operate over restaurant table reservations, tables and restaurant data.

To get started, ensure you are running nodeJS 18.17.1 LTS.
Stability is not guaranteed if you are using older versions of NodeJS.

1.  [Requirements](##Requirements)
2.  [Installation](##Installation)
3.  [Environment in .env](##Environment in .env)
4.  [API](##API)
5.  [Features](##Features)
6.  [Todos](##Todos)

## Requirements

1.  nodejs 18.17.1
2.  WSL/Linux/MacOS
3.  yarn 1.22.5
4.  Up and running MongoDB instance of your choice

## Installation

To install dependencies use `yarn`.

Paste your MongoDB connections tring to the `.env` file, save.

Once done just simply run `yarn dev`, to run dev mode with nodemon daemon.
Or dev build with `yarn build` and `yarn start` commands. The app will appear on localhost:3001 by default.

Another way to run setup - simply build a docker image out of provided Dockerfile

## Environment in .env

There are several env vars, which the service can be adjusted with:

| var             | effect                                                                                                                                                     |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PORT            | Integer, the port on which the service will be set up                                                                                                      |
| TOKEN_KEY       | String, used as a salt/seed for jwt auth                                                                                                                   |
| DEMO            | Cast to Boolean, non nullish variable that exposes /deo route, once called - propagates your MongoDB instance with simple data to operate with             |
| INIT_ADMIN_PASS | If DEMO env variable is set, INIT_ADMIN_PASS will hold initial admin password to log in to app. By default username is 'admin' and password is 'admin' too |
| MONGODB_URL     | mongodb connection string                                                                                                                                  |

My default dev config is:

PORT=3001
TOKEN_KEY=dummy
DEMO=1
INIT_ADMIN_PASS=admin
MONGODB_URL=mongodb+srv://username:dom.net/DBName?retryWrites=true&w=majority

## API

The implemented api holds the very basic jwt-driven auth with immortal token which once given never expires. For auth you can use /login route to get your jwt access token, by calling /introspect you can validate your token.

All routes except /login, /introspect, /demo are protected, meaning you need to have an `authorization` header to be present.

Check `src/router/index.ts` for full routes list.
Applied middlewares are in `src/index.ts`

## Features

### TypeScript v5.

App is covered by TS with al files it has.

### AJV request validation.

All routes are covered with custom ajv validation.
Iplemented approach allows to have a trustful validated payloads in request. Schema validation features TS TypeGuards and provides seamless integration to TS code

NOTE: ajv json schemas are built with `typescript-json-schema` with usage of script: `create-schemas`

### Auth and Access controll.

App holds a very basic ajv auth and validation, but this very small feature allows to segregate users by contexts and implement access controll: users have their own origin and cant access resources that do not belong them.

Check middlewares `src/middlewares/auth.ts` and `src/middlewares/accessControll.ts` for the details

### Tests

Using jest to briefly show an idea of unoit test suits over the app. Yet the coverage is close to 0%, it shows the basic idea of testing functions over the app.

Run `yarn jest` to check.

### Linting rules.

As long as TS is used over the app, linting is a bit tricky, but still present. Should be on board whenever you fully install deps.

### Containerization.

Simple docker packaging is ootb.

### Docs.

Well, there are not so much docs for the api. I hope TS typing, ajv schemas actually replace the docs but as TODO I had a jsonschema-to-swagger. Could be worth a try.

## TODOS

1.  jsonschema-to-swagger
2.  redis for caching users
3.  removeTable controller should have a transactional mongoDB call
4.  unit test coverage to be at 80%
5.  loadtesting (artillery)
