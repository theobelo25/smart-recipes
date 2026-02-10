import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { HashingService } from './hashing/hashing.service.js';
import { BcryptService } from './hashing/bcrypt.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy.js';

@Module({
  imports: [PrismaModule, PassportModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    LocalStrategy,
  ],
  exports: [HashingService],
})
export class AuthModule {}
