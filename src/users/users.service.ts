import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserQueryDto } from 'src/dtos/userQuery.dto';
import { User } from 'src/entities/user.entity';
import { UserMessageCategory } from 'src/entities/userMessageChannel.entitiy';
import { MessageCategories } from 'src/enums/messageCategories.enum';
import { NotificationTypes } from 'src/enums/notificationTypes.enum';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserMessageCategory)
    private userMessageChannels: Repository<UserMessageCategory>,
  ) {}

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findAllByMessageChannelSubscription(
    messageCategory: MessageCategories,
    take: number,
    skip: number,
  ) {
    return this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user.messageCategories', 'messageCategories')
      .leftJoinAndSelect('user.userSubscriptions', 'userSubscriptions')
      .where('messageCategories.messageCategory = :messageCategory', {
        messageCategory,
      })
      .take(take)
      .skip(skip)
      .getMany();
  }

  countUsersSubscribedToChannel(messageCategory: MessageCategories) {
    return this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user.messageCategories', 'messageCategories')
      .where('messageCategories.messageCategory = :messageCategory', {
        messageCategory,
      })
      .getCount();
  }

  getSubscribersByNotificationAndCategory(
    messageCategory: MessageCategories,
    notificationType: NotificationTypes,
  ) {
    return this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user.messageCategories', 'messageCategories')
      .innerJoin('user.userSubscriptions', 'userSubscriptions')
      .where('messageCategories.messageCategory = :messageCategory', {
        messageCategory,
      })
      .andWhere('userSubscriptions.notificationType = :notificationType', {
        notificationType,
      })
      .getMany();
  }
}
