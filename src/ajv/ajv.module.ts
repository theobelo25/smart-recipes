import { Module, Global } from '@nestjs/common';
import { ajvProvider } from './ajv.provider.js';

@Global()
@Module({
  providers: [ajvProvider],
  exports: [ajvProvider],
})
export class AjvModule {}
