import { SaveNotificationDto } from 'src/dtos/saveNotification.dto';
import { SendSingleNotificationDto } from 'src/dtos/sendSingleNotification.dto';
import { NotificationTypes } from 'src/enums/notificationTypes.enum';
import { NotificationServiceInterface } from 'src/interfaces/notificationService.interface';

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
}
