import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserSubscription } from './userSubscription.entity';
import { Notification } from '../entities/notification.entity';
import { UserMessageChannel } from './userMessageChannel.entitiy';

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

  @OneToMany(
    () => UserSubscription,
    (userSubscription) => userSubscription.user,
  )
  userSubscriptions: UserSubscription[];

  @OneToMany(() => UserMessageChannel, (userChannel) => userChannel.user)
  messageChannels: any[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification;
}
