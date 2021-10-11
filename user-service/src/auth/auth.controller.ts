import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AuthService } from '@@auth/auth.service';
import { LocalAuthGuard } from '@@auth/guards/local-auth.guard';
import { CreateUserDto } from '@@users/dto/create-user.dto';
import { UsersService } from '@@users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log(req)
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto,) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern({ role: 'auth', cmd: 'check' })
  async loggedIn(data) {
    try {
      const res = this.authService.validateToken(data.jwt);
      console.log(res)
      return res;
    } catch(e) {
      return false;
    }
  }
}
