import { User } from 'src/entities/user.entity';
import { MessageCategories } from 'src/enums/messageCategories.enum';
import { NotificationTypes } from 'src/enums/notificationTypes.enum';

export class SendSingleNotificationDto {
  message: string;
  messageCategory: MessageCategories;
  user: User;
}
