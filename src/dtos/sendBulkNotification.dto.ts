import { MessageCategories } from '../enums/messageCategories.enum';
import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';

export class SendBulkNotificationDto {
  @IsEnum(MessageCategories)
  messageCategory: MessageCategories;

  @IsString()
  @MinLength(1)
  @MaxLength(255)
  message: string;
}
