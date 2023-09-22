# Superb coding exercise

# Restaurant Reservation API

This repository contains an example implementation of a restaurant table reservation API using Node.js.

## BE part

Provided exercise is an example implementation of API based on NodeJS. This API operate over restaurant table reservations, tables and restaurant data.

To get started, ensure you are running nodeJS 18.17.1 LTS.

Stability is not guaranteed if you are using older versions of NodeJS.

1. [Requirements](#requirements)

2. [Installation](#installation)

3. [Environment in .env](#environment)

4. [API](#api)

5. [Features](#features)

6. [Todos](#todos)

## Requirements

- Node.js 18.17.1

- WSL/Linux/MacOS

- Yarn 1.22.5

- Up and running MongoDB instance of your choice

## Installation

To install dependencies, run the following command:

`bash yarn`

Paste your MongoDB connections tring to the `.env` file, save.

To start the application in development mode with nodemon, use:

`bash yarn dev`

Or dev build with `yarn build` and `yarn start` commands. The app will appear on localhost:3001 by default.

Another way to run setup - simply build a docker image out of provided Dockerfile

## Environment

There are several env vars, which the service can be adjusted with:

| var             | effect                                                                                                                                                     |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PORT            | Integer, the port on which the service will be set up                                                                                                      |
| TOKEN_KEY       | String, used as a salt/seed for jwt auth                                                                                                                   |
| DEMO            | 0/1 cast to Boolean, non nullish variable that exposes /deo route, once called - propagates your MongoDB instance with simple data to operate with         |
| INIT_ADMIN_PASS | If DEMO env variable is set, INIT_ADMIN_PASS will hold initial admin password to log in to app. By default username is 'admin' and password is 'admin' too |
| MONGODB_URL     | mongodb connection string                                                                                                                                  |

My default dev config is:

        PORT=3001
        TOKEN_KEY=dummy
        DEMO=1
        INIT_ADMIN_PASS=admin
        MONGODB_URL=mongodb+srv://username:dom.net/DBName?retryWrites=true&w=majority

## API

Default base URL for the API is http://localhost:3001

The implemented api holds the very basic jwt-driven auth with immortal token which once given never expires. For auth you can use /login route to get your jwt access token, by calling /introspect you can validate your token.

All routes except /login, /introspect, /demo are protected, meaning you need to have an `authorization` header to be present.

Check `src/router/index.ts` for full routes list.

Applied middlewares are in `src/index.ts`

## Features

### TypeScript v5.

App is covered by TS with all files it has.

That makes code self-descriptive and robust. Consider it as musthave.

### AJV request validation.

All routes are covered with custom ajv validation.

Iplemented approach allows to have a trustful validated payloads in request. Schema validation features TS TypeGuards and provides seamless integration to TS code

NOTE: ajv json schemas are built with `typescript-json-schema` with usage of script: `create-schemas`

### Auth and Access controll.

App holds a very basic jwt auth and validation, but this very small feature allows to segregate users by contexts and implement access controll: users have their own origin and cant access resources that do not belong them.

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

1. jsonschema-to-swagger

2. redis for caching users

3. removeTable controller should have a transactional mongoDB call

4. unit test coverage to be at 80%

5. loadtesting (artillery)
