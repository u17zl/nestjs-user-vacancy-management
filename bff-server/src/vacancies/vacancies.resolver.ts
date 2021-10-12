import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { Types } from 'mongoose';

import { CompaniesService } from '@@companies/companies.service';
import { VacanciesService } from './vacancies.service';
import { Vacancy } from '@@vacancies/models/vacancy.model';
import { CreateVacancyInput } from './dto/create-vacancy.input';
import { UpdateVacancyInput } from './dto/update-vacancy.input';


@Resolver(() => Vacancy)
export class VacanciesResolver {
  constructor(private readonly vacanciesService: VacanciesService, private readonly companiesService: CompaniesService) {}

  @Mutation(() => Vacancy)
  async createVacancy(@Args('createVacancyInput') createVacancyInput: CreateVacancyInput) {
    return this.vacanciesService.create(createVacancyInput);
  }

  @Query(() => [Vacancy], { name: 'vacancies' })
  findAll() {
    return this.vacanciesService.findAll();
  }

  @Query(() => Vacancy, { name: 'vacancy' })
  findOne(@Args('_id', { type: () => String }) id: Types.ObjectId) {
    return this.vacanciesService.findOne(id);
  }

  @Mutation(() => Vacancy)
  async updateVacancy(
    @Args('updateVacancyInput') updateVacancyInput: UpdateVacancyInput
  ) {
    return this.vacanciesService.update(updateVacancyInput._id, updateVacancyInput);
  }

  @Mutation(() => Vacancy)
  removeVacancy(@Args('_id', { type: () => String }) id: Types.ObjectId) {
    return this.vacanciesService.remove(id);
  }

  @ResolveField()
  async company(@Parent() vacancy: Vacancy) {
    return this.companiesService.findOne(vacancy.companyId);
  }
}
