import { NotificationTypes } from 'src/enums/notificationTypes.enum';
import { PushNotification } from './pushNotification.service';
import { SMSNotification } from './sms.service';
import { EmailNotification } from './email.service';
import { UserSubscription } from 'src/entities/userSubscription.entity';

export class NotificationFactory {
  createNotification(subscription: UserSubscription) {
    if (subscription.notificationType === NotificationTypes.EMAIL) {
      return new EmailNotification();
    } else if (subscription.notificationType === NotificationTypes.SMS) {
      return new SMSNotification();
    } else if (subscription.notificationType === NotificationTypes.PUSH) {
      return new PushNotification();
    }
  }
}
