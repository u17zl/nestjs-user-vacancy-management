import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from '@@auth/auth.controller';
import { AuthService } from '@@auth/auth.service';
import { UsersService } from '@@users/users.service';
import { User } from '@@users/schemas/user.schema';
import { CreateUserDto } from '@@users/dto/create-user.dto';
import { LoginUserDto } from '@@users/dto/login-user.dto';
import mockUsers from '@@database/mocks/users.mock';

jest.mock('@@users/users.service');

jest.mock('@@auth/auth.service');

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let usersService: UsersService;
  let mockUser: User;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AuthController],
      providers: [AuthService, UsersService],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
    usersService = moduleRef.get<UsersService>(UsersService);
    mockUser = mockUsers[0];

    jest.clearAllMocks();
  });

  it('authController should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('authService should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('authService should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('mockUser should be defined', () => {
    expect(mockUser).toBeDefined();
  });

  describe('User signup', () => {
    describe('when signup is called', () => {
      let user: User;
      let createUserDto: CreateUserDto;

      beforeEach(async () => {
        createUserDto = {
          name: 'kevin',
          username: 'kevin',
          password: 'kevin',
          companyId: '5e5df7fc6953acd3dc50fe8f',
          role: 'admin',
        };
        user = await authController.signup(createUserDto);
      });

      test('then it should call usersService', () => {
        expect(usersService.create).toBeCalledWith(createUserDto);
      });
    });
  });

  describe('User login', () => {
    describe('when login is called', () => {
      let loginUserDto: LoginUserDto;
      beforeEach(async () => {
        loginUserDto = {
          username: 'bob',
          password: '123456',
        };
        await authController.login(loginUserDto);
      });

      test('then it should call usersService', () => {
        expect(authService.login).toBeCalled();
      });
    });
  });

  describe('Check logged in', () => {
    const jwt = 'jwt';
    beforeEach(async () => {
      authController.loggedIn({ jwt });
    });

    test('then it should call authService validateToken', () => {
      expect(authService.validateToken).toBeCalledWith(jwt);
    });
  });
});
