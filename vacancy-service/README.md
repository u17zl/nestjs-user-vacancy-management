# Vacancy Service

## Description
Vacancy service for posting, retriving, updating and deleting vacancies
   
## Installation

```bash
$ npm install
```

## Running the app

```bash
# seed users
$ npm run seed:vacancies

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

#### Create a new vacancy  
`POST /vacancies`

#### Get all vacancies  
`GET /vacancies`

#### Get a vacancy by vacancy id  
`GET /vacancies/:vacancyId`

#### Update a vacancy by vacancy id  
`PUT /vacancies/:vacancyId`

#### Delete a vacancy by vacancy id  
`DELETE /vacancies/:vacancyId`