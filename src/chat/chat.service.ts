import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Socket } from 'socket.io';
import { AuthService } from '../auth/service/auth.service';
import { Message, MessagePostDTO } from './dto/message.dto';
import { Conversation } from './model/conversation.model';

@Injectable()
export class ChatService {
  constructor(
    private readonly authService: AuthService,
    @InjectModel('Conversation')
    private readonly conversationModel: Model<Conversation>
  ) {}

  async getLandlordConversations(landlord: string): Promise<Conversation[]> {
    try {
      const conversations = await this.conversationModel.find({ landlord });
      return conversations;
    } catch (e) {
      return [];
    }
  }
  async getTenantConversation(tenant: string): Promise<Conversation> {
    try {
      const conv = await this.conversationModel.findOne({ tenant });
      return conv;
    } catch (e) {
      return null;
    }
  }
  joinRooms(client: Socket, conv: Conversation[]): void {
    conv.forEach((c) => {
      this.joinRoom(client, c);
    });
  }
  joinRoom(client: Socket, conv: Conversation): void {
    client.join(conv.tenant);
  }

  getUserID(token: string): any {
    return this.authService.verifyToken(token);
  }

  async sendMessage(msg: MessagePostDTO): Promise<Conversation> {
    const id = this.getUserID(msg.token);
    if (!id) {
      return null;
    }
    const landlord = id.role == 'landlord' ? id._id : msg.to;
    const tenant = id.role == 'tenant' ? id._id : msg.to;
    const createdMsg = new Message(msg.content, id._id, msg.to);
    try {
      const conv = this.conversationModel.findOneAndUpdate(
        { landlord, tenant },
        { $push: { messages: createdMsg } },
        { new: true }
      );
      return conv;
    } catch (e) {
      const newConv = new this.conversationModel({
        landlord,
        tenant,
        messages: [[createdMsg]],
      });
      return newConv.save();
    }
  }
}
