import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SendBulkNotificationDto } from 'src/dtos/sendBulkNotification.dto';
import { Notification } from 'src/entities/notification.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { NotificationFactory } from './notification.factory';

@Injectable()
export class NotificationsService {
  constructor(
    private userService: UsersService,
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    private notificationFactory: NotificationFactory,
  ) {}

  async sendBulkNotifications(sendNotificationDto: SendBulkNotificationDto) {
    const { message, messageCategory } = sendNotificationDto;

    const subsribersCount =
      await this.userService.countUsersSubscribedToChannel(messageCategory);

    const limit = 50;
    for (
      const offsetCount = 0;
      offsetCount <= subsribersCount;
      offsetCount + limit
    ) {
      const users = await this.userService.findAllByMessageChannelSubscription(
        messageCategory,
        limit,
        offsetCount,
      );

      for (const user of users) {
        console.log(user);
        await Promise.all(
          user.userSubscriptions.map((sub) =>
            this.notificationFactory
              .createNotification(sub)
              .send({ message, messageCategory, user })
              .then((result) => {
                const newNotification = this.notificationRepository.create({
                  message: result.message,
                  messageCategory: result.messageCategory,
                  notificationType: result.notificationType,
                  user: result.user,
                  status: result.status,
                  recipient: result.recipient,
                });
                this.notificationRepository.save(newNotification);
              })
              .catch((e) => {
                console.log(e);
              }),
          ),
        );
      }
    }
  }
}
