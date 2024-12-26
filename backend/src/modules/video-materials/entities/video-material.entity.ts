import { IsNumber, IsString } from 'class-validator';
import { Course } from 'src/modules/courses/entities/course.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('video_materials')
export class VideoMaterial {
  @IsNumber()
  @PrimaryGeneratedColumn()
  video_id: number;

  @IsString()
  @Column('text')
  video_url: string;

  @IsString()
  @Column('text')
  title: string;

  @IsString()
  @Column('text')
  description: string;

  @IsNumber()
  @Column()
  course_id: number;

  @OneToOne('Course')
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @CreateDateColumn()
  created_at: string;
}
