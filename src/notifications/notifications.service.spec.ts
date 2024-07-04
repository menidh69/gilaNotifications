import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { UsersService } from '../users/users.service';
import { NotificationFactory } from './notification.factory';
import { Notification } from '../entities/notification.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserMessageCategory } from '../entities/userMessageChannel.entitiy';
import { MessageCategories } from '../enums/messageCategories.enum';
import { UserSubscription } from '../entities/userSubscription.entity';
import { NotificationTypes } from '../enums/notificationTypes.enum';
import { SendBulkNotificationDto } from '../dtos/sendBulkNotification.dto';
import { EmailNotification } from './email.service';
import { Repository } from 'typeorm';
import { SMSNotification } from './sms.service';
import { SaveNotificationDto } from 'src/dtos/saveNotification.dto';

const mockRepository = () => ({
  createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilderFactory()),
  save: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  create: jest.fn(),
  find: jest.fn(),
  findAndCount: jest.fn(),
  remove: jest.fn(),
  update: jest.fn(),
});

const mockQueryBuilderFactory = () => {
  const dummyQueryBuilder = {
    where: () => dummyQueryBuilder,
    andWhere: () => dummyQueryBuilder,
    select: () => dummyQueryBuilder,
    innerJoinAndMapOne: () => dummyQueryBuilder,
    leftJoinAndSelect: () => dummyQueryBuilder,
    leftJoin: () => dummyQueryBuilder,
    orderBy: () => dummyQueryBuilder,
    getOne: () => jest.fn(),
    getMany: () => jest.fn(),
  };
  return dummyQueryBuilder;
};

jest.mock('../users/users.service');

