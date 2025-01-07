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
  @PrimaryGeneratedColumn()
  video_id: number;

  @Column('text')
  video_url: string;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column()
  course_id: number;

  @OneToOne('Course')
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @CreateDateColumn()
  created_at: string;
}
