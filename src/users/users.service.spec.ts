import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

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
    innerJoin: ()=>dummyQueryBuilder,
    innerJoinAndSelect: ()=>dummyQueryBuilder,
    orderBy: () => dummyQueryBuilder,
    take: () => dummyQueryBuilder,
    skip: () => dummyQueryBuilder,
    getOne: () => jest.fn(),
    getMany: () => jest.fn(),
  };
  return dummyQueryBuilder;
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
