import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { VacanciesService } from '@@vacancies/vacancies.service';
import mockVacancies from '@@database/mocks/vacancies.mock';

@Injectable()
export class VacanciesSeed {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @Command({
    command: 'create:vacancies',
    describe: 'create seed vacancies',
  })
  async create() {
    console.log(`emptying vacancies collection...`);
    const documents = await this.vacanciesService.find();
    await this.vacanciesService.batchDelete(documents.map(obj => obj._id));
    console.log(`emptying vacancies collection finished!`);

    console.log(`seeding vacancies...`);
    await this.vacanciesService.batchCreate(mockVacancies);
    console.log(`seeding vacancies finished!`);
  }
}
