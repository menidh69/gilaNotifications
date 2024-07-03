import { MessageCategories } from 'src/enums/messageCategories.enum';
import { NotificationTypes } from 'src/enums/notificationTypes.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
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

  @Column({ type: 'enum', enum: NotificationTypes, nullable: false })
  notificationType: NotificationTypes;

  @Column({ type: 'enum', enum: MessageCategories, nullable: false })
  messageCategory: MessageCategories;

  @Column()
  status: string;

  @Column()
  recipient: string;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;
}
