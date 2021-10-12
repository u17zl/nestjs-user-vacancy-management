# nestjs-user-vacancy-management

## Description

A users, companies and vacancies management project deveoped with Nestjs, GraphQL, mongoDB and docker.  
A BFF server connected with 3 services (users, companies, vacancies) achieving the functionalities of user login and signup, retriving users, posting and retriving companies and CRUD of vacancies.

## Infrastructure

<img src="assets/infrastructure.png?raw=true" width="600" alt="Project Infrastructure">

## Database Model
<img src="assets/database_model.png?raw=true" width="500" alt="Database Model">

## Tech Specifications

1. Use Nestjs CLI generate RESTful and GraphQL resources
2. Use `ConfigService` to setup environment varibales in different stage
3. Use `AuthGuard` to serve protected the controller or the router
4. Use `Passport` local strategy and jwt strategy for authentication and authorization.
5. Use schema provider to hook `pre save` on saving hashed password 
6. Use Interceptor to set `authorization` bearer token to HttpService
7. Use `nestjs-command` to write seeding scripts
8. Use `docker` to containerize app and support hot reload development
9. Use `docker` to manage multi-stage environment varibales  


## Installation

```bash
# container build
$ docker-compose --env-file .env.development build

# seed users
$ docker-compose --env-file .env.development exec user-service npm run seed:users

# seed companies
$ docker-compose --env-file .env.development exec company-service npm run seed:companies

# seed vacancies
$ docker-compose --env-file .env.development exec vacancy-service npm run seed:vacancies

# run all services
$ docker-compose --env-file .env.development up

```

## GraphQL Playground

GraphQL playground is running at [https://locahost:3000/graphql](https://locahost:3000/graphql)

For more GraphQL documentations, please check out here [here](/user-service/README.md)

## Stories 

### Preparation work:
Please login first: 
```ts
mutation {
  login(loginInput: {username: "mark", password: "mark"}) {
    accessToken
  }
}
``` 

Set the `accessToken` to header:  
```
{"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTVkZjdmNDUwNTcxZmIzYWVjZGNmMjEiLCJ1c2VybmFtZSI6ImJvYiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjM0MDAyODExLCJleHAiOjE2MzQwMDY0MTF9.eXMkx8JjSibc-AEiHGSGZvO11MEDFF4DIx823q6oNRc"}
```

- [x] 1. A company has a name and address

```ts
query {
  company(_id: "5e5df7fc6953acd3dc50fe8f"){
    name
    address
  }
}
```

- [x] 2. A company can have multiple job vacancies

```ts
query {
  company(_id: "5e5df7fc6953acd3dc50fe8f"){
    name
    address
    vacancies{
      title
      description
    }
  }
}
```

- [x] 3. A company has many users

```ts
query {
  company(_id: "5e5df7fc6953acd3dc50fe8f"){
    name
    address
    users{
      name
    }
  }
}
```

- [x] 4. A vacancy has a title, description, expiredAt (datetime)

```ts
query{
  vacancy(_id: "vacancyId"){
    title,
    description,
    expiredAt
  }
}
```

- [x] 5. A user has a name, username, password(omitted)

```ts
query {
  users{
    name
    username
  }
}
```

- [x] 6. A user belongs to one company only

```ts
query {
  users{
    name
    companyId
  }
}
```

- [x] 7. A user can have two types of roles: user and admin

```ts
query {
  users{
    name
    role
  }
}
```

- [x] 8. A user with an admin role can view, create, edit, and delete vacancies

```ts
mutation{
  createVacancy(
		createVacancyInput:
			{
				_id: "vacancyId",
				title:"Frontend",
				description:"Frontend developer",
				expiredAt: "2021-10-08T02:41:36.667+00:00",
				companyId: "5e5df7fc6953acd3dc50fe8f"
			}
	){
		_id,
  }
}

mutation{
  updateVacancy(
		updateVacancyInput:
			{
				_id: "vacancyId",
				title:"Frontend",
				description:"Frontend developer",
				expiredAt: "2021-10-08T02:41:36.667+00:00"
			}
	){
		_id,
  }
}

mutation{
  removeVacancy(_id: "vacancyId"){
    _id,
  }
}
```

Return `403` http status code if not permitted

- [x] 9. A user without an admin role can view job vacancies only  
     By checking if the role is admin or user

- [x] 10. A user has to login first before doing any operation  
      Return `401` http status code if not login
