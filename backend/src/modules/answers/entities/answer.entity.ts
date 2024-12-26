import { IsBoolean, IsNumber, IsString } from 'class-validator';
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
  @IsNumber()
  @PrimaryGeneratedColumn()
  answer_id: number;

  @IsString()
  @Column('text')
  text: string;

  @IsBoolean()
  @Column('boolean')
  is_correct: boolean;

  @IsNumber()
  @Column()
  question_id: number;

  @ManyToOne('Question')
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @CreateDateColumn()
  created_at: string;
}
