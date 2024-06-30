import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserMessageChannel } from 'src/entities/userMessageChannel.entitiy';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserMessageChannel])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
