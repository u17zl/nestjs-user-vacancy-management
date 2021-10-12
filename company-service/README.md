# Company Service

## Description
Company service for posting and retriving companies  
   
## Installation

```bash
$ npm install
```

## Running the app

```bash
# seed users
$ npm run seed:companies

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

#### Create a new company  
`POST /companies`

#### Get all companies  
`GET /companies`

#### Get a company by company id  
`GET /companies/:companyId`