import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SendBulkNotificationDto } from '../dtos/sendBulkNotification.dto';
import { Notification } from '../entities/notification.entity';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { NotificationFactory } from './notification.factory';
import { NotificationTypes } from '../enums/notificationTypes.enum';
import { SaveNotificationDto } from '../dtos/saveNotification.dto';

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

    const emailUsers =
      await this.userService.getSubscribersByNotificationAndCategory(
        messageCategory,
        NotificationTypes.EMAIL,
      );
    if (emailUsers?.length) {
      const emailService = this.notificationFactory.createNotificationService(
        NotificationTypes.EMAIL,
      );
      const notificationResp: SaveNotificationDto[] =
        await emailService.sendBulk(message, messageCategory, emailUsers);
      await this.notificationRepository.save(notificationResp);
    }

    const smsUsers =
      await this.userService.getSubscribersByNotificationAndCategory(
        messageCategory,
        NotificationTypes.SMS,
      );
    if (smsUsers?.length) {
      const smsService = this.notificationFactory.createNotificationService(
        NotificationTypes.SMS,
      );
      const smsNotifications: SaveNotificationDto[] = await smsService.sendBulk(
        message,
        messageCategory,
        smsUsers,
      );
      await this.notificationRepository.save(smsNotifications);
    }

    const pushSubscribers =
      await this.userService.getSubscribersByNotificationAndCategory(
        messageCategory,
        NotificationTypes.PUSH,
      );
    if (pushSubscribers?.length) {
      const pushService = this.notificationFactory.createNotificationService(
        NotificationTypes.PUSH,
      );
      const notificationResp: SaveNotificationDto[] =
        await pushService.sendBulk(message, messageCategory, pushSubscribers);

      await this.notificationRepository.save(notificationResp);
    }

    return;
  }

  // Not actually used but it´s an alternative way of sending the notifications in case bulk sending is not available
  async sendBulkNotificationsIndividually(
    sendNotificationDto: SendBulkNotificationDto,
  ) {
    const { message, messageCategory } = sendNotificationDto;
    const pushService = this.notificationFactory.createNotificationService(
      NotificationTypes.PUSH,
    );
    const smsService = this.notificationFactory.createNotificationService(
      NotificationTypes.SMS,
    );
    const emailService = this.notificationFactory.createNotificationService(
      NotificationTypes.EMAIL,
    );

    const notificationServices = {
      [NotificationTypes.EMAIL]: emailService,
      [NotificationTypes.SMS]: smsService,
      [NotificationTypes.PUSH]: pushService,
    };

    const subsribersCount =
      await this.userService.countUsersSubscribedToChannel(messageCategory);

    const take = 50;
    const totalPages = Math.ceil(subsribersCount / take);

    for (let page = 1; page <= totalPages; page++) {
      const skip = (page - 1) * take;
      const users = await this.userService.findAllByMessageChannelSubscription(
        messageCategory,
        take,
        skip,
      );

      for (const user of users) {
        console.log(user);
        await Promise.all(
          user.userSubscriptions.map((sub) =>
            notificationServices[sub.notificationType]
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
    return;
  }

  getNotifications() {
    return this.notificationRepository.find({ order: { id: 'DESC' } });
  }
}
