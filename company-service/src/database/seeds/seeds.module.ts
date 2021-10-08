import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';

import { CompaniesModule } from '@@companies/companies.module';
import { CompaniesSeed } from './companies.seed';

@Module({
    imports: [CommandModule, CompaniesModule],
    providers: [CompaniesSeed],
    exports: [CompaniesSeed],
})
export class SeedsModule {}