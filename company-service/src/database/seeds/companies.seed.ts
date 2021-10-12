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
    console.log(`emptying companies collection...`);
    const documents = await this.companiesService.findAll();
    await this.companiesService.batchDelete(documents.map(obj => obj._id));
    console.log(`emptying companies collection finished!`);

    console.log(`seeding companies...`);
    await this.companiesService.batchCreate(data);
    console.log(`seeding companies finished!`);
  }
}
