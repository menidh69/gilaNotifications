import { MessageCategories } from '../enums/messageCategories.enum';
import { EmailNotification } from './email.service';
import { User } from '../entities/user.entity';
import { NotificationTypes } from '../enums/notificationTypes.enum';

describe('emai service', () => {
  const emailService = new EmailNotification();
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
    const result = await emailService.sendBulk(message, category, users);
    const expectedResult = [
      {
        message: message,
        messageCategory: category,
        user: user,
        notificationType: NotificationTypes.EMAIL,
        recipient: user.email,
        status: 'success',
      },
    ];
    expect(result).toStrictEqual(expectedResult);
  });
});
