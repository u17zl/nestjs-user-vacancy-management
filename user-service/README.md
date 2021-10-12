# User Service

## Description
User service for login, signup and retriving users  
  
## Installation

```bash
$ npm install
```

## Running the app

```bash
# seed users
$ npm run seed:users

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Endpoints  

#### User login  
`POST /auth/login`  

#### User signup  
`POST /auth/signup`

#### Get all users  
`GET /users`

#### Get user by user ObjectId  
`GET /users/:user_id`