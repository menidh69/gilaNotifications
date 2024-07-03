import { SaveNotificationDto } from 'src/dtos/saveNotification.dto';
import { SendSingleNotificationDto } from 'src/dtos/sendSingleNotification.dto';
import { NotificationTypes } from 'src/enums/notificationTypes.enum';
import { NotificationServiceInterface } from 'src/interfaces/notificationService.interface';

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
}
