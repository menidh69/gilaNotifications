import { MessageCategories } from '../enums/messageCategories.enum';
import { User } from '../entities/user.entity';
import { NotificationTypes } from '../enums/notificationTypes.enum';
import { SMSNotification } from './sms.service';

describe('sms service', () => {
  const smsService = new SMSNotification();
  const user: User = {
    id: 1,
    name: 'John Doe',
    email: 'foo@bar.com',
    phone: '1234567890',
    pushClientId: '123',
    messageCategories: [],
    userSubscriptions: [],
    notifications: null,
  };

  const message = 'new Movie';
  const category = MessageCategories.MOVIES;
  const users = [user];

  it('sends messages in bulk', async () => {
    const result = await smsService.sendBulk(message, category, users);
    const expectedResult = [
      {
        message: message,
        messageCategory: category,
        user: user,
        notificationType: NotificationTypes.SMS,
        recipient: user.phone,
        status: 'success',
      },
    ];
    expect(result).toStrictEqual(expectedResult);
  });
});
