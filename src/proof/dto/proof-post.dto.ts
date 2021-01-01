import { IsInt, IsString } from 'class-validator';

export class ProofPostReq {
  @IsString()
  title: string;

  @IsString()
  name: string;

  @IsInt()
  luckyNumber: number;
}

export class ProofPostRes extends ProofPostReq {
  @IsString()
  id: string;
}
