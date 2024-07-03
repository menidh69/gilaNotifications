import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { MessageCategories } from 'src/enums/messageCategories.enum';

@Entity('userMessageCategory')
export class UserMessageCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.messageCategories)
  user: User;

  @Column({ type: 'enum', enum: MessageCategories, nullable: false })
  messageCategory: MessageCategories;
}
