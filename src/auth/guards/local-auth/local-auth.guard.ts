import {
  BadRequestException,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from '../../dto/login.dto.js';
import { type FastifyRequest } from 'fastify';
import { Ajv, type JSONSchemaType } from 'ajv';
import { loginSchema } from '../../schemas/login.schema.js';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  private readonly schema: JSONSchemaType<LoginDto>;

  constructor(@Inject('AJV') private readonly ajv: Ajv) {
    super();
    this.schema = loginSchema;
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const validate = this.ajv.compile(this.schema);
    const isValid = validate(request.body);

    if (!isValid) throw new BadRequestException(validate.errors![0].message);

    const result = (await super.canActivate(context)) as boolean;

    return result;
  }
}
