import { MessageCategories } from '../enums/messageCategories.enum';
import { User } from '../entities/user.entity';
import { NotificationTypes } from '../enums/notificationTypes.enum';
import { PushNotification } from './pushNotification.service';

describe('emai service', () => {
  const pushService = new PushNotification();
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
    const result = await pushService.sendBulk(message, category, users);
    const expectedResult = [
      {
        message: message,
        messageCategory: category,
        user: user,
        notificationType: NotificationTypes.PUSH,
        recipient: user.pushClientId,
        status: 'success',
      },
    ];
    expect(result).toStrictEqual(expectedResult);
  });
});
