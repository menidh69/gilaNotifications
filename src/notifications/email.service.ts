import { Injectable } from '@nestjs/common';
import { SaveNotificationDto } from '../dtos/saveNotification.dto';
import { SendSingleNotificationDto } from '../dtos/sendSingleNotification.dto';
import { User } from '../entities/user.entity';
import { NotificationTypes } from '../enums/notificationTypes.enum';
import { NotificationServiceInterface } from '../interfaces/notificationService.interface';

export class EmailNotification implements NotificationServiceInterface {
  async send(data: SendSingleNotificationDto): Promise<SaveNotificationDto> {
    // call email provider
    console.log('send email');
    const statusResponse: string = await new Promise((res, rej) => {
      setTimeout(() => {
        res('success');
      }, 100);
    });

    return {
      ...data,
      notificationType: NotificationTypes.EMAIL,
      status: statusResponse,
      recipient: data.user.email,
    };
  }

  async sendBulk(
    message,
    messageCategory,
    users: User[],
  ): Promise<SaveNotificationDto[]> {
    console.log('send email');
    const statusResponse: string = await new Promise((res, rej) => {
      setTimeout(() => {
        res('success');
      }, 100);
    });

    return users.map((u) => {
      return {
        message: message,
        messageCategory: messageCategory,
        user: u,
        notificationType: NotificationTypes.EMAIL,
        status: statusResponse,
        recipient: u.email,
      };
    });
  }
}
