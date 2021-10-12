import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UsersService } from '@@users/users.service';
import mockUsers from '@@database/mocks/users.mock';

@Injectable()
export class UsersSeed {
  constructor(private readonly usersService: UsersService) {}

  @Command({
    command: 'create:users',
    describe: 'create seed users',
  })
  async create() {
    console.log(`emptying users collection...`);
    const documents = await this.usersService.find();
    await this.usersService.batchDelete(documents.map(obj => obj._id));
    console.log(`emptying users collection finished!`);

    console.log(`seeding users...`);
    await this.usersService.batchCreate(mockUsers);
    console.log(`seeding users finished!`);
  }
}
