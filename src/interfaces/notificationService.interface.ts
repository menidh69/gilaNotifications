import { SaveNotificationDto } from '../dtos/saveNotification.dto';
import { SendSingleNotificationDto } from '../dtos/sendSingleNotification.dto';

export interface NotificationServiceInterface {
  send(data: SendSingleNotificationDto): Promise<SaveNotificationDto>;
}
