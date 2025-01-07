import { Test } from 'src/modules/tests/entities/test.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  course_id: number;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @OneToMany('Test', 'course')
  tests: Test[];

  @CreateDateColumn()
  created_at: string;
}
