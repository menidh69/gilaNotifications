import { MessageCategories } from 'src/enums/messageCategories.enum';
import { NotificationTypes } from 'src/enums/notificationTypes.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('notification')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: false })
  message: string;

  @Column({ enum: NotificationTypes, nullable: false })
  notificationType: NotificationTypes;

  @Column({ enum: MessageCategories, nullable: false })
  messageCategories: MessageCategories;

  @OneToOne(() => User, (user) => user.notifications)
  user: User;
}
