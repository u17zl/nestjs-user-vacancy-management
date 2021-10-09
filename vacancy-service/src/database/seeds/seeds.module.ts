import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';

import { VacanciesModule } from '@@vacancies/vacancies.module';
import { VacanciesSeed } from './vacancies.seed';

@Module({
    imports: [CommandModule, VacanciesModule],
    providers: [VacanciesSeed],
    exports: [VacanciesSeed],
})
export class SeedsModule {}