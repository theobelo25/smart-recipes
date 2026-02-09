import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './domain/users/users.module.js';
import { CommonModule } from './common/common.module.js';
import { EnvModule } from './env/env.module.js';

@Module({
  imports: [UsersModule, CommonModule, EnvModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
