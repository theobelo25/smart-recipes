import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { HashingService } from './hashing/hashing.service.js';
import { BcryptService } from './hashing/bcrypt.service.js';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ],
  exports: [HashingService],
})
export class AuthModule {}
