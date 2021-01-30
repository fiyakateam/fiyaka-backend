export class Message {
  constructor() {
    this.date = new Date();
  }
  content: string;
  tenant: string;
  landlord: string;
  date: Date;
}
