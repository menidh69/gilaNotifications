import { User } from '../entities/user.entity';
import { MessageCategories } from '../enums/messageCategories.enum';
import { NotificationTypes } from '../enums/notificationTypes.enum';

export class SaveNotificationDto {
  message: string;
  messageCategory: MessageCategories;
  user: User;
  notificationType: NotificationTypes;
  status: string;
  recipient: string;
}
