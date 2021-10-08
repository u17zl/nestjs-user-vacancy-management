import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';

import { UsersModule } from '@@users/users.module';
import { UsersService } from '@@users/users.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { User } from '@@users/schemas/user.schema';

describe('AuthService', () => {
  const USERNAME = 'bob';

  let authService: AuthService;
  let jwtService: JwtService;
  let jwtStrategy: JwtStrategy;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get('jwt_secret'),
            signOptions: { expiresIn: '1h' },
          }),
        }),
      ],
      providers: [AuthService, UsersService, JwtService, LocalStrategy, JwtStrategy],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    jwtService = moduleRef.get<JwtService>(JwtService);
    jwtStrategy = moduleRef.get<JwtStrategy>(JwtStrategy);
    usersService = moduleRef.get<UsersService>(UsersService);
  });

  it('authService should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('jwtService should be defined', () => {
    expect(jwtService).toBeDefined();
  });

  it('jwtStrategy should be defined', () => {
    expect(jwtStrategy).toBeDefined();
  });

  it('usersService should be defined', () => {
    expect(usersService).toBeDefined();
  });

  test('should get user validation by credentials', () => {
      const password = 'bob';
      void authService.validateUser({username: USERNAME, password});

      expect(usersService.findOneByUsername).toHaveBeenCalledWith({username: USERNAME, password});
  });

  it('should get jwt token', async () => {
    const sub = 'id';
    void authService.login({ username: USERNAME, sub: sub } as unknown as User);

    expect(jwtService.sign).toHaveBeenCalledWith({ username: USERNAME, sub: sub });
  });

  describe('validate', () => {
    test('should validate and returns the user based on JWT payload', async () => {
        const user = { username: USERNAME };

        (usersService.findOneByUsername as jest.Mock).mockResolvedValue(user);

        const result = await jwtStrategy.validate({ sub: 'sub', username: USERNAME });

        expect(usersService.findOneByUsername).toHaveBeenCalledWith(USERNAME);
        expect(result).toEqual(user);
    });

    test('throws an unauthorized exception as user cannot be found', () => {
        (usersService.findOneByUsername as jest.Mock).mockResolvedValue(null);

        void expect(jwtStrategy.validate({ sub: 'sub', username: USERNAME })).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('validateUser', () => {

    it('should return a user object when credentials are valid', async () => {
      const res = await authService.validateUser({
        username: 'bob',
        password: 'bob',
      });
      expect(res.username).toEqual('bob');
    });
  
    it('should return null when credentials are invalid', async () => {
      const res = await authService.validateUser({
        username: 'xxx',
        password: 'xxx',
      });
      expect(res).toBeNull();
    });
  });

});



