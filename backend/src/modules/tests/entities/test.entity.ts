import { Question } from 'src/modules/questions/entities/question.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tests')
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @OneToMany(() => Question, (question) => question.test)
  question: Question[];

  @CreateDateColumn()
  created_at: string;
}