describe('NotificationsService', () => {
  let service: NotificationsService;
  let usersService: UsersService;
  let notificationFactory: NotificationFactory;
  let notificationRepository: Repository<Notification>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        UsersService,
        NotificationFactory,
        {
          provide: getRepositoryToken(Notification),
          useFactory: mockRepository,
        },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
    usersService = module.get<UsersService>(UsersService);
    notificationFactory = module.get<NotificationFactory>(NotificationFactory);
    notificationRepository = module.get<Repository<Notification>>(
      getRepositoryToken(Notification),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Send Bulk Notifications', () => {
    const userMessageCategory = new UserMessageCategory();
    userMessageCategory.messageCategory = MessageCategories.MOVIES;

    const subscriptionEmail = new UserSubscription();
    subscriptionEmail.notificationType = NotificationTypes.EMAIL;

    const subscriptionSMS = new UserSubscription();
    subscriptionEmail.notificationType = NotificationTypes.SMS;

    const subscriptionPush = new UserSubscription();
    subscriptionEmail.notificationType = NotificationTypes.PUSH;

    const user1: User = {
      id: 1,
      name: 'John Doe',
      email: 'foo@bar.com',
      phone: '1234567890',
      pushClientId: '123',
      messageCategories: [userMessageCategory],
      userSubscriptions: [subscriptionEmail, subscriptionPush, subscriptionSMS],
      notifications: null,
    };

    const sendBulkNotificationDto = new SendBulkNotificationDto();
    sendBulkNotificationDto.messageCategory = MessageCategories.MOVIES;
    sendBulkNotificationDto.message = 'New movie arrived';

    const emailService = new EmailNotification();
    const smsService = new SMSNotification();
    const pushNotification = new SMSNotification();

    const factoryNotificationMock = (i: NotificationTypes) => {
      switch (i) {
        case NotificationTypes.EMAIL:
          return emailService;
        case NotificationTypes.SMS:
          return smsService;
        case NotificationTypes.PUSH:
          return pushNotification;
      }
    };

    it('saves one notification through email Notification service', async () => {
      jest
        .spyOn(notificationFactory, 'createNotificationService')
        .mockImplementation(factoryNotificationMock);

      jest
        .spyOn(usersService, 'getSubscribersByNotificationAndCategory')
        .mockImplementationOnce(async () => {
          return [user1];
        });

      jest
        .spyOn(emailService, 'sendBulk')
        .mockImplementation(async (message, category, users) => {
          return users.map((u) => {
            const notification: Notification = {
              id: null,
              message: message,
              messageCategory: category,
              user: u,
              notificationType: NotificationTypes.EMAIL,
              createdAt: null,
              recipient: u.email,
              status: 'success',
            };
            return notification;
          });
        });
      jest
        .spyOn(notificationRepository, 'save')
        .mockImplementation(async (i: any) => {
          return i;
        });

      const sentNotifications = await service.sendBulkNotifications(
        sendBulkNotificationDto,
      );
      const expectedResult = [
        {
          id: null,
          message: sendBulkNotificationDto.message,
          messageCategory: sendBulkNotificationDto.messageCategory,
          user: user1,
          notificationType: NotificationTypes.EMAIL,
          createdAt: null,
          recipient: user1.email,
          status: 'success',
        },
      ];

      expect(sentNotifications).toStrictEqual(expectedResult);
    });

    it('saves all notifications through after communication services', async () => {
      jest
        .spyOn(usersService, 'getSubscribersByNotificationAndCategory')
        .mockImplementation(async () => {
          return [user1];
        });

      jest
        .spyOn(notificationFactory, 'createNotificationService')
        .mockImplementation(factoryNotificationMock);

      jest
        .spyOn(emailService, 'sendBulk')
        .mockImplementation(async (message, category, users) => {
          return users.map((u) => {
            const notification: SaveNotificationDto = {
              message: message,
              messageCategory: category,
              user: u,
              notificationType: NotificationTypes.EMAIL,
              recipient: u.email,
              status: 'success',
            };
            return notification;
          });
        });

      jest
        .spyOn(smsService, 'sendBulk')
        .mockImplementation(async (message, category, users) => {
          return users.map((u) => {
            const notification: SaveNotificationDto = {
              message: message,
              messageCategory: category,
              user: u,
              notificationType: NotificationTypes.SMS,
              recipient: u.phone,
              status: 'success',
            };
            return notification;
          });
        });

      jest
        .spyOn(pushNotification, 'sendBulk')
        .mockImplementation(async (message, category, users) => {
          return users.map((u) => {
            const notification: SaveNotificationDto = {
              message: message,
              messageCategory: category,
              user: u,
              notificationType: NotificationTypes.PUSH,
              recipient: u.pushClientId,
              status: 'success',
            };
            return notification;
          });
        });

      jest
        .spyOn(notificationRepository, 'save')
        .mockImplementation(async (items: any) => {
          return items.map((i) => ({ ...i, id: null, createdAt: null }));
        });

      const sentNotifications = await service.sendBulkNotifications(
        sendBulkNotificationDto,
      );
      const expectedResult = [
        {
          id: null,
          message: sendBulkNotificationDto.message,
          messageCategory: sendBulkNotificationDto.messageCategory,
          user: user1,
          notificationType: NotificationTypes.EMAIL,
          createdAt: null,
          recipient: user1.email,
          status: 'success',
        },
        {
          id: null,
          message: sendBulkNotificationDto.message,
          messageCategory: sendBulkNotificationDto.messageCategory,
          user: user1,
          notificationType: NotificationTypes.SMS,
          createdAt: null,
          recipient: user1.phone,
          status: 'success',
        },
        {
          id: null,
          message: sendBulkNotificationDto.message,
          messageCategory: sendBulkNotificationDto.messageCategory,
          user: user1,
          notificationType: NotificationTypes.PUSH,
          createdAt: null,
          recipient: user1.pushClientId,
          status: 'success',
        },
      ];

      expect(sentNotifications).toStrictEqual(expectedResult);
    });
  });

  describe('get notifications', () => {
    it('gets notifications succesfully', async () => {
      const notification = new Notification();
      jest
        .spyOn(notificationRepository, 'find')
        .mockImplementation(async () => [notification]);
      const result = await service.getNotifications();
      const expectedResult = [notification];

      expect(result).toStrictEqual(expectedResult);
    });

    it('attempts to get notifications but fails', async () => {
      const error = new Error();
      jest
        .spyOn(notificationRepository, 'find')
        .mockImplementation(async () => Promise.reject(error));
      return expect(service.getNotifications()).rejects.toEqual(error);
    });
  });
});
