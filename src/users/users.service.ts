import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserQueryDto } from 'src/dtos/userQuery.dto';
import { User } from 'src/entities/user.entity';
import { UserMessageChannel } from 'src/entities/userMessageChannel.entitiy';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserMessageChannel)
    private userMessageChannels: Repository<UserMessageChannel>,
  ) {}

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findAllByMessageChannelSubscription(messageChannel: MessageChannel) {
    return this.userMessageChannels.find({
      where: { messageChannel: messageChannel },
      select: ['userId'],
    });
  }
}
