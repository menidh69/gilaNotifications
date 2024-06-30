import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('userMessageChannel')
export class UserMessageChannel {
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.messageChannels)
  user: User;

  @Column({ enum: MessageChannel, nullable: false })
  messageChannel: MessageChannel;

  @Column('int', { name: 'userId', nullable: false })
  userId: number;
}
