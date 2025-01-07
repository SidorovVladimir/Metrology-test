import { Question } from 'src/modules/questions/entities/question.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn()
  image_id: number;

  @Column('text')
  image_url: string;

  @Column('text')
  image_path: string;

  @Column()
  question_id: number;

  @OneToOne('Question')
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @CreateDateColumn()
  created_at: string;
}
