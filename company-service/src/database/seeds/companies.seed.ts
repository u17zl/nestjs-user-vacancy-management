import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { CompaniesService } from '@@companies/companies.service';
import mockCompanies from '@@database/mocks/companies.mock';

@Injectable()
export class CompaniesSeed {
  constructor(private readonly companiesService: CompaniesService) {}

  @Command({
    command: 'create:companies',
    describe: 'create seed companies',
  })
  async create() {
    console.log(`emptying companies collection...`);
    const documents = await this.companiesService.find();
    await this.companiesService.batchDelete(documents.map(obj => obj._id));
    console.log(`emptying companies collection finished!`);

    console.log(`seeding companies...`);
    await this.companiesService.batchCreate(mockCompanies);
    console.log(`seeding companies finished!`);
  }
}
