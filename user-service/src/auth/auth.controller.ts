import {
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AuthService } from '@@auth/auth.service';
import { LocalAuthGuard } from '@@auth/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
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
