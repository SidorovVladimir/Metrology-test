import { Question } from 'src/modules/questions/entities/question.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn()
  answer_id: number;

  @Column('text')
  text: string;

  @Column('boolean')
  is_correct: boolean;

  @Column()
  question_id: number;

  @ManyToOne('Question')
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @CreateDateColumn()
  created_at: string;
}
