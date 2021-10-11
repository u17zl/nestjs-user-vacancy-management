import { Module, forwardRef } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { CompaniesModule } from '@@companies/companies.module';

@Module({
  imports: [HttpModule, forwardRef(() => CompaniesModule)],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
