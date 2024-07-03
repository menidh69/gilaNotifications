import { MessageCategories } from '../enums/messageCategories.enum';
import { IsEnum, IsString } from 'class-validator';

export class SendBulkNotificationDto {
  
  @IsEnum(MessageCategories)
  messageCategory: MessageCategories;

  @IsString()
  message: string;
}
