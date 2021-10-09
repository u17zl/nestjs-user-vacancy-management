import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UsersService } from '@@users/users.service';
import { User } from '@@users/schemas/user.schema';

var mongoose = require('mongoose');

const data = <User[]>[
  {
    _id: mongoose.Types.ObjectId('5e5df7f450571fb3aecdcf21'),
    companyId: mongoose.Types.ObjectId('5e5df7fc6953acd3dc50fe8f'),
    name: 'Bob Markle',
    username: 'bob',
    password: 'bob',
    role: 'user',
  },
  {
    _id: mongoose.Types.ObjectId('5e5df7f450571fb3aecdcf22'),
    companyId: mongoose.Types.ObjectId('5e5df7fc6953acd3dc50fe8f'),
    name: 'Mark Smith',
    username: 'mark',
    password: 'mark',
    role: 'admin',
  },
];

@Injectable()
export class UsersSeed {
  constructor(private readonly usersService: UsersService) {}

  @Command({
    command: 'create:users',
    describe: 'create seed users',
  })
  async create() {
    console.log(`emptying vacancies collection...`);
    const documents = await this.usersService.findAll();
    await this.usersService.batchDelete(documents.map(obj => obj._id));
    console.log(`emptying vacancies collection finished!`);

    console.log(`seeding vacancies...`);
    await this.usersService.batchCreate(data);
    console.log(`seeding vacancies finished!`);
  }
}
