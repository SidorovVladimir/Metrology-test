import { IsNumber, IsString } from 'class-validator';
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
  @IsNumber()
  @PrimaryGeneratedColumn()
  course_id: number;

  @IsString()
  @Column('text')
  title: string;

  @IsString()
  @Column('text')
  description: string;

  @OneToMany('Test', 'course')
  tests: Test[];

  @CreateDateColumn()
  created_at: string;
}
