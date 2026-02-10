import { JSONSchemaType } from 'ajv';
import { LoginDto } from '../dto/login.dto.js';

export const loginSchema: JSONSchemaType<LoginDto> = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 6 },
  },
  required: ['email', 'password'],
  additionalProperties: false,
  errorMessage: {
    properties: {
      email: 'Incorrect email format.',
      password: 'Password must be at least 6 characters long.',
    },
    additionalProperties: 'Must not contain any additional properties',
    required: 'Both email and password are required.',
  },
};
