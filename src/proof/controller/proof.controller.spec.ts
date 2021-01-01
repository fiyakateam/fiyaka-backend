import { Test, TestingModule } from '@nestjs/testing';
import { ProofController } from './proof.controller';
import { ProofService } from '../service/proof.service';

describe('ProofController', () => {
  let controller: ProofController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProofController],
      providers: [ProofService],
    }).compile();

    controller = module.get<ProofController>(ProofController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
