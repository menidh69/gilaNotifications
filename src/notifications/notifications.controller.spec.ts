import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { SendBulkNotificationDto } from '../dtos/sendBulkNotification.dto';
import { MessageCategories } from '../enums/messageCategories.enum';
import { HttpException, HttpStatus } from '@nestjs/common';

jest.mock('./notifications.service');

describe('NotificationsController', () => {
  let controller: NotificationsController;
  let service: NotificationsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [NotificationsService],
    }).compile();

    controller = module.get<NotificationsController>(NotificationsController);
    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Send notifications in bulk', () => {
    const data = new SendBulkNotificationDto();
    data.messageCategory = MessageCategories.MOVIES;
    data.message = 'New movie arrived';

    it('calls service succesfully', async () => {
      jest
        .spyOn(service, 'sendBulkNotifications')
        .mockImplementation((): Promise<any> => Promise.resolve());
      return expect(controller.sendNotification(data)).resolves.not.toThrow();
    });

    it('calls service but fails', async () => {
      jest
        .spyOn(service, 'sendBulkNotifications')
        .mockImplementation(() =>
          Promise.reject(
            new HttpException(
              'Internal Server Error',
              HttpStatus.INTERNAL_SERVER_ERROR,
            ),
          ),
        );
      return expect(controller.sendNotification(data)).rejects.toEqual(
        new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });
});
