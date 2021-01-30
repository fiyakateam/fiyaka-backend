import { IsDate, isString, IsString } from 'class-validator';

export class Message {
  constructor(public content: string, public from: string, public to: string) {
    this.date = new Date();
  }
  date: Date;
}

export class MessagePostDTO {
  @IsString()
  content: string;
  @IsString()
  to: string;
  @IsString()
  token: string;
}
