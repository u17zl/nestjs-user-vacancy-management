import { forwardRef, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { UsersModule } from '@@users/users.module';
import { VacanciesModule } from '@@vacancies/vacancies.module';
import { CompaniesService } from './companies.service';
import { CompaniesResolver } from './companies.resolver';

@Module({
  imports: [
    HttpModule,
    forwardRef(() => UsersModule),
    forwardRef(() => VacanciesModule),
  ],
  providers: [CompaniesResolver, CompaniesService],
  exports: [CompaniesService]
})
export class CompaniesModule {}
