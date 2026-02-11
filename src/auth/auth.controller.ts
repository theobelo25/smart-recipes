import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard.js';
import { User } from './decorators/user.decorator.js';
import { type RequestUser } from './interfaces/request-user.interface.js';
import { type FastifyReply } from 'fastify';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(
    @User() user: RequestUser,
    @Res({ passthrough: true }) reply: FastifyReply,
  ) {
    const token = this.authService.login(user);
    reply.setCookie('token', token, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@User() { id }: RequestUser) {
    return this.authService.getProfile(id);
  }
}
