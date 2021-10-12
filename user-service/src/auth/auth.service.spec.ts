import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';

import { UsersService } from '@@users/users.service';
import { AuthService } from '@@auth/auth.service';
import { User, UserSchema } from '@@users/schemas/user.schema';
import { LoginUserDto } from '@@users/dto/login-user.dto';
import mockUsers from '@@database/mocks/users.mock';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let usersService: UsersService;
  let userModel;
  let mockUser: User;

  beforeEach(async () => {
    userModel = mongoose.model(User.name, UserSchema);

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: { sign: jest.fn(), verify: jest.fn() },
        },
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: userModel,
        },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    jwtService = moduleRef.get<JwtService>(JwtService);
    usersService = moduleRef.get<UsersService>(UsersService);
    mockUser = mockUsers[0];
  });

  it('authService should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('jwtService should be defined', () => {
    expect(jwtService).toBeDefined();
  });

  it('usersService should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('userModel should be defined', () => {
    expect(userModel).toBeDefined();
  });

  it('mock user should be defined', () => {
    expect(mockUser).toBeDefined();
  });

  it('should get user validation by username', async () => {
    let loginUserDto: LoginUserDto;
    loginUserDto = {
      username: mockUser.username,
      password: mockUser.password,
    };
    const findUsername = jest.spyOn(usersService, 'findOneByUsername');
    const findOne = jest.spyOn(userModel, 'findOne');
    authService.validateUser(loginUserDto);

    expect(findUsername).toBeCalledWith(mockUser.username);
    expect(findOne).toBeCalledWith({ username: mockUser.username });
  });

  it('should get jwt token', async () => {
    const payload = {
      sub: mockUser._id,
      username: mockUser.username,
      role: mockUser.role,
    };
    const sign = jest.spyOn(jwtService, 'sign');
    authService.login({ username: mockUser._id } as unknown as User);

    expect(sign).toBeCalled();
  });

  it('should verify jwt token', async () => {
    const verify = jest.spyOn(jwtService, 'verify');
    const jwt = 'jwt';
    authService.validateToken(jwt);

    expect(verify).toBeCalledWith(jwt);
  });
});
