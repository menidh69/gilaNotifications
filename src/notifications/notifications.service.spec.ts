import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { UsersService } from '../users/users.service';
import { NotificationFactory } from './notification.factory';
import { Notification } from '../entities/notification.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

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
})

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

jest.mock('../users/users.service')

describe('NotificationsService', () => {
  let service: NotificationsService;

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
