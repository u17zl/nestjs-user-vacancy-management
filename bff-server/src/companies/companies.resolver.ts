import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { Types } from 'mongoose';

import { CompaniesService } from './companies.service';
import { Company } from '@@companies/models/company.model';
import { CreateCompanyInput } from './dto/create-company.input';
import { UsersService } from '@@users/users.service';
import { VacanciesService } from '@@vacancies/vacancies.service';

@Resolver(() => Company)
export class CompaniesResolver {
  constructor(private readonly companiesService: CompaniesService,
    private readonly usersService: UsersService,
    private readonly vacanciesService: VacanciesService,) {}

  @Mutation(() => Company)
  createCompany(@Args('createCompanyInput') createCompanyInput: CreateCompanyInput) {
    return this.companiesService.create(createCompanyInput);
  }

  @Query(() => [Company], { name: 'companies' })
  findAll() {
    return this.companiesService.findAll();
  }

  @Query(() => Company, { name: 'company' })
  findOne(@Args('_id', { type: () => String }) id: Types.ObjectId) {
    return this.companiesService.findOne(id);
  }

  @ResolveField()
  async users(@Parent() company: Company) {
    return this.usersService.findByCompanyId(company._id);
  }

  @ResolveField()
  async vacancies(@Parent() company: Company) {
    return this.vacanciesService.findByCompanyId(company._id);
  }
}
