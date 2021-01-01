import { Injectable } from '@nestjs/common';
import { ProofPostReq, ProofPostRes } from '../dto/proof-post.dto';
import { ProofPutReq } from '../dto/proof-put.dto';

@Injectable()
export class ProofService {
  create(req: ProofPostReq): ProofPostRes {
    return {
      id: 'id',
      name: 'qweqw',
      title: 'qwe',
      luckyNumber: 12,
    };
  }

  findAll() {
    return `This action returns all proof`;
  }

  findOne(id: number) {
    return `This action returns a #${id} proof`;
  }

  update(id: number, req: ProofPutReq) {
    return `This action updates a #${id} proof`;
  }

  remove(id: number) {
    return `This action removes a #${id} proof`;
  }
}
