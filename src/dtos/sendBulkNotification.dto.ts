import { MessageCategories } from 'src/enums/messageCategories.enum';

export class SendBulkNotificationDto {
  messageCategory: MessageCategories;
  message: string;
}
