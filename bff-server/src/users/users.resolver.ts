import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Args,
  Mutation,
  Context,
} from '@nestjs/graphql';
import { UseInterceptors } from '@nestjs/common';
import { AccessToken, User } from '@@users/models/user.model';
import { UsersService } from '@@users/users.service';
import { CompaniesService } from '@@companies/companies.service';

import { LoginInput } from './dto/login.input';
import { CreateUserInput } from './dto/create-user.input';
import { Types } from 'mongoose';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly companiesService: CompaniesService,
  ) {}

  @Mutation(() => AccessToken, { name: 'login' })
  async login(@Args('loginInput') loginInput: LoginInput) {
    return this.usersService.login(loginInput);
  }

  @Mutation(() => User, { name: 'signup' })
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.createUser(createUserInput);
  }

  @Query(() => User, { name: 'user' })
  async getUser(@Args('_id', { type: () => String }) id: Types.ObjectId) {
    return this.usersService.findOne(id);
  }

  @Query(() => [User], { name: 'users' })
  async getAllusers() {
    return this.usersService.findAll();
  }

  @ResolveField()
  async company(@Parent() user: User) {
    return this.companiesService.findOne(user.companyId);
  }
}
