import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailServiceModule } from './email-service/email-service.module';
import { SmsServiceModule } from './sms-service/sms-service.module';
import { PushNotifficationServiceModule } from './push-notiffication-service/push-notiffication-service.module';
import { NotificationsModule } from './notifications/notifications.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Notification } from './entities/notification.entity';
import { UserMessageChannel } from './entities/userMessageChannel.entitiy';
import { UserSubscription } from './entities/userSubscription.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'gilaNotifications',
      entities: [User, Notification, UserMessageChannel, UserSubscription],
      synchronize: true,
    }),
    EmailServiceModule,
    SmsServiceModule,
    PushNotifficationServiceModule,
    NotificationsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
