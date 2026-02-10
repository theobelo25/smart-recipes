import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './domain/users/users.module.js';
import { CommonModule } from './common/common.module.js';
import { EnvModule } from './env/env.module.js';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module.js';
import { AjvModule } from './ajv/ajv.module.js';

@Module({
  imports: [
    UsersModule,
    CommonModule,
    EnvModule,
    ConfigModule.forRoot(),
    AuthModule,
    AjvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
