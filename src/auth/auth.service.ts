import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { HashingService } from './hashing/hashing.service.js';
import { RequestUser } from './interfaces/request-user.interface.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingService,
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
}
