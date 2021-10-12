import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { User } from '@@users/schemas/user.schema';
import { UsersController } from '@@users/users.controller';
import { UsersService } from '@@users/users.service';
import mockUsers from '@@database/mocks/users.mock';

jest.mock('@@users/users.service');

jest.mock('@@auth/auth.service');

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let mockUser: User;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: { findById: jest.fn(), find: jest.fn() },
        },
      ],
    }).compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
    mockUser = mockUsers[0];

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('getUser', () => {
    describe('when getUser is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await usersController.getUser(mockUser._id);
      });

      test('then it should call usersService', () => {
        expect(usersService.findById).toBeCalledWith(mockUser._id);
      });
    });
  });

  describe('getUsers', () => {
    describe('when getUsers is called', () => {
      let users: User[];

      beforeEach(async () => {
        users = await usersController.getUsers();
      });

      test('then it should call usersService', () => {
        expect(usersService.find).toBeCalled();
      });
    });
  });
});
