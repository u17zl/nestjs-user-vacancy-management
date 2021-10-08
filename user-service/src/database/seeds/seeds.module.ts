import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';

import { UsersModule } from '@@users/users.module';
import { UsersSeed } from './users.seed';

@Module({
    imports: [CommandModule, UsersModule],
    providers: [UsersSeed],
    exports: [UsersSeed],
})
export class SeedsModule {}