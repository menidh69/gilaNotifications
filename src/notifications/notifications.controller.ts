import { Controller, Get, Post, Body } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { SendBulkNotificationDto } from '../dtos/sendBulkNotification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  sendNotification(@Body() sendBulkNotificationDto: SendBulkNotificationDto) {
    return this.notificationsService.sendBulkNotifications(
      sendBulkNotificationDto,
    );
  }

  @Get()
  async getNotifications() {
    return this.notificationsService.getNotifications();
  }
}
