import {
  Controller,
  Get,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@@auth/guards/jwt-auth.guard';
import { UsersService } from '@@users/users.service';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(@Query() query?) {
    return this.usersService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getUserProfile(@Request() req) {
    console.log(req.user)
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
