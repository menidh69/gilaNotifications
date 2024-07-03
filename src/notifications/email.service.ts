import { Injectable } from '@nestjs/common';
import { SaveNotificationDto } from 'src/dtos/saveNotification.dto';
import { SendSingleNotificationDto } from 'src/dtos/sendSingleNotification.dto';
import { NotificationTypes } from 'src/enums/notificationTypes.enum';
import { NotificationServiceInterface } from 'src/interfaces/notificationService.interface';

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
}
