import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { SendBulkNotificationDto } from 'src/dtos/sendBulkNotification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  sendNotification(@Body() sendBulkNotificationDto: SendBulkNotificationDto) {
    this.notificationsService.sendBulkNotifications(sendBulkNotificationDto);
  }
}
