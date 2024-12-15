import { Test } from 'src/modules/tests/entities/test.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
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

  @ManyToOne(() => Test, (test) => test.question)
  test: Test;

  @CreateDateColumn()
  create_at: string;
}
