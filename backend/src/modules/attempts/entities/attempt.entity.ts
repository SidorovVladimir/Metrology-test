import { Test } from 'src/modules/tests/entities/test.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('attempts')
export class Attempt {
  @PrimaryGeneratedColumn()
  attempt_id: number;

  @Column()
  score: number;

  @Column('boolean')
  is_successful: boolean;

  @Column()
  user_id: number;

  @ManyToOne('User')
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  test_id: number;

  @ManyToOne('Test')
  @JoinColumn({ name: 'test_id' })
  test: Test;

  @CreateDateColumn()
  create_at: string;
}
