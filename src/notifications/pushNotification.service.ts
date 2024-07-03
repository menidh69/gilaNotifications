import { SaveNotificationDto } from '../dtos/saveNotification.dto';
import { SendSingleNotificationDto } from '../dtos/sendSingleNotification.dto';
import { User } from '../entities/user.entity';
import { NotificationTypes } from '../enums/notificationTypes.enum';
import { NotificationServiceInterface } from '../interfaces/notificationService.interface';

export class PushNotification implements NotificationServiceInterface {
  async send(data: SendSingleNotificationDto): Promise<SaveNotificationDto> {
    // call push provider
    console.log('send push');
    const statusResponse: string = await new Promise((res, rej) => {
      setTimeout(() => {
        res('success');
      }, 100);
    });

    return {
      ...data,
      status: statusResponse,
      notificationType: NotificationTypes.PUSH,
      recipient: data.user.pushClientId,
    };
  }

  async sendBulk(
    message,
    messageCategory,
    users: User[],
  ): Promise<SaveNotificationDto[]> {
    console.log('send sms');
    const statusResponse: string = await new Promise((res, rej) => {
      setTimeout(() => {
        res('success');
      }, 100);
    });

    return users.map((u) => {
      return {
        message: message,
        messageCategory: messageCategory,
        user: u,
        notificationType: NotificationTypes.PUSH,
        status: statusResponse,
        recipient: u.pushClientId,
      };
    });
  }
}
