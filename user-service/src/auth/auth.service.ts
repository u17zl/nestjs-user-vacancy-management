import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

import { UsersService } from '@@users/users.service';
import { User } from '@@users/schemas/user.schema';
import { CreateUserDto } from '@@users/dto/create-user.dto';
import { LoginUserDto } from '@@users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginUserDto: LoginUserDto): Promise<User | null> {
    try {
      const { username, password } = loginUserDto;
      const user = await this.usersService.findOneByUsername(username);
      if (!user) {
        throw new NotFoundException();
      }
      if (compareSync(password, user?.password)) {
        return user;
      }
      return null;
    } catch {
      throw new BadRequestException();
    }
  }

  login(user: User) {
    const payload = { sub: user._id, username: user.username, role: user.role };
    return { accessToken: this.jwtService.sign(payload) };
  }

  validateToken(jwt: string) {
    if (this.jwtService.verify(jwt)) {
      return this.jwtService.decode(jwt);
    } else {
      return false;
    }
  }
}
