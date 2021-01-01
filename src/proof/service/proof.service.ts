import { Injectable } from '@nestjs/common';
import { ProofGetRes } from '../dto/proof-get.dto';
import { ProofPostReq, ProofPostRes } from '../dto/proof-post.dto';
import { ProofPutReq, ProofPutRes } from '../dto/proof-put.dto';

@Injectable()
export class ProofService {
  private static readonly placeholder = {
    id: 'id',
    name: 'qweqw',
    title: 'qwe',
    luckyNumber: 12,
  };

  create(req: ProofPostReq): ProofPostRes {
    return ProofService.placeholder;
  }

  findAll(): Array<ProofGetRes> {
    return [ProofService.placeholder, ProofService.placeholder];
  }

  findOne(id: number): ProofGetRes {
    return ProofService.placeholder;
  }

  update(id: number, req: ProofPutReq): ProofPutRes {
    return ProofService.placeholder;
  }

  remove(id: number) {
    console.log(`remove ${id} proof`);
  }
}
