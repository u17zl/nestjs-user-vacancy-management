# nestjs-user-vacancy-management

## Description

A users, companies and vacancies management project developed with Nestjs, GraphQL, mongoDB and docker.  

A BFF server connected with 3 services (users, companies, vacancies) achieving the functionalities of user login and signup, retrieving users, posting and retrieving companies and CRUD of vacancies.

## Infrastructure

<img src="assets/infrastructure.png?raw=true" width="600" alt="Project Infrastructure">

## Database Model
<img src="assets/database_model.png?raw=true" width="500" alt="Database Model">

## Tech Specifications

1. Use Nestjs CLI to generate RESTful and GraphQL resources
2. Use `ConfigService` to centralize environment variables in different stages
3. Use `AuthGuard` and `RolesGuard` to decorate protected controllers or the routers
4. Use `Passport` local strategy and JWT strategy for authentication and authorization.
5. Use `schemaProvider` to hook 'pre save' to save hashed password 
6. Use Interceptor to set `authorization` bearer token to HttpService
7. Use `nestjs-command` to run seeding scripts
8. Use `docker` to containerize the app and support hot reload development 
10. Use `Jest` to unit test


## Installation

```bash
# container build
$ cp .env.development .env && docker-compose up

# switch to another terminal
# seed users
$ docker-compose exec user-service npm run seed:users

# seed companies
$ docker-compose exec company-service npm run seed:companies

# seed vacancies
$ docker-compose exec vacancy-service npm run seed:vacancies
```

## GraphQL Playground

GraphQL playground is running at [http://locahost:3000/graphql](http://locahost:3000/graphql)

For more GraphQL documentations, please check out here [here](/bff-server/README.md)

## User Stories 

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
{"Authorization": "Bearer accessToken"}
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
