import { Module } from '@nestjs/common';
import { ProofService } from './service/proof.service';
import { ProofController } from './controller/proof.controller';

@Module({
  controllers: [ProofController],
  providers: [ProofService],
})
export class ProofModule {}
