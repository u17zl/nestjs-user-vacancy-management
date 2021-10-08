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
    console.log(`empty users collection...`);
    await this.usersService.dropCollection('users');
    console.log(`seeding users...`);
    await this.usersService.create(data[0]);
    await this.usersService.create(data[1]);
    console.log(`seeding users finished!`);
  }
}
