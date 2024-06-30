import { MessageCategories } from 'src/enums/messageCategories.enum';

export class SendNotificationDto {
  messageCategory: MessageCategories;
  message: string;
}
