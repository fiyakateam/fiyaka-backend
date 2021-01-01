import { PartialType } from '@nestjs/mapped-types';
import { ProofPostReq, ProofPostRes } from './proof-post.dto';

export class ProofPutReq extends PartialType(ProofPostReq) {}

export class ProofPutRes extends ProofPostRes {}
