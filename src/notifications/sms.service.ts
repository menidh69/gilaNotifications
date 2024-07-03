import { SaveNotificationDto } from '../dtos/saveNotification.dto';
import { SendSingleNotificationDto } from '../dtos/sendSingleNotification.dto';
import { User } from '../entities/user.entity';
import { NotificationTypes } from '../enums/notificationTypes.enum';
import { NotificationServiceInterface } from '../interfaces/notificationService.interface';

export class SMSNotification implements NotificationServiceInterface {
  async send(data: SendSingleNotificationDto): Promise<SaveNotificationDto> {
    // call sms provider
    console.log('send sms');
    const statusResponse: string = await new Promise((res, rej) => {
      setTimeout(() => {
        res('success');
      }, 100);
    });

    return {
      ...data,
      notificationType: NotificationTypes.SMS,
      status: statusResponse,
      recipient: data.user.phone,
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
        notificationType: NotificationTypes.SMS,
        status: statusResponse,
        recipient: u.phone,
      };
    });
  }
}
