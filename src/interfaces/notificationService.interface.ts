import { SaveNotificationDto } from 'src/dtos/saveNotification.dto';
import { SendSingleNotificationDto } from 'src/dtos/sendSingleNotification.dto';

export interface NotificationServiceInterface {
  send(data: SendSingleNotificationDto): Promise<SaveNotificationDto>;
}
