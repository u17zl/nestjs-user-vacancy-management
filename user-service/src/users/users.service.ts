import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

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

  async findAll(query?): Promise<User[]> {
    return this.userModel.find(query).exec();
  }

  async batchCreate(createUserDto: CreateUserDto[]) {
    return this.userModel.create(createUserDto);
  }

  async batchDelete(_ids: string[]) {
    return this.userModel.deleteMany({ _id: { $in: _ids } });
  }
}
