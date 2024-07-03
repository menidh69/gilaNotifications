import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserSubscription } from './userSubscription.entity';
import { Notification } from '../entities/notification.entity';
import { UserMessageCategory } from './userMessageChannel.entitiy';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  pushClientId: string;

  @OneToMany(
    () => UserSubscription,
    (userSubscription) => userSubscription.user,
  )
  userSubscriptions: UserSubscription[];

  @OneToMany(() => UserMessageCategory, (userChannel) => userChannel.user)
  messageCategories: UserMessageCategory[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification;
}
