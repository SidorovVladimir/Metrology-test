import { Test } from 'src/modules/tests/entities/test.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  text: string;

  @Column('boolean')
  has_multiple_answers: boolean;

  @Column()
  testId: number;

  @ManyToOne('Test')
  @JoinColumn({ name: 'testId' })
  test: Test;

  @CreateDateColumn()
  create_at: string;
}
