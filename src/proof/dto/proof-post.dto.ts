export class ProofPostReq {
  title: string;
  name: string;
  luckyNumber: number;
}

export class ProofPostRes extends ProofPostReq {
  id: string;
}
