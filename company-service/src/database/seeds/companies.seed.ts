import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { CompaniesService } from '@@companies/companies.service';
import { Company } from '@@companies/schemas/company.schema';

var mongoose = require('mongoose');

const data = <Company[]>[
  {
    _id: mongoose.Types.ObjectId('5e5df7fc6953acd3dc50fe8f'),
    name: 'PredictiveHire',
    address: '15 Newton St',
  }
];

@Injectable()
export class CompaniesSeed {
  constructor(private readonly companiesService: CompaniesService) {}

  @Command({
    command: 'create:companies',
    describe: 'create seed companies',
  })
  async create() {
    console.log(`empty companies collection...`);
    await this.companiesService.dropCollection();
    console.log(`seeding companies...`);
    await this.companiesService.create(data[0]);
    console.log(`seeding companies finished!`);
  }
}
