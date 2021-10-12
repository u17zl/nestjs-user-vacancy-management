# Backend for Frontend (BFF) Server

## Description
BFF server for user login and signup, retriving users, posting and retriving companies and CRUD of vacancies
   
## Installation

```bash
$ npm install
```

## Running the app

```bash

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

## Schemas

```ts
type User {
  _id: String!
  name: String!
  username: String!
  role: Roles!
  companyId: String!
  company: Company!
}

enum Roles {
  admin
  user
}
```

```ts
type Company {
  _id: String!
  name: String!
  address: String!
  users: [User!]!
  vacancies: [Vacancy]!
}
```

```ts
type Vacancy {
  _id: String!
  title: String!
  description: String!
  expiredAt: DateTime!
  companyId: String!
  company: Company!
}
```

## Queries  
```ts
type Query {
  user(_id: String!): User!
  users: [User!]!
  companies: [Company!]!
  company(_id: String!): Company!
  vacancies: [Vacancy!]!
  vacancy(_id: String!): Vacancy!
}
```

## Mutations  
```ts
type Mutation {
  login(loginInput: LoginInput!): AccessToken!
  signup(createUserInput: CreateUserInput!): User!
  createCompany(createCompanyInput: CreateCompanyInput!): Company!
  createVacancy(createVacancyInput: CreateVacancyInput!): Vacancy!
  updateVacancy(updateVacancyInput: UpdateVacancyInput!): Vacancy!
  removeVacancy(_id: String!): Vacancy!
}
```

## Input Types  
```ts
input LoginInput {
  username: String!
  password: String!
}

input CreateUserInput {
  name: String!
  username: String!
  password: String!
  role: Roles = admin
  companyId: String!
}

input CreateCompanyInput {
  name: String!
  address: String!
}

input CreateVacancyInput {
  companyId: String!
  title: String!
  description: String!
  expiredAt: DateTime
}

input UpdateVacancyInput {
  title: String!
  description: String!
  expiredAt: DateTime
  _id: String!
}
```