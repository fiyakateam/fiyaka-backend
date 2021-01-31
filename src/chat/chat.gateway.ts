import { UnauthorizedException } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { MessagePostDTO } from './dto/message.dto';
import { Conversation } from './model/conversation.model';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(): string {
    return 'Client joined';
  }

  @SubscribeMessage('join_landlord')
  async joinLandlord(
    client: Socket,
    @MessageBody() token: string
  ): Promise<WsResponse<Conversation[]>> {
    const landlord = this.chatService.getUserID(token);

    if (!landlord || landlord.role != 'landlord') {
      throw new UnauthorizedException();
    }

    const data = await this.chatService.getLandlordConversations(landlord._id);
    this.chatService.joinRooms(client, data);

    return { event: 'landlord_conversation', data };
  }

  @SubscribeMessage('join_tenant')
  async joinTenant(
    client: Socket,
    @MessageBody() token: string
  ): Promise<WsResponse<Conversation>> {
    const tenant = this.chatService.getUserID(token);
    if (!tenant || tenant.role != 'tenant') {
      throw new UnauthorizedException();
    }
    const data = await this.chatService.getTenantConversation(tenant._id);
    this.chatService.joinRoom(client, data);
    return { event: 'tenant_conversation', data };
  }

  @SubscribeMessage('send_message')
  async sendMessage(
    client: Socket,
    @MessageBody() msg: MessagePostDTO
  ): Promise<void> {
    const data = await this.chatService.sendMessage(msg);
    if (!data) {
      throw new UnauthorizedException();
    }
    this.server.to(data.tenant).emit('message', data);
  }
}
