import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { NotificationTypes } from 'src/enums/notificationTypes.enum';

@Entity('userSubscription')
export class UserSubscription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userSubscriptions)
  user: User;

  @Column({ enum: NotificationTypes, nullable: false })
  notificationType: NotificationTypes;
}
