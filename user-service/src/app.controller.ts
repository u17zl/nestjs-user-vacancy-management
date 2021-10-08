import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '@@auth/auth.service';
import { JwtAuthGuard } from '@@auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '@@auth/guards/local-auth.guard';
import { UsersService } from '@@users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getUsers(@Query() query) {
    return this.usersService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/profile')
  getUserProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/:id')
  getUser(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
