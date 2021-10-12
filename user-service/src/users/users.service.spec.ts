import * as mongoose from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';
import mockUsers from '@@database/mocks/users.mock';

describe('UsersService', () => {
  let service: UsersService;
  let userModel;
  let mockUser: User;

  beforeEach(async () => {
    userModel = mongoose.model(User.name, UserSchema);
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: userModel,
        },
      ],
    }).compile();

    service = moduleRef.get<UsersService>(UsersService);
    mockUser = mockUsers[0];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('userModel should be defined', () => {
    expect(userModel).toBeDefined();
  });

  it('mockUser should be defined', () => {
    expect(mockUser).toBeDefined();
  });

  it('should call the userModel findOne', () => {
    const findOne = jest.spyOn(userModel, 'findOne');
    service.findById(mockUser._id);
    expect(findOne).toBeCalled();
  });

  it(' should call the userModel find', () => {
    const find = jest.spyOn(userModel, 'find');
    service.find();
    expect(find).toBeCalled();
  });

  test('then it should call the userModel create', () => {
    let createUserDto: CreateUserDto;
    createUserDto = mockUser;
    const create = jest.spyOn(userModel.prototype, 'save');
    service.create(createUserDto);

    expect(create).toBeCalledTimes(1);
  });
});
