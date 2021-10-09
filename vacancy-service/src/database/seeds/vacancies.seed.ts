import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { VacanciesService } from '@@vacancies/vacancies.service';
import { Vacancy } from '@@vacancies/schemas/vacancy.schema';
import { name as fakerName, date as fakerDate } from 'faker';

var mongoose = require('mongoose');

const data = <Vacancy[]>[
  {
    companyId: mongoose.Types.ObjectId('5e5df7fc6953acd3dc50fe8f'),
    title: fakerName.jobTitle(),
    description: fakerName.jobDescriptor() + ' ' + fakerName.jobArea(),
    expiredAt: fakerDate.between('2021-10-01', '2021-11-01'),
  },
  {
    companyId: mongoose.Types.ObjectId('5e5df7fc6953acd3dc50fe8f'),
    title: fakerName.jobTitle(),
    description: fakerName.jobDescriptor() + ' ' + fakerName.jobArea(),
    expiredAt: fakerDate.between('2021-10-01', '2021-11-01'),
  },
  {
    companyId: mongoose.Types.ObjectId('5e5df7fc6953acd3dc50fe8f'),
    title: fakerName.jobTitle(),
    description: fakerName.jobDescriptor() + ' ' + fakerName.jobArea(),
    expiredAt: fakerDate.between('2021-10-01', '2021-11-01'),
  },
  {
    companyId: mongoose.Types.ObjectId('5e5df7fc6953acd3dc50fe8f'),
    title: fakerName.jobTitle(),
    description: fakerName.jobDescriptor() + ' ' + fakerName.jobArea(),
    expiredAt: fakerDate.between('2021-10-01', '2021-11-01'),
  },{
    companyId: mongoose.Types.ObjectId('5e5df7fc6953acd3dc50fe8f'),
    title: fakerName.jobTitle(),
    description: fakerName.jobDescriptor() + ' ' + fakerName.jobArea(),
    expiredAt: fakerDate.between('2021-10-01', '2021-11-01'),
  }
];

@Injectable()
export class VacanciesSeed {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @Command({
    command: 'create:vacancies',
    describe: 'create seed vacancies',
  })
  async create() {
    console.log(`emptying vacancies collection...`);
    const documents = await this.vacanciesService.findAll();
    await this.vacanciesService.batchDelete(documents.map(obj => obj._id));
    console.log(`emptying vacancies collection finished!`);

    console.log(`seeding vacancies...`);
    await this.vacanciesService.batchCreate(data);
    console.log(`seeding vacancies finished!`);
  }
}
