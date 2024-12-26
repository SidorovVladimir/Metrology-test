import { IsBoolean, IsNumber } from 'class-validator';
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
  @IsNumber()
  @PrimaryGeneratedColumn()
  attempt_id: number;

  @IsNumber()
  @Column()
  score: number;

  @IsBoolean()
  @Column('boolean')
  is_successful: boolean;

  @IsNumber()
  @Column()
  user_id: number;

  @ManyToOne('User')
  @JoinColumn({ name: 'user_id' })
  user: User;

  @IsNumber()
  @Column()
  test_id: number;

  @ManyToOne('Test')
  @JoinColumn({ name: 'test_id' })
  test: Test;

  @CreateDateColumn()
  create_at: string;
}
