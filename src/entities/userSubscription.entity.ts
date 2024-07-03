import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { NotificationTypes } from '../enums/notificationTypes.enum';

@Entity('userSubscription')
export class UserSubscription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userSubscriptions)
  user: User;

  @Column({ type: 'enum', enum: NotificationTypes, nullable: false })
  notificationType: NotificationTypes;
}
