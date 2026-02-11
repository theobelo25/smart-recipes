import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { HashingService } from './hashing/hashing.service.js';
import { RequestUser } from './interfaces/request-user.interface.js';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface.js';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  async validateLocal(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      select: { id: true, password: true },
      where: { email },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials.');

    const isMatch = await this.hashingService.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials.');

    const requestUser: RequestUser = { id: user.id };
    return requestUser;
  }

  async validateJwt(payload: JwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
    if (!user) throw new UnauthorizedException('Invalid token');

    const requestUser: RequestUser = { id: payload.sub };
    return requestUser;
  }

  login(user: RequestUser) {
    const payload: JwtPayload = { sub: user.id };
    return this.jwtService.sign(payload);
  }

  getProfile(id: number) {
    return this.prisma.user.findUniqueOrThrow({ where: { id } });
  }
}
