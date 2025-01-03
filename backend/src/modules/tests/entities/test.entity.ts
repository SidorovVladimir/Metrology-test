import { Attempt } from 'src/modules/attempts/entities/attempt.entity';
import { Course } from 'src/modules/courses/entities/course.entity';
import { Question } from 'src/modules/questions/entities/question.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tests')
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @OneToMany('Question', 'test')
  questions: Question[];

  @Column()
  course_id: number;

  @ManyToOne('Course')
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @OneToMany('Attempt', 'test')
  attempt: Attempt[];

  @CreateDateColumn()
  created_at: string;
}
