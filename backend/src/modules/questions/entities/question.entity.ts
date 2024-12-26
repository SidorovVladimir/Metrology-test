import { Answer } from 'src/modules/answers/entities/answer.entity';
import { Test } from 'src/modules/tests/entities/test.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  question_id: number;

  @Column('text')
  text: string;

  @Column('boolean')
  has_multiple_answers: boolean;

  @Column()
  test_id: number;

  @ManyToOne('Test')
  @JoinColumn({ name: 'test_id' })
  test: Test;

  @OneToMany('Answer', 'question')
  answers: Answer[];

  @CreateDateColumn()
  create_at: string;
}
