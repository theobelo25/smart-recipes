import { Test, TestingModule } from '@nestjs/testing';
import { Ajv } from './ajv';

describe('Ajv', () => {
  let provider: Ajv;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Ajv],
    }).compile();

    provider = module.get<Ajv>(Ajv);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
