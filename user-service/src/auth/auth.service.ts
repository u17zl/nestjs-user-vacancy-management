import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

import { UsersService } from '@@users/users.service';
import { LoginUserDto } from '@@users/dto/login-user.dto';
import { User } from '@@users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginUserDto: LoginUserDto): Promise<User | null> {
    const { username, password } = loginUserDto;

    console.log('local')
    const user = await this.usersService.findOneByUsername(username);
    if (compareSync(password, user?.password)) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { sub: user._id, username: user.username, role: user.role };
    return this.jwtService.sign(payload);
  }

  validateToken(jwt: string) {
    return this.jwtService.verify(jwt);
  }
}
