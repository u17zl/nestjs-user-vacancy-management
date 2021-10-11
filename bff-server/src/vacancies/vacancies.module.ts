import { forwardRef, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { CompaniesModule } from '@@companies/companies.module';
import { VacanciesService } from './vacancies.service';
import { VacanciesResolver } from './vacancies.resolver';

@Module({
  imports: [HttpModule, forwardRef(() => CompaniesModule)],
  providers: [VacanciesResolver, VacanciesService],
  exports: [VacanciesService],
})
export class VacanciesModule {}
