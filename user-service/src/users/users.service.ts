import { Injectable } from '@nestjs/common';
import { Model, Mongoose } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username: username }).select("+password").exec();
  }

  async findAll(query): Promise<User[]> {
    if (query.companyId) {
      query.companyId = new mongoose.Types.ObjectId(query.companyId);
    }
    return this.userModel.find(query).exec();
  }

  async dropCollection(name:string): Promise <void> {
    return this.userModel.db.dropCollection(name);
  }
}
